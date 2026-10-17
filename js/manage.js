$(document).ready(function () {
    setSavedData();
});

function setSavedData() {
    let createdDate = "10/10/2026";
    let editedDate = "12/10/2026";
    let peopleCounter = 21;

    if ($("#manage-event-created-date").length > 0) {
        $("#manage-event-created-date").text("Criado em: " + createdDate);
        $("#manage-event-edited-date").text("Editado em: " + editedDate);
        $("#manage-event-people-counter").text("Pessoas: " + peopleCounter.toString());

        //delete action
        // $("#manage-delete-event").on("click");
    }

    // $("#manage-save-event").on("click");
}