$(document).ready(async function () {
    // $(".btn").on("click", ableLoader);
});

export function ableLoader() {
    $("#loader").fadeIn();
}

export function disableLoader() {
    $("#loader").fadeOut();
}

export function ableComponentLoader(componentId) {
    let overlay = "<div id='component-loader-" + componentId + "' class='loader-overlay-content'>";
    overlay += "<div class='dot dot1'></div>";
    overlay += "<div class='dot dot2'></div>";
    overlay += "<div class='dot dot3'></div>";
    overlay += "</div>";

    $("#" + componentId).append(overlay);
}

export function disableComponentLoader(componentId) {
    $("#component-loader-" + componentId).fadeOut();
    $("#component-loader-" + componentId).remove();
}
