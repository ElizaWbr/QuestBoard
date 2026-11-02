import { firebaseAuth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

$(document).ready(function () {
    /* Logout */
    $("#firebase-logout").on("click", async () => {
        doLogout();
    });
});

/* Logout */
async function doLogout() {
    try {
        await signOut(firebaseAuth);
        window.location.replace("login.php");
    } catch (error) {
        console.log(error);
    }
}
