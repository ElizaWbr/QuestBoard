import { firebaseAuth, firebaseDB } from "./firebase.js";
import { addDoc, setDoc, getDoc, collection, doc, deleteDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const eventsDatabaseName = "Quests";
const acceptedDatabaseName = "Aceppted";
const createdDatabaseName = "Created";

$(document).ready(function () {
    addFormActions();
});

function addFormActions() {
    $("#manage-save-event").on("click", async function () {
        await saveData()
    });
    $("#manage-delete-event").on("click", async function () {
        await deleteEvent();
    });
}

export function getCurrentUserUid() {
    return firebaseAuth.currentUser.uid;
}

export function getCurrentUser() {
    return firebaseAuth.currentUser;
}

/* Names */

export function getQuestDatabaseName(id = "") {
    let name = eventsDatabaseName;
    return getDatabaseName(id, name);
}

export function getAcceptedDatabaseName(id = "") {
    let name = "Users/" + getCurrentUserUid() + "/" + acceptedDatabaseName;
    return getDatabaseName(id, name);
}

export function getCreatedDatabaseName(id = "") {
    let name = "Users/" + getCurrentUserUid() + "/" + createdDatabaseName;
    return getDatabaseName(id, name);
}

function getDatabaseName(id, name) {
    if (id) {
        return name + "/" + id;
    }
    return name;
}

function setError(error) {
    $("#event-form-error-message").slideDown();
    $("#event-form-error-message").text(error);
}

async function saveData() {
    let id = $("#event-id").length > 0 ? $("#event-id").val() : "";
    let author = getCurrentUser();

    let data = {
        author: author.uid,
        author_name: author.name,
        author_email: author.email,
        name: $("#event-name").val(),
        description: $("#event-description").val(),
        date_start: $("#event-date-start").val(),
        date_end: $("#event-date-end").val(),
        time_start: $("#event-time-start").val(),
        time_end: $("#event-time-end").val(),
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
        if (key == "ticket") {
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
        await doUpdateEvent(id, data);
    }

    console.log(data);
}

/* Quests */

export function getQuestDoc(id) {
    return doc(firebaseDB, getQuestDatabaseName(id));
}

export async function getQuestData(id) {
    let questRef = getQuestDoc(id);
    const questSnap = await getDoc(questRef);

    if (!questSnap.exists()) {
        return null;
    }

    return {
        id: questSnap.id,
        ...questSnap.data()
    };
}

async function addEvent(data) {
    data.dt = serverTimestamp();
    data.dtup = serverTimestamp();

    const docRef = await addDoc(collection(firebaseDB, getQuestDatabaseName()), data);
    console.log("Evento registrado.");

    saveInCreated(docRef.id);
}

async function doUpdateEvent(id, data) {
    if (!id) {
        return;
    }

    data.dtup = serverTimestamp();
    let docRef = getQuestDoc(id);
    await updateDoc(docRef, data);

    console.log("Evento atualizado");
    return docRef.id;
}

async function updateConfirmed(id, isAdd = true) {
    let questData = await getQuestData(id);
    let confirmed = parseInt(questData.confirmed);
    if (isAdd == true) {
        confirmed = confirmed + 1;
    } else {
        confirmed = confirmed - 1;
    }

    await doUpdateEvent(id, {
        confirmed: confirmed
    });
}

async function updateMembers(id, isAdd = true) {
    let questData = await getQuestData(id);
    let members = parseInt(questData.members);
    if (isAdd == true) {
        members = members + 1;
    } else {
        members = members - 1;
    }

    await doUpdateEvent(id, {
        members: members
    });
}

async function deleteEvent(id) {
    const docRef = doc(firebaseDB, getQuestDatabaseName(id));
    await deleteDoc(docRef);
    console.log("Evento deletado.");

    removeFromCreated(docRef.id);
}

/* Created */

async function saveInCreated(id) {
    const docRef = doc(firebaseDB, getCreatedDatabaseName(), id);
    await setDoc(docRef, { id: id });

    return docRef.id;
}

async function removeFromCreated(id) {
    const docRef = doc(firebaseDB, getCreatedDatabaseName(id));
    await deleteDoc(docRef);
}

/* Accept */

export async function saveInAccepted(id) {
    const docRef = doc(firebaseDB, getAcceptedDatabaseName(), id);
    await setDoc(docRef, {
        id: id,
        confirmed: 0,
        dt: serverTimestamp()
    });

    updateMembers(id, true);

    return docRef.id;
}

async function confirmInAccepted(id) {
    if (!id) {
        return;
    }

    let docRef = doc(firebaseDB, getAcceptedDatabaseName(id));
    await updateDoc(docRef, {
        confirmed: serverTimestamp()
    });
    console.log("Accepted atualizado");

    await updateConfirmed(id, true);
    return docRef.id;
}

async function removeFromAccepted(id) {
    const docRef = doc(firebaseDB, getAcceptedDatabaseName(id));
    if (docRef.confirmed) {
        await updateConfirmed(id, false);
    }
    updateMembers(id, false);
    await deleteDoc(docRef);
}

