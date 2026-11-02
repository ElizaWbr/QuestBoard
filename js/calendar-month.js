import { getCurrentUserAllEvents, formatCalendarDate, setCalendarTitle } from "./calendar.js";
import { getSelectedDate, getCurrentDate, getCalendarEvents } from "./calendar.js";
import { setSelectedDate, setCurrentDate, setCalendarEvents, setCalendarEventsStartDate, setCalendarEventsEndDate } from "./calendar.js";
import { showDayCalendar } from "./calendar-date.js";

const calendarMonth = "calendar-month";
const calendarDays = "calendar-days";

const today = new Date();

$(document).ready(async function () {
    /* Change to month view */
    await showMonthCalendar();
    $("#calendar-month-view-button").on("click", async function () {
        await showMonthCalendar();
    });
});

async function showMonthCalendar() {
    $("#calendar-day-view").hide();
    $("#calendar-month-view").show();

    await buildCalendar();
}

export function prevMonth() {
    let currentDate = getCurrentDate();
    currentDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(currentDate);

    renderCalendarHtml();
}

export function nextMonth() {
    let currentDate = getCurrentDate();
    currentDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(currentDate);

    renderCalendarHtml();
}

async function buildCalendar() {
    setSelectedDate(new Date(today));
    let currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
    setCurrentDate(currentDate);
    await loadCalendarEvents();
}

async function loadCalendarEvents() {
    let { startDate, endDate } = getCalendarDateRange();
    setCalendarEventsStartDate(formatCalendarDate(startDate));
    setCalendarEventsEndDate(formatCalendarDate(endDate));

    setCalendarEvents(await getCurrentUserAllEvents(startDate, endDate));
    renderCalendarHtml();
}

function renderCalendarHtml() {
    let currentDate = getCurrentDate();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    /* Month name and year */
    let newCalendarTitle = currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    setCalendarTitle(newCalendarTitle);
    $("#" + calendarDays).empty();

    /* First and last month dates */
    let firstDay = new Date(year, month, 1);
    let lastDay = new Date(year, month + 1, 0);

    let daysInMonth = lastDay.getDate();
    let startWeekDay = firstDay.getDay();

    /* Last day from previous month */
    let previousMonthLastDay = new Date(year, month, 0).getDate();

    /* Always display 42 days (6 weeks) */
    for (let i = 0; i < 42; i++) {
        let date = null;
        if (i < startWeekDay) {
            /* Last month */
            let day = previousMonthLastDay - startWeekDay + i + 1;
            date = new Date(year, month - 1, day);
        } else if (i >= startWeekDay + daysInMonth) {
            /* Next month */
            let day = i - startWeekDay - daysInMonth + 1;
            date = new Date(year, month + 1, day);
        } else {
            /* Current month */
            let day = i - startWeekDay + 1;
            date = new Date(year, month, day);
        }

        let dayClass = "";

        /* Prev ou next month */
        if (date.getMonth() !== month) {
            dayClass += " other-month";
        }

        /* Current date */
        if (sameDate(date, today)) {
            dayClass += " today";
        }

        /* Selected date */
        let selected = getSelectedDate();
        if (sameDate(date, selected)) {
            dayClass += " selected";
        }

        let day = "<div id='calendar-date-" + i + "' class='calendar-day" + dayClass + "'>";
        day += "<div class='day-number'>" + date.getDate() + "</div>";
        day += "<div class='calendar-events'></div>";
        day += "</div>";
        $("#" + calendarDays).append(day);

        /* Render events */
        let eventsContainer = $("#calendar-date-" + i + " .calendar-events");
        renderCalendarEvents(date, eventsContainer);

        $("#calendar-date-" + i).on("click", function () {
            setSelectedDate(new Date(date));
            let currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
            setCurrentDate(currentDate);

            showDayCalendar();
        });

    }
}

function renderCalendarEvents(date, container) {
    let formattedDate = formatCalendarDate(date);
    let events = getCalendarEvents();
    let dayEvents = events.filter(event => {
        return formattedDate >= event.date_start && formattedDate <= event.date_end;
    });

    dayEvents.forEach(event => {
        let eventHtml = "<div class='calendar-event' title='" + event.name + "' style='background-color: " + event.color + ";'>";
        eventHtml += event.name;
        eventHtml += "</div>";
        container.append(eventHtml);
    });
}

function getCalendarDateRange() {
    let currentDate = getCurrentDate();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    let firstDay = new Date(year, month, 1);
    let startDate = new Date(year, month, 1 - firstDay.getDay());
    let endDate = new Date(startDate);

    endDate.setDate(startDate.getDate() + 41);

    return { startDate, endDate };
}

function sameDate(date1, date2) {
    return formatCalendarDate(date1) === formatCalendarDate(date2);
}

