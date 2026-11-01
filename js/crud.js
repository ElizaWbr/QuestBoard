import { firebaseAuth, firebaseDB, getAuthUser } from "./firebase.js";
import { addDoc, setDoc, getDoc, collection, doc, deleteDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const eventsDatabaseName = "Quests";
const acceptedDatabaseName = "Aceppted";
const createdDatabaseName = "Created";

export async function getCurrentUserUid() {
    const authUser = await getAuthUser();
    if (authUser) {
        return authUser.uid;
    }
}

export async function getCurrentUser() {
    const authUser = await getAuthUser();
    if (authUser) {
        return authUser;
    }
}

export async function isCurrentUserAuthor(questId, quest = []) {
    let currentUser = await getCurrentUserUid();
    if (!quest) {
        quest = await getQuestData(questId);
    }
    return quest.author == currentUser;
}

/* Names */

export async function getQuestDatabaseName(id = "") {
    let name = eventsDatabaseName;
    return getDatabaseName(id, name);
}

export async function getAcceptedDatabaseName(id = "") {
    let name = "Users/" + await getCurrentUserUid() + "/" + acceptedDatabaseName;
    return getDatabaseName(id, name);
}

export async function getCreatedDatabaseName(id = "") {
    let name = "Users/" + await getCurrentUserUid() + "/" + createdDatabaseName;
    return getDatabaseName(id, name);
}

function getDatabaseName(id, name) {
    if (id) {
        return name + "/" + id;
    }
    return name;
}

/* Quests */

export async function getQuestDoc(id) {
    let database = await getQuestDatabaseName(id);
    return doc(firebaseDB, database);
}

export async function getQuestData(id) {
    let questRef = await getQuestDoc(id);
    const questSnap = await getDoc(questRef);

    if (!questSnap.exists()) {
        return null;
    }

    return {
        id: questSnap.id,
        ...questSnap.data()
    };
}

async function updateConfirmed(id, isAdd = true) {
    let questData = await getQuestData(id);
    if (isQuestDeleted(questData)) {
        return;
    }
    let confirmed = parseInt(questData.confirmed);
    if (isAdd == true) {
        confirmed = confirmed + 1;
    } else {
        confirmed = confirmed - 1;
    }

    await updateEvent(id, {
        confirmed: confirmed
    });
}

async function updateMembers(id, isAdd = true) {
    let questData = await getQuestData(id);
    if (isQuestDeleted(questData)) {
        return;
    }

    let members = parseInt(questData.members);

    if (isAdd == true) {
        members = members + 1;
    } else {
        members = members - 1;
    }

    await updateEvent(id, {
        members: members
    });
}

/* Event */

export async function addEvent(data) {
    data.dt = serverTimestamp();
    data.dtup = serverTimestamp();

    let databaseName = await getQuestDatabaseName();
    const docRef = await addDoc(collection(firebaseDB, databaseName), data);
    console.log("Evento registrado.");

    await saveInCreated(docRef.id);

    redirectToManagePageUrl(docRef.id);
}

export async function updateEvent(id, data) {
    if (!id) {
        return;
    }

    data.dtup = serverTimestamp();
    let docRef = await getQuestDoc(id);

    console.log(data);

    await updateDoc(docRef, data);

    console.log("Evento atualizado");
    reloadPage();
}

export async function deleteEvent(id) {
    if (!id) {
        console.log("Não tem como deletar um evento que não existe");
        return;
    }
    let databaseName = await getQuestDatabaseName(id);
    const docRef = doc(firebaseDB, databaseName);
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
        console.log("Não tem como deletar um evento que não existe");
        return;
    }

    let data = snap.data();
    if (isQuestDeleted(data)) {
        console.log("Este evento já foi deletado.")
        return;
    }
    await setDoc(docRef, {
        author: data.author,
        author_email: data.author_email,
        author_name: data.author_name,
        name: data.name,
        dt: data.dt,
        dtup: data.dtup,
        deleted: serverTimestamp(),
    });

    //await deleteDoc(docRef);
    console.log("Evento deletado.");

    await removeFromCreated(docRef.id);
    reloadPage();
}

