import { firebaseDB } from "./firebase.js";
import { getAcceptedDatabaseName, getCreatedDatabaseName } from "./crud.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getQuestsInIds } from "./created-events.js";

import { prevMonth, nextMonth } from "./calendar-month.js";
import { prevDate, nextDate } from "./calendar-date.js";

const calendarTitle = "calendar-title";
const calendarTitleDay = "calendar-title-day";
const calendarTitleMonth = "calendar-title-month";

let selectedDate = null;
let calendarEvents = [];
let calendarEventsStartDate = null;
let calendarEventsEndDate = null;
let currentDate = null;

$(document).ready(async function () {
    addNavControllers();
});

function addNavControllers() {
    /* Prev */
    $("#calendar-prev").on("click", function () {
        if (isCalendarMonth()) {
            prevMonth();
        } else {
            prevDate();
        }
    });

    /* Next */
    $("#calendar-next").on("click", function () {
        if (isCalendarMonth()) {
            nextMonth();
        } else {
            nextDate();
        }
    });
}

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

export function setCalendarTitle(titleDay, titleMonth) {
    if (titleDay) {
        $("#" + calendarTitleDay).text(titleDay);
        $("#" + calendarTitleDay).slideDown();
    } else {
        $("#" + calendarTitleDay).slideUp();
    }
    titleMonth = titleMonth.replace(/\sde\s/i, ' ');
    $("#" + calendarTitleMonth).text(titleMonth);
}

/* YYYY-MM-DD */
export function formatCalendarDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function isCalendarMonth() {
    return $("#calendar-day-view").is(":hidden");
}

/* Set */

export function setSelectedDate(newValue) {
    selectedDate = newValue;
}

export function setCurrentDate(newValue) {
    currentDate = newValue;
}

export function setCalendarEvents(newValue) {
    calendarEvents = newValue;
}

export function setCalendarEventsStartDate(newValue) {
    calendarEventsStartDate = newValue;
}

export function setCalendarEventsEndDate(newValue) {
    calendarEventsEndDate = newValue;
}

/* Get */

export function getSelectedDate() {
    return selectedDate;
}

export function getCurrentDate() {
    return currentDate;
}

export function getCalendarEvents() {
    return calendarEvents;
}

export function getCalendarEventsStartDate() {
    return calendarEventsStartDate;
}

export function getCalendarEventsEndDate() {
    return calendarEventsEndDate;
}
