import { firebaseAuth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { disableLoader } from "./loader.js";

$(document).ready(function () {
    /* Auth state */
    onAuthStateChanged(firebaseAuth, (user) => {
        checkCurrentUser(user);
        disableLoader();
    });
});

function checkCurrentUser(user) {
    if (user) {
        let userData = {
            "name": user.displayName,
            "email": user.email,
            "uid": user.uid,
            "image": user.photoURL
        };
        buildUserData(userData);
    }
}

function buildUserData(userData) {
    let src = userData.image;
    if (!src) {
        src = "../images/no-image-icon-square.png";
    }
    let image = "<img src='" + src + "' alt='User image' class='image-fit'/>"
    let name = "<p class='text-center'>" + userData.name + "</p>";
    let email = "<p class='text-center'>" + userData.email + "</p>";

    $("#my-account-image-data").html(image);
    $("#my-account-user-data").append(name);
    $("#my-account-user-data").append(email);
}
