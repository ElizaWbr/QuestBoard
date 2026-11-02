import { setSelectedDate, setCurrentDate, getSelectedDate, getCalendarEvents, getCalendarEventsStartDate, getCalendarEventsEndDate } from "./calendar.js";
import { formatCalendarDate, setCalendarTitle } from "./calendar.js";
import { loadCalendarEvents } from "./calendar-month.js";
import { redirectToAcceptedOrCreatedEvent } from "./crud.js";
import { disableLoader } from "./loader.js";

const eventsContainer = "calendar-day-events";

export function prevDate() {
    navigateDay(-1);
}

export function nextDate() {
    navigateDay(1);
}

export function showDayCalendar() {
    $("#calendar-month-view").hide();
    $("#calendar-day-view").show();

    renderDayCalendarHtml();

    $(".calendar-day-scroll").scrollTop(0);
}

function renderDayCalendarHtml() {
    let selected = getSelectedDate();
    let titleDay = selected.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric" });
    let titleMonth = selected.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

    setCalendarTitle(titleDay, titleMonth);
    renderCalendarHours();

    $("#" + eventsContainer).empty();

    let events = getEventsFromSelectedDate();
    let organizedEvents = organizeOverlappingEvents(events);

    organizedEvents.forEach(item => {
        let quest = item.event;

        let top = item.start;
        let height = item.end - item.start;

        let width = 100 / item.columns;
        let left = width * item.column;

        let selected = getSelectedDate();
        let startTime = item.start === 0 && quest.date_start !== formatCalendarDate(selected) ? "00:00" : quest.time_start;
        let endTime = item.end === 1440 && quest.date_end !== formatCalendarDate(selected) ? "23:59" : quest.time_end;

        let style = "top: " + top + "px;";
        style += "height: " + Math.max(height, 20) + "px;";
        style += "left: calc(" + left + "% + 2px);";
        style += "width: calc(" + width + "% - 4px);";
        style += "background-color: " + (quest.color || "#4285f4") + ";";

        let dayEventId = "calendar-day-event-" + quest.id;
        let eventHtml = "<div id='" + dayEventId + "' class='calendar-day-event' title='" + quest.name + "' style='" + style + "'>";
        eventHtml += "<strong>" + quest.name + "</strong>";
        eventHtml += "<span>" + startTime + " - " + endTime + "</span>";
        eventHtml += "</div>";

        $("#" + eventsContainer).append(eventHtml);

        $("#" + dayEventId).on("click", function () {
            redirectToAcceptedOrCreatedEvent(quest.id, quest.author);

            // console.log("Evento selecionado:", quest);
        });
    });
}

function organizeOverlappingEvents(events) {
    let organized = events.map(event => {
        let times = getEventMinutes(event, getSelectedDate());

        return {
            event: event,
            start: times.start,
            end: times.end,
            column: 0,
            columns: 1
        };
    });
    organized = organized.filter(item => item.end > item.start);
    organized = organized.sort((a, b) => {
        return a.start - b.start || a.end - b.end;
    });

    let groups = [];
    let group = [];
    let groupEnd = -1;

    // Separate overlapping groups
    organized.forEach(item => {

        if (group.length > 0 && item.start >= groupEnd) {
            groups.push(group);
            group = [];
            groupEnd = -1;
        }

        group.push(item);
        groupEnd = Math.max(groupEnd, item.end);
    });

    if (group.length > 0) {
        groups.push(group);
    }

    groups.forEach(group => {
        let columns = [];
        group.forEach(item => {
            let columnIndex = columns.findIndex(column => {
                return column <= item.start;
            });

            if (columnIndex === -1) {
                columnIndex = columns.length;
                columns.push(item.end);
            } else {
                columns[columnIndex] = item.end;
            }
            item.column = columnIndex;
        });

        let totalColumns = columns.length;

        group.forEach(item => {
            item.columns = totalColumns;
        });
    });

    return organized;
}

function getEventMinutes(event, date) {
    let selected = formatCalendarDate(date);
    let startTime = event.date_start === selected ? event.time_start : "00:00";
    let endTime = event.date_end === selected ? event.time_end : "23:59";

    function toMinutes(time) {
        let [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    }

    return { start: toMinutes(startTime), end: toMinutes(endTime) };
}

function renderCalendarHours() {
    let html = "";

    for (let i = 0; i < 24; i++) {
        let hour = String(i).padStart(2, "0");

        html += "<div class='calendar-hour'>";
        html += "<span>" + hour + ":00</span>";
        html += "</div>";
    }

    $("#calendar-day-hours").html(html);
}

function getEventsFromSelectedDate() {
    let selected = getSelectedDate();
    let date = formatCalendarDate(selected);
    let calendarEvents = getCalendarEvents();
    return calendarEvents.filter(event => {
        return date >= event.date_start && date <= event.date_end;
    });
}

async function navigateDay(amount) {
    let selectedDate = getSelectedDate();
    selectedDate.setDate(selectedDate.getDate() + amount);

    setSelectedDate(selectedDate);

    let currentDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
    );
    setCurrentDate(currentDate);

    let selected = formatCalendarDate(selectedDate);

    /* Check if selected date is outside loaded range */
    if (selected < getCalendarEventsStartDate() || selected > getCalendarEventsEndDate()) {
        await loadCalendarEvents();
        disableLoader();
    }

    renderDayCalendarHtml();
}
