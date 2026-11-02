$(document).ready(function () {
    $("#topbar-control-sidenav").on("click", updateSideNavState);

    function updateSideNavState() {
        const sidenav = $("#the-sidenav");
        const topbar = $("#the-topbar-background-color");

        if (sidenav.hasClass("slide-away")) {
            sidenav.removeClass("slide-away");
            topbar.slideUp(300);
        } else {
            sidenav.addClass("slide-away");
            topbar.slideDown(300);
        }
    }
});
