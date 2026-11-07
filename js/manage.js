import { addEvent, updateEvent, deleteEvent, getCurrentUser, redirectToEventPageUrl, isQuestDeleted, updateEventAndReload } from "./crud.js";
import { getQuestData, formatDateObject } from "./crud.js";
import { disableLoader } from "./loader.js";


$(document).ready(async function () {
    addTicketController();
    addFormActions();
    await setSavedData();

    disableLoader();
});

function addTicketController() {
    $("#event-ticket").on("change", function () {
        $("#event-ticket-controller").slideToggle(300);
    });
}

function addFormActions() {
    $("#manage-save-event").on("click", async function () {
        await doSaveEvent()
    });
    $("#manage-delete-event").on("click", async function () {
        $("#manage-delete-event-confirmation-container").slideDown();
    });

    $("#manage-delete-event-cancel").on("click", async function () {
        $("#manage-delete-event-confirmation-container").slideUp();
    });

    $("#manage-delete-event-confirm").on("click", async function () {
        await doDeleteEvent();
    });
}

/* CRUD */

async function doSaveEvent() {
    let id = $("#event-id").length > 0 ? $("#event-id").val() : "";
    let author = await getCurrentUser();

    let data = {
        author: author.uid,
        author_name: author.displayName,
        author_email: author.email,
        contact_email: $("#event-contact-email").val(),
        contact_phone: $("#event-contact-phone").val(),
        name: $("#event-name").val(),
        description: $("#event-description").val(),
        date_start: $("#event-date-start").val(),
        date_end: $("#event-date-end").val(),
        time_start: $("#event-time-start").val(),
        time_end: $("#event-time-end").val(),
        location: $("#event-location").val(),
        ticket: $("#event-ticket").is(":checked"),
        ticket_price: $("#event-ticket-price").val(),
        ticket_url: $("#event-ticket-url").val(),
        obs: $("#event-obs").val(),
        color: $("#event-color").val(),
        image: $("#event-image").val(),
        members: 1, /* Ownwer */
        confirmed: 1 /* Ownwer */
    };

    let error = "";
    for (const [key, value] of Object.entries(data)) {
        if (key == "ticket" || key == "ticket_price" || key == "ticket_url" || key == "image" || key == "obs") {
            continue;
        }
        if (!value) {
            error = "Por favor adicione todas as informações antes de salvar";
        }
    }

    if (error) {
        setError(error);
        return;
    }

    $("#event-form-error-message").slideUp();

    if (id == "") {
        await addEvent(data);
    } else {
        await updateEventAndReload(id, data);
    }
}

async function doDeleteEvent(){
    let id = $("#event-id").length > 0 ? $("#event-id").val() : "";
    await deleteEvent(id);
}

function setError(error) {
    $("#event-form-error-message").slideDown();
    $("#event-form-error-message").text(error);
}

/* SAVED DATA */

function updateQuestSummary(quest) {
    $("#manage-event-created-date").text("Criado em: " + formatDateObject(quest.dt));
    $("#manage-event-edited-date").text("Editado em: " + formatDateObject(quest.dtup));
    $("#manage-event-members-counter").text("Membros: " + quest.members);
    $("#manage-event-confirmed-counter").text("Confirmações: " + quest.confirmed);
    $("#manage-event-invite-code").text("Código para convite: " + quest.id);
    $("#event-summary-content").slideDown();
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

    if (isQuestDeleted(quest)) {
        redirectToEventPageUrl(questId);
        return;
    }
    
    updateQuestSummary(quest);

    $("#event-name").val(quest.name);
    $("#event-description").val(quest.description);
    $("#event-contact-email").val(quest.contact_email);
    $("#event-contact-phone").val(quest.contact_phone);
    $("#event-date-start").val(quest.date_start);
    $("#event-date-end").val(quest.date_end);
    $("#event-time-start").val(quest.time_start);
    $("#event-time-end").val(quest.time_end);
    $("#event-location").val(quest.location);
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

