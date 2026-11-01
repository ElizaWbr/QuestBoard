import { firebaseDB } from "./firebase.js";
import { getAcceptedDatabaseName, getCreatedDatabaseName } from "./crud.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";


import { getQuestsInIds } from "./created-events.js";

export async function getCurrentUserAllEvents(startDate, endDate) {
    try {
        const createdDatabase = await getCreatedDatabaseName();
        const acceptedDatabase = await getAcceptedDatabaseName();

        const createdSnapshot = await getDocs(collection(firebaseDB, createdDatabase));
        const acceptedSnapshot = await getDocs(collection(firebaseDB, acceptedDatabase));

        /* Combine and remove duplicated IDs */
        const ids = [...new Set([
            ...createdSnapshot.docs.map(doc => doc.id),
            ...acceptedSnapshot.docs.map(doc => doc.id)
        ])];

        if (ids.length === 0) {
            return [];
        }

        /* Get events data */
        const events = await getQuestsInIds(ids);

        /* Format dates */
        const start = formatCalendarDate(startDate);
        const end = formatCalendarDate(endDate);

        events.filter(event => {
            return event.date_start <= end && event.date_end >= start;
        });
        events.sort((a, b) => {
            const dateCompare = a.date_start.localeCompare(b.date_start);
            if (dateCompare !== 0) {
                return dateCompare;
            }
            return a.time_start.localeCompare(b.time_start);
        });
        return events;
    } catch (error) {
        console.error("Erro ao buscar eventos do calendário:", error);
        return [];
    }
}

/* YYYY-MM-DD */
function formatCalendarDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}