import { getCurrentUserAllEvents } from "./calendar.js";

const calendarTitle = "calendar-title";
const calendarMonth = "calendar-month";
const calendarDays = "calendar-days";

const today = new Date();

let selectedDate = null;
let currentDate = null;
let calendarEvents = [];

$(document).ready(async function () {
    await buildCalendar();
});

async function buildCalendar() {
    selectedDate = new Date(today);
    currentDate = new Date(today.getFullYear(), today.getMonth(), 1);

    /* Prev month */
    $("#calendar-prev").on("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendarHtml();
    });

    /* Next month */
    $("#calendar-next").on("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendarHtml();
    });

    await loadCalendarEvents();
}

async function loadCalendarEvents() {
    let { startDate, endDate } = getCalendarDateRange();
    calendarEvents = await getCurrentUserAllEvents(startDate, endDate);

    renderCalendarHtml();
}

function renderCalendarHtml() {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    /* Month name and year */
    let newCalendarTitle = currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    $("#" + calendarTitle).text(newCalendarTitle);
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
        if (sameDate(date, selectedDate)) {
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

        /* Date click */
        $("#calendar-date-" + i).on("click", function () {
            selectedDate = new Date(date);
            currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
            renderCalendarHtml();

            console.log("Data selecionada:", formatDate(selectedDate));
        });
    }
}

function renderCalendarEvents(date, container) {
    let currentDate = formatDate(date);

    let dayEvents = calendarEvents.filter(event => {
        return currentDate >= event.date_start && currentDate <= event.date_end;
    });

    dayEvents.forEach(event => {
        let eventHtml = "<div class='calendar-event' title='" + event.name + "' style='background-color: " + event.color + ";'>";
        eventHtml += event.name;
        eventHtml += "</div>";
        container.append(eventHtml);
    });
}

function getCalendarDateRange() {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    let firstDay = new Date(year, month, 1);
    let startDate = new Date(year, month, 1 - firstDay.getDay());
    let endDate = new Date(startDate);

    endDate.setDate(startDate.getDate() + 41);

    return { startDate, endDate };
}

/* YYYY-MM-DD */
function formatDate(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function sameDate(date1, date2) {
    return formatDate(date1) === formatDate(date2);
}

