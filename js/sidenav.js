
document.getElementById("topbar-control-sidenav").addEventListener("click", updateSideNavState);

function updateSideNavState() {
    document.getElementById("the-sidenav").classList.toggle("hide");
    document.getElementById("the-topbar").classList.toggle("background-transparent");
}