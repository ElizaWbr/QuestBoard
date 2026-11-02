import { firebaseDB } from "./firebase.js";
import { getQuestData, saveInAccepted, getCurrentUserUid, getAcceptedDatabaseName, redirectToEventPageUrl, isQuestDeleted } from "./crud.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { disableLoader, ableComponentLoader, disableComponentLoader } from "./loader.js";

$(document).ready(async function () {
    addAcceptAction();
});

function addAcceptAction() {
    $("#enter-event").on("click", async function () {
        ableComponentLoader("accept-event-form-container");
        await checkQuest();
        disableComponentLoader("accept-event-form-container");
    });
    $("#accept-valid-event").on("click", async function () {
        await acceptQuest();
    });
    disableLoader();
}

async function getValidQuest() {
    let questId = $("#accept-event-id").val();
    if (!questId) {
        displayError("Adicione o ID de um evento.");
        return false;
    }

    const quest = await getQuestData(questId);
    if (!quest || isQuestDeleted(quest)) {
        displayError("Não foi possível encontrar esse evento. Adicione outro ID e tente novamente.");
        return false;
    }

    return {
        id: questId,
        ...quest
    };
}

async function checkQuest() {
    const quest = await getValidQuest();
    if (!quest) {
        return;
    }

    let accepted = await checkAccepted(quest.id);
    if (accepted) {
        displayError("Você já está fazendo parte desse evento.");
        return;
    }

    const author = quest.author;
    const currentUser = await getCurrentUserUid();

    if (author == currentUser) {
        displayError("Não é possível ingressar no seu próprio evento.");
        return;
    }

    if (quest) {
        await displayQuest(quest);
        $("#accept-valid-event-data").slideDown();
        displaySummaryContainer();
    }
}

async function checkAccepted(id) {
    const acceptedRef = doc(firebaseDB, await getAcceptedDatabaseName(id));
    const acceptedSnap = await getDoc(acceptedRef);

    if (!acceptedSnap.exists()) {
        return null;
    }

    return acceptedSnap.id;
}

async function acceptQuest() {
    const quest = await getValidQuest();
    if (quest) {
        await saveInAccepted(quest.id);
        redirectToEventPageUrl(quest.id);
    }
}

function displaySummaryContainer() {
    $("#event-summary-content").slideDown();
}

function displayError(error) {
    displaySummaryContainer();
    $("#accept-valid-event-data").slideUp();
    $("#ivalid-event-warning").slideDown();
    $("#ivalid-event-warning").html(error);
}

async function displayQuest(quest) {
    $("#ivalid-event-warning").slideUp();
    $("#ivalid-event-warning").html("");

    $("#event-name").text(quest.name);
    $("#event-description").text(quest.description);

    $("#manage-event-user-name").text("Criado por " + quest.author_name);
    $("#manage-event-user-email").text("E-mail: " + quest.author_email);

    $("#manage-event-created-date").text("Criado em: " + formatDate(quest.dt));
    $("#manage-event-members-counter").text("Membros: " + quest.members);
    $("#manage-event-confirmed-counter").text("Confirmações: " + quest.confirmed);
}

function formatDate(date) {
    let toDate = date.toDate();
    return toDate.toLocaleString("pt-BR");
}
