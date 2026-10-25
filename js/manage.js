import { getQuestData } from "./crud.js";

$(document).ready(async function () {
    addTicketController();
    await setSavedData();
});

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

function updateQuestSummary(quest) {
    $("#manage-event-created-date").text("Criado em: " + formatDate(quest.dt));
    $("#manage-event-edited-date").text("Editado em: " + formatDate(quest.dtup));
    $("#manage-event-members-counter").text("Membros: " + quest.members);
    $("#manage-event-confirmed-counter").text("Confirmações: " + quest.confirmed);

    $("#event-summary-content").slideDown();
}

function addTicketController() {
    $("#event-ticket").on("change", function () {
        $("#event-ticket-controller").slideToggle(300);
    });
}

function formatDate(date) {
    let toDate = date.toDate();
    return toDate.toLocaleString("pt-BR");
}
