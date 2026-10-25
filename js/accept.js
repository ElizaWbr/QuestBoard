import { getQuestData, saveInAccepted, getCurrentUserUid } from "./crud.js";

$(document).ready(async function () {
    addAcceptAction();
});

function addAcceptAction() {
    $("#enter-event").on("click", async function () {
        await checkQuest();
    });
    $("#accept-valid-event").on("click", async function () {
        await acceptQuest();
    });
}

async function getValidQuest() {
    let questId = $("#accept-event-id").val();
    if (!questId) {
        displayError("Adicione o ID de um evento.");
        return false;
    }

    const quest = await getQuestData(questId);
    if (!quest) {
        displayError("Não foi possível encotrar esse evento. Adicine outro ID e tente novamente.");
        return false;
    }

    return {
        id: questId,
        ...quest
    };
}

async function checkQuest() {
    displaySummaryContainer();

    const quest = await getValidQuest();

    const author = quest.author;
    const currentUser = getCurrentUserUid();
    
    if (author == currentUser) {
        displayError("Não é possível ingressar no seu próprio evento.");
        return;
    }

    if (quest) {
        displayQuest(quest);
        $("#accept-valid-event-data").slideDown();
    }
}

async function acceptQuest() {
    const quest = await getValidQuest();
    if (quest) {
        saveInAccepted(quest.id);
    }
}

function displaySummaryContainer() {
    $("#event-summary-content").slideDown();
}

function displayError(error) {
    $("#accept-valid-event-data").slideUp();
    $("#ivalid-event-warning").slideDown();
    $("#ivalid-event-warning").html(error);
}

function displayQuest(quest) {
    $("#ivalid-event-warning").slideUp();
    $("#ivalid-event-warning").html("");

    $("#manage-event-user-name").text("Nome: " + quest.author_name);
    $("#manage-event-user-email").text("E-mail: " + quest.author_email);

    $("#manage-event-image").text("Imagem: " + quest.image);
    $("#manage-event-color").text("Cor: " + quest.color);

    $("#manage-event-created-date").text("Criado em: " + formatDate(quest.dt));
    $("#manage-event-edited-date").text("Editado em: " + formatDate(quest.dtup));
    $("#manage-event-members-counter").text("Membros: " + quest.members);
    $("#manage-event-confirmed-counter").text("Confirmações: " + quest.confirmed);

    
}

async function setSavedData() {
    let questId = $("#event-id").val();
    if (!questId) {
        hideDeleteButton();
        return;
    }

    const quest = await getQuestData(questId);
    if (!quest) {
        hideDeleteButton();
        return;
    }

    console.log(quest);

    updateQuestSummary(quest);

    $("#event-name").val(quest.name);
    $("#event-description").val(quest.description);
    $("#event-date-start").val(quest.date_start);
    $("#event-date-end").val(quest.date_end);
    $("#event-time-start").val(quest.time_start);
    $("#event-time-end").val(quest.time_end);
    $("#event-ticket-price").val(quest.ticket_price);
    $("#event-ticket-url").val(quest.ticket_url);
    $("#event-obs").val(quest.obs);
    $("#event-color").val(quest.color);
    $("#event-image").val(quest.image);

    if (quest.ticket) {
        $("#event-ticket").attr("checked", "checked");
        $("#event-ticket").trigger("change");
    }

    // $("#manage-save-event").on("click");
}

function hideDeleteButton() {
    if ($("#manage-delete-event").length > 0) {
        $("#manage-delete-event").addClass("hide");
    }
}



function formatDate(date) {
    let toDate = date.toDate();
    return toDate.toLocaleString("pt-BR");
}
