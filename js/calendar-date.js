
$(document).ready(async function () {
    if ($("#calendar-date-container").length) {
        await buildDateCalendar();
    }
});

/* Date calendar */

async function buildDateCalendar() {
    await buildDatePagination();
}

async function buildDatePagination() {
}
