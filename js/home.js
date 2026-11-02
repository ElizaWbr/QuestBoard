import { formatCalendarDate } from "./calendar.js";
import { getCurrentUserAcceptedEvents, getCurrentUserCreatedEvents } from "./created-events.js";
import { formatDate, getAcceptedOrCreatedEventUrl } from "./crud.js";

$(document).ready(async function () {
    await buildNextEvent();
    await buildMonthEvents();
});

async function buildNextEvent() {
    let nextEvent = await getNextUserEvent();
    let url = await getAcceptedOrCreatedEventUrl(nextEvent.id, nextEvent.author);

    let html = "<span class='text-center'>";
    html += "Seu próximo evento é o " + nextEvent.name + " no dia " + formatDate(nextEvent.date_start) + ".";
    html += "</span>";

    html += "<a href='" + url + "' class='btn text-icon'>";
    html += "<img src='../images/icons/eye.svg' alt='Plus' class='icon medium' />";
    html += "Ver o evento";
    html += "</a>";

    $("#user-next-event").html(html);
}

async function getNextUserEvent() {
    let events = await getEvents();
    let today = formatCalendarDate(new Date());
    events = events.filter(event => event.date_start >= today);

    events.sort((a, b) => {
        return a.date_start.localeCompare(b.date_start) || a.time_start.localeCompare(b.time_start);
    });

    return events.length > 0 ? events[0] : null;
}

async function buildMonthEvents() {
    let quests = await currentMonthEvents();

    $("#month-past-events").text(quests.past);
    $("#month-next-events").text(quests.future);
}

async function currentMonthEvents() {
    let events = await getEvents();

    let now = new Date();
    let firstDay = formatCalendarDate(new Date(now.getFullYear(), now.getMonth(), 1));
    let lastDay = formatCalendarDate(new Date(now.getFullYear(), now.getMonth() + 1, 0));
    let currentDate = formatCalendarDate(now);
    let currentTime = now.toTimeString().slice(0, 5);

    /* Only quests in current month */
    events = events.filter(event => {
        return event.date_start >= firstDay && event.date_start <= lastDay;
    });

    let pastEvents = 0;
    let futureEvents = 0;

    events.forEach(event => {
        let eventDateTime = event.date_start + "T" + event.time_start;
        let currentDateTime = currentDate + "T" + currentTime;

        if (eventDateTime < currentDateTime) {
            pastEvents++;
        } else {
            futureEvents++;
        }
    });

    return {
        past: pastEvents,
        future: futureEvents,
        total: events.length
    };
}

async function getEvents(){
    let createdEvents = await getCurrentUserCreatedEvents();
    let acceptedEvents = await getCurrentUserAcceptedEvents();
    let events = [...createdEvents, ...acceptedEvents];

    events = events.filter((event, index, self) => {
        return index === self.findIndex(e => e.id === event.id);
    });
    return events;
}