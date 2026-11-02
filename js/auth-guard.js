import { firebaseAuth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

//<script type="module" src="../js/auth-guard.js"></script>

const currentPage = window.location.pathname;
const loginPage = currentPage.endsWith("/login.php");
const homePage = currentPage.endsWith("/home.php");

onAuthStateChanged(firebaseAuth, (user) => {
    if (!user && !loginPage) {
        window.location.replace("../pages/login.php");
        return;
    }

    if (user && loginPage) {
        window.location.replace("../pages/home.php");
    }
});
