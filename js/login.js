import { firebaseAuth, firebaseGoogleProvider, authPersistence } from "./firebase.js";
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

$(document).ready(function () {
    const loginButton = $("#firebase-auth-google-login");

    /* Login */
    $(loginButton).on("click", async () => {
        await doLogin();
    });
});

/* Login */
async function doLogin() {
    let loginMessage = $("#firebase-auth-message");

    try {
        await authPersistence;
        
        const result = await signInWithPopup(firebaseAuth, firebaseGoogleProvider);
        const user = result.user;

        $(loginMessage).html(`Bem-vindo, ${user.displayName}!`);

        console.log("UID:", user.uid);
        console.log("E-mail:", user.email);

        // Redireciona após o login
        window.location.href = "./home.php";
    } catch (error) {
        console.error("Erro no login:", error.code);
        $(loginMessage).html("Não foi possível entrar com o Google.");
    }
}
