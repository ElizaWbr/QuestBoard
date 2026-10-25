import { firebaseDB } from "./firebase.js";
import { getQuestData, saveInAccepted, getCurrentUserUid, getAcceptedDatabaseName } from "./crud.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

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
        displayError("Não foi possível encontrar esse evento. Adicione outro ID e tente novamente.");
        return false;
    }

    return {
        id: questId,
        ...quest
    };
}

async function checkQuest() {
    console.log("a");
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
    const currentUser = getCurrentUserUid();

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
    const acceptedRef = doc(firebaseDB, getAcceptedDatabaseName(id));
    const acceptedSnap = await getDoc(acceptedRef);

    if (!acceptedSnap.exists()) {
        return null;
    }

    return acceptedSnap.id;
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
    displaySummaryContainer();
    $("#accept-valid-event-data").slideUp();
    $("#ivalid-event-warning").slideDown();
    $("#ivalid-event-warning").html(error);
}

async function displayQuest(quest) {
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

function hideDeleteButton() {
    if ($("#manage-delete-event").length > 0) {
        $("#manage-delete-event").addClass("hide");
    }
}

function formatDate(date) {
    let toDate = date.toDate();
    return toDate.toLocaleString("pt-BR");
}
