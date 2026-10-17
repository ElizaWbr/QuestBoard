import { firebaseAuth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

$(document).ready(function () {
    /* Auth state */
    onAuthStateChanged(firebaseAuth, (user) => {
        checkCurrentUser(user);
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
    let image = "<img src='" + userData.image + "' alt='User image' class='image-fit'/>"
    let name = "<p class='text-center'>" + userData.name + "</p>";
    let email = "<p class='text-center'>" + userData.email + "</p>";

    $("#my-account-image-data").html(image);
    $("#my-account-user-data").append(name);
    $("#my-account-user-data").append(email);
}