export function getDeletedEventMessage(quest) {
    let message = "<div class='flex-center-center flex-column less-gap'>";
    message += "<span>O evento <b>" + quest.name + "</b> foi deletado no dia " + formatDateObject(quest.deleted) + ".</span>";
    message += "<span>Caso tenha dúvidas entre em contato com <b>" + quest.author_name + "</b>";
    message += " através do e-mail <b>" + quest.author_email + "</b>. </span>";
    message += "</div>";
    return message;
}

export function displayDeletedEventWarning(quest) {
    if ($("#no-event-warning-message").length > 0) {
        let message = getDeletedEventMessage(quest)

        $("#no-event-warning-message").slideDown();
        $("#no-event-warning-message").html(message);
    }
}

export function isQuestDeleted(quest) {
    return typeof quest.deleted != "undefined";
}

/* Created */

export async function saveInCreated(id) {
    let databaseName = await getCreatedDatabaseName();
    const docRef = doc(firebaseDB, databaseName, id);
    await setDoc(docRef, { id: id });

    return docRef.id;
}

export async function removeFromCreated(id) {
    let databaseName = await getCreatedDatabaseName(id);
    const docRef = doc(firebaseDB, databaseName);
    await deleteDoc(docRef);
}

/* Accept */

async function isCustomerInEvent(id) {
    let databaseName = await getAcceptedDatabaseName(id);
    let docRef = doc(firebaseDB, databaseName);
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
        return false;
    }
    return true;
}

export async function getCustomerConfirmedInAccepted(id) {
    let databaseName = await getAcceptedDatabaseName(id);
    let docRef = doc(firebaseDB, databaseName);
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
        return null;
    }
    let data = snap.data();
    return data.confirmed;
}

export async function saveInAccepted(id) {
    let isCurrentUser = await isCurrentUserAuthor(id);
    if (isCurrentUser) {
        return;
    }
    let databaseName = await getAcceptedDatabaseName(id);
    const docRef = doc(firebaseDB, databaseName);
    await setDoc(docRef, {
        id: id,
        confirmed: 0,
        dt: serverTimestamp()
    });

    await updateMembers(id, true);

    return docRef.id;
}

export async function confirmInAccepted(id) {
    if (!id) {
        return;
    }

    let isCurrentUser = await isCurrentUserAuthor(id);
    if (isCurrentUser) {
        return;
    }

    let databaseName = await getAcceptedDatabaseName(id);
    let docRef = doc(firebaseDB, databaseName);
    await updateDoc(docRef, {
        confirmed: serverTimestamp()
    });
    console.log("Accepted atualizado");

    await updateConfirmed(id, true);
    return docRef.id;
}

export async function removeFromAccepted(id) {
    try {
        let isCurrentUser = await isCurrentUserAuthor(id);
        if (isCurrentUser) {
            return;
        }
        let databaseName = await getAcceptedDatabaseName(id);
        const docRef = doc(firebaseDB, databaseName);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
            let data = snap.data();
            if (data.confirmed != 0) {
                await updateConfirmed(id, false);
            }
        }

        updateMembers(id, false);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Erro ao remover evento:", error);
    }
}

export async function validateQuestInUser(quest) {
    let currentUser = await getCurrentUserUid();
    if (currentUser == quest.author) {
        return true;
    }

    let id = quest.id;
    return await isCustomerInEvent(id);
}


/* Format */

export function formatDate(date) {
    if (!date) {
        return "";
    }
    return date.split("-").reverse().join("/");
}

export function formatDateObject(date) {
    let toDate = date.toDate();
    return toDate.toLocaleString("pt-BR");
}

/* Redirect */

export function reloadPage() {
    window.location.reload();
}

export function redirectToManagePageUrl(id = "") {
    return window.location.href = getManagePageUrl(id);
}

export function getManagePageUrl(id = "") {
    let page = "manage.php";
    if (id) {
        page += "?id=" + id;
    }
    return page;
}

export function redirectToEventPageUrl(id = "") {
    return window.location.href = getEventPageUrl(id);
}

export function getEventPageUrl(id) {
    if (!id) {
        return "events.php";
    }
    return "event.php?id=" + id;
}

export function getEnterQuestPageUrl() {
    let page = "accept.php";
    return page;
}
