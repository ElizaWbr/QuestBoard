import { firebaseDB } from "./firebase.js";
import { getQuestDatabaseName, getAcceptedDatabaseName, getCreatedDatabaseName, formatDate, getManagePageUrl, getEnterQuestPageUrl, removeFromAccepted, getDeletedEventMessage, isQuestDeleted, getCurrentUserUid } from "./crud.js";
import { collection, getDocs, query, where, documentId } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { disableLoader } from "./loader.js";

const allQuestsContainerId = "all-quests-container";
const createdContainerId = "created-quests-container";
const acceptedContainerId = "accepted-quests-container";
const deletedAcceptedContainerId = "deleted-accepted-quests-container";

$(document).ready(async function () {
    await buildCurrentUserAllQuests();
    await buildCurrentUserCreatedEvents();
    await buildCurrentUserAcceptedEvents();

    disableLoader();
});

async function buildCurrentUserAllQuests() {
    if ($("#" + allQuestsContainerId).length > 0) {
        let curretUser = await getCurrentUserUid();
        let events = await getAllQuests();
        if (events.length > 0) {
            events.forEach((quest) => {
                let type = curretUser == quest.author ? "created" : "accepted";
                buildQuestHtml(quest, type, allQuestsContainerId);
            });
        } else {
            let html = getNoCreatedHtml();
            html += getNoAddedHtml();
            $("#" + allQuestsContainerId).append(html);
        }
    }
}

async function buildCurrentUserCreatedEvents() {
    if ($("#" + createdContainerId).length > 0) {
        let created = await getCurrentUserCreatedEvents();
        if (created.length > 0) {
            created.forEach((quest) => {
                /* We remove from created events when updating deletion, we dont need to do anything here */
                buildQuestHtml(quest, "created", createdContainerId);
            });
        } else {
            let html = getNoCreatedHtml();
            $("#" + createdContainerId).append(html);
        }
    }
}

async function buildCurrentUserAcceptedEvents() {
    if ($("#" + acceptedContainerId).length > 0) {
        let accepted = await getCurrentUserAcceptedEvents();
        if (accepted.length > 0) {
            accepted.forEach((quest) => {
                if (isQuestDeleted(quest)) {
                    removeRelationAndAddMessage(quest);
                } else {
                    buildQuestHtml(quest, "accepted", acceptedContainerId);
                }
            });
        } else {
            let html = getNoAddedHtml();
            $("#" + acceptedContainerId).append(html);
        }
    }
}

function getNoCreatedHtml() {
    let message = "Você ainda não adicionou nenhum evento";
    let label = "Clique aqui para adicionar um novo evento";
    let url = getManagePageUrl();
    return getNoDataHtml(message, label, url);
}

function getNoAddedHtml() {
    let message = "Você ainda não entrou nenhum evento";
    let label = "Clique aqui para entrar em um novo evento";
    let url = getEnterQuestPageUrl();
    return getNoDataHtml(message, label, url);
}

function getNoDataHtml(message, label, url) {
    let html = "<div class='flex-center-center flex-column margin'>";
    html += "<span>" + message + "</span>";
    html += "<a href=" + url + " class='btn text-icon'>";
    html += "<img src='../images/icons/plus.svg' alt='Plus' class='icon medium' />";
    html += label;
    html += "</a>";
    html += "</div>";
    return html;
}

