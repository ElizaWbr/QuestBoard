import { firebaseAuth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

let currentUser;

// $(document).ready(function () {
    /* Auth state */
    // if (!currentUser) {
    //     onAuthStateChanged(firebaseAuth, (user) => {
    //         checkCurrentUser(user);
    //     });
    // }
// });

/* Auth state */
function checkCurrentUser(user) {
    if (user) {
        console.log(user);
        currentUser = {"name": user.displayName, "email": user.email, "uid": user.uid, "image": user.photoURL};
        console.log(currentUser);
    } else {
        currentUser = null;
        console.log("Nenhum usuário autenticado.");
    }
}

export function getCurrentUser(){
    return currentUser;
}