import { getQuestData, formatDateObject, formatDate, getCustomerConfirmedInAccepted, confirmInAccepted, reloadPage, removeFromAccepted, redirectToEventPageUrl, validateQuestInUser, isQuestDeleted, displayDeletedEventWarning, isCurrentUserAuthor, getWhatsappUrl } from "./crud.js";
import { disableLoader } from "./loader.js";

$(document).ready(async function () {
    await setSavedData();

    disableLoader();
});

async function setSavedData() {
    let questId = $("#event-id").val();
    if (!questId) {
        displayNoEventWarning();
        return;
    }

    const quest = await getQuestData(questId);
    if (!quest) {
        displayNoEventWarning();
        return;
    }

    if (isQuestDeleted(quest)) {
        displayDeletedEventWarning(quest);
        return;
    }

    const validateUser = await validateQuestInUser(quest);
    if (validateUser == false) {
        displayNoEventWarning();
        return;
    }

    let currentUser = await isCurrentUserAuthor(questId, quest);
    if (currentUser) {
        $("#confirm-event").attr("disabled", "disabled");
        $("#remove-event").attr("disabled", "disabled");
        $("#remove-event-confirm").attr("disabled", "disabled");
        $("#remove-event-cancel").attr("disabled", "disabled");
    } else {
        const confirmedByUser = await getCustomerConfirmedInAccepted(questId);
        if (confirmedByUser != 0) {
            $("#confirm-event").attr("disabled", "disabled");
        } else {
            addConfirmEventAction(questId);
        }
        addRemoveEventAction(questId);
    }

    $("#event-created-name").text(quest.name);
    $("#event-created-description").text(quest.description);

    updateQuestSummary(quest);

    let details = "";

    if (quest.date_start == quest.date_end) {
        details = "<span>O evento ocorrerá dia " + formatDate(quest.date_start) + ".</span>";
        details += "<span>Começa " + quest.time_start + " e termina " + quest.time_end + ".</span>";
    } else {
        details = "<h3 class='only-margin-top'>Início</h3>";
        details += "<span>O evento começa dia " + formatDate(quest.date_start) + " às " + quest.time_start + " horas.</span>";
        details += "<h3 class='only-margin-top'>Fim</h3>";
        details += "<span>O evento termina dia " + formatDate(quest.date_end) + " às " + quest.time_end + " horas.</span>";
    }

    details += "<h3 class='only-margin-top'>Local do Evento</h3><span>" + quest.location + "</span>";

    if (quest.ticket) {
        details += "<h3 class='only-margin-top'>Ingressos</h3>";
        details += "<span>Esse evento precisa de ingressos, custam por volta de " + quest.ticket_price + "."
        details += "<a href='" + quest.ticket_url + "' class='btn text half-margin'>Você pode adquiri-los aqui</a></span>"
    }

    details += "<h3 class='only-margin-top'>Observações</h3>";
    details += "<span>" + quest.obs + "</span>"

    $("#event-created-details").html(details);
    $("#event-data-container").slideDown();

    $("#event-color").val(quest.color);
    $("#event-image").val(quest.image);

    if (quest.ticket) {
        $("#event-ticket").attr("checked", "checked");
        $("#event-ticket").trigger("change");
    }
}

function updateQuestSummary(quest) {
    let mailto = "mailto:" + quest.contact_email;
    let phoneto = getWhatsappUrl(quest.contact_phone);

    let image = quest.image;
    if (!image) {
        image = "../images/no-image-icon-square.png";
    }
    $("#event-created-image").html("<img src='" + image + "' alt='Event image' class='event-image image-fit border' />");

    $("#event-author-email").attr("href", mailto);
    $("#event-author-email-text").text("E-mail: " + quest.contact_email);

    $("#event-author-phone").attr("href", phoneto);
    $("#event-author-phone-text").text("Telefone: " + quest.contact_phone);

    $("#event-created-author-name").text("Criado por: " + quest.author_name);
    $("#event-created-date").text("Criado em: " + formatDateObject(quest.dt));
    $("#event-members-counter").text("Membros: " + quest.members);
    $("#event-confirmed-counter").text("Confirmações: " + quest.confirmed);

    $("#event-summary-content").slideDown();
}

function displayNoEventWarning() {
    if ($("#no-event-warning-message").length > 0) {
        let message = "O evento não foi encontrado ou você não está vinculado a ele. Não há nada para exibir.";

        $("#no-event-warning-message").slideDown();
        $("#no-event-warning-message").html("<p>" + message + "</p>");
    }
}

function addConfirmEventAction(id) {
    $("#confirm-event").on("click", async function () {
        await confirmInAccepted(id)
        reloadPage();
    });
}

function addRemoveEventAction(id) {
    $("#remove-event").on("click", async function () {
        $("#remove-event-confirmation-container").slideDown();
    });

    $("#remove-event-cancel").on("click", async function () {
        $("#remove-event-confirmation-container").slideUp();
    });

    $("#remove-event-confirm").on("click", async function () {
        await removeFromAccepted(id);
        redirectToEventPageUrl(id);
    });
}