function buildQuestHtml(quest, type, container) {
    let html = "<div class='created-quests-container-data'>";

    let page = "";
    let buttonImage = "";

    let isCreated = type == "created";

    if (isCreated) {
        page = "manage.php";
        buttonImage += "<img src='../images/icons/pencil.svg' alt='Enter' class='icon medium round-transparent' />";
    } else {
        page = "event.php";
        buttonImage += "<img src='../images/icons/plus.svg' alt='Enter' class='icon medium round-transparent' />";
    }

    let url = new URL(page + "?id=" + quest.id, window.location.href);
    let editUrl = url.href;

    let image = quest.image;
    if (!image) {
        image = "../images/no-image-icon-square.png";
    }

    let isSameDay = quest.date_start == quest.date_end;
    let date_start = formatDate(quest.date_start);
    let date_end = formatDate(quest.date_end);

    let mailto = "mailto:" + quest.contact_email;
    let phoneto = "https://wa.me/" + quest.contact_phone;

    /* Top */
    html += "<div class='container-round-small-event-details top'>";
    html += "<div class='flex-center-center'>";

    html += "<div class='flex-center-center less-gap'>";
    html += "<img src='../images/icons/account.svg' alt='Enter' class='icon medium round-transparent' />";
    html += "<span>" + quest.members + "</span>";
    html += "</div>";

    html += "<div class='flex-center-center less-gap'>";
    html += "<img src='../images/icons/check-circle.svg' alt='Enter' class='icon medium round-transparent' />";
    html += "<span>" + quest.confirmed + "</span>";
    html += "</div>";

    html += "</div>";
    html += "</div>";

    /* Center */
    html += "<div class='container-round-medium flex-center-center flex-column'>";

    html += "<div class='flex-between'>";
    html += "<div class='btn-round-filler'></div>";
    html += "<img src='" + image + "' alt='Event image' class='event-image image-fit border' />";
    html += "<a href='" + editUrl + "' class='btn round'>";
    html += buttonImage;
    html += "</a>";
    html += "</div>";

    html += "<div class='container-added-event-data'>";
    html += "<h4 class='event-title'>" + quest.name + "</h4>";
    html += "<p class='event-description'>" + quest.description + "</p>";

    if (isSameDay) {
        html += "<p class='event-date'>";
        html += "<img src='../images/icons/dark-calendar-start.svg' alt='Calendar date' class='icon medium round-transparent' />";
        html += date_start;
        html += "</p>";

        html += "<p class='event-start'>";
        html += "<img src='../images/icons/dark-clock.svg' alt='Time' class='icon medium round-transparent' />";
        html += "Das " + quest.time_start + " até " + quest.time_end;
        html += "</p>";

    } else {
        html += "<p class='event-start'>";
        html += "<img src='../images/icons/dark-calendar-start.svg' alt='Calendar start' class='icon medium round-transparent' />";
        html += "Início: " + date_start + " - " + quest.time_start;
        html += "</p>";

        html += "<p class='event-end'>";
        html += "<img src='../images/icons/dark-calendar-end.svg' alt='Calendar end' class='icon medium round-transparent' />";
        html += "Fim: " + date_end + " - " + quest.time_end;
        html += "</p>";
    }

    html += "<p class='event-location'>";
    html += "<img src='../images/icons/dark-location.svg' alt='Location' class='icon medium round-transparent' />";
    html += "Local: " + quest.location;
    html += "</p>";

    html += "</div>";

    if (isCreated) {
        html += "<div class='card no-margin'>";
        html += "<span>Código para convite: " + quest.id + "</span>";
        html += "</div>";
    }

    html += "</div>";

    /* Bottom */
    html += "<div class='container-round-small-event-details bottom'>";
    html += "<div class='flex-center-center'>";

    html += "<a href='" + mailto + "' class='btn round-transparent green color-white'>";
    html += "<img src='../images/icons/email.svg' alt='Email' class='icon medium' />";
    html += "</a>";

    html += "<a href='" + phoneto + "' class='btn round-transparent green color-white' target='_blank'>";
    html += "<img src='../images/icons/phone.svg' alt='phone' class='icon medium' />";
    html += "</a>";
    html += "</div>";
    html += "</div>";

    html += "</div>";

    $("#" + container).append(html);
}

function removeRelationAndAddMessage(quest) {
    let containerId = "created-removed-quest-container-" + quest.id;
    let removeId = "remove-deleted-event-" + quest.id;

    let html = "<div id='" + containerId + "' class='created-quests-container-data'>";
    html += "<div class='container-round-medium flex-center-center flex-column'>";
    html += getDeletedEventMessage(quest);

    /* Button */
    html += "<button type='button' id='" + removeId + "' value='" + quest.id + "' class='btn text-icon red color-white'>";
    html += "<img src='../images/icons/delete.svg' alt='Enter' class='icon medium' />";
    html += "Entendi que o evento não existe mais. Pode excluir da minha conta.";
    html += "</button>";

    html += "</div>";
    html += "</div>";
    $("#" + deletedAcceptedContainerId).append(html);

    $("#" + removeId).on("click", async function () {
        let id = $(this).val();
        await removeFromMe(id);
        $("#created-removed-quest-container-" + id).slideUp();
    });
}

async function removeFromMe(id) {
    await removeFromAccepted(id);
}

export async function getCurrentUserCreatedEvents() {
    let database = await getCreatedDatabaseName();
    return await getEventsInDatabase(database);

}

export async function getCurrentUserAcceptedEvents() {
    let database = await getAcceptedDatabaseName();
    return await getEventsInDatabase(database);
}

async function getEventsInDatabase(database) {
    try {
        const ref = collection(firebaseDB, database);
        const snapshot = await getDocs(ref);
        const ids = snapshot.docs.map(doc => doc.id);

        if (ids.length === 0) {
            return [];
        }
        const events = await getQuestsInIds(ids);
        return filterAndSortEvents(events);
    } catch (error) {
        console.error("Erro ao buscar os documentos:", error);
        return [];
    }
}

export async function getQuestsInIds(ids) {
    try {
        const questsRef = collection(firebaseDB, await getQuestDatabaseName());
        const eventsQuery = query(
            questsRef,
            where(documentId(), "in", ids)
        );

        const eventsSnapshot = await getDocs(eventsQuery);
        return eventsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Erro ao buscar os documentos:", error);
        return [];
    }
}

export async function getAllQuests() {
    try {
        const [createdEvents, acceptedEvents] = await Promise.all([
            getCurrentUserCreatedEvents(),
            getCurrentUserAcceptedEvents()
        ]);

        return filterAndSortEvents([
            ...createdEvents,
            ...acceptedEvents
        ]);

    } catch (error) {
        console.error("Erro ao buscar todos os eventos:", error);
        return [];
    }
}

function filterAndSortEvents(events) {
    const now = new Date();

    const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0")
    ].join("-");

    return events
        .filter(event => event.date_end >= today)
        .sort((a, b) => {
            // Primeiro compara as datas
            const dateCompare = a.date_start.localeCompare(b.date_start);

            if (dateCompare !== 0) {
                return dateCompare;
            }

            // Se as datas forem iguais, compara os horários
            return a.time_start.localeCompare(b.time_start);
        });
}
