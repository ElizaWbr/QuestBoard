import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9VU-xecHvvZzEufBa_tEHUrDgQI337r8",
    authDomain: "quest-board-9aa7c.firebaseapp.com",
    projectId: "quest-board-9aa7c",
    storageBucket: "quest-board-9aa7c.firebasestorage.app",
    messagingSenderId: "929611604787",
    appId: "1:929611604787:web:e7fb3cc28dcbc8f6411446"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

/* Auth */
export const firebaseAuth = getAuth(firebaseApp);
export const authPersistence = setPersistence(firebaseAuth, browserLocalPersistence);
export const firebaseGoogleProvider = new GoogleAuthProvider();

/* Database */
export const firebaseDB = getFirestore(firebaseApp);

/* Storage */
export const firebaseStorage = getStorage(firebaseApp);


/* Add data */
// async function addProvaGok(data) {
//     try {
//         const newDocRef = await db.collection("possiveisGoks").add({
//             argumento: data,
//             fixado: false,
//             criadoEm: firebase.firestore.FieldValue.serverTimestamp()
//         });
//     } catch (e) {
//         alert("Um erro foi gerado, por favor tire um print completo dessa tela e envie para Eliza: " + JSON.stringify(e));
//     }
// }
// window.addProvaGok = addProvaGok;

/* Update data */
// async function updateFixedGok(id, newVal) {
//     await db.collection("possiveisGoks").doc(id).set({
//         fixado: newVal
//     }, { merge: true });
// }
// window.updateFixedGok = updateFixedGok;

// async function getAllGoks() {
//     try {
//         const snapshot = await firebase.firestore().collection("possiveisGoks").get();
//         const allGoks = [];

//         snapshot.forEach((doc) => {
//             const data = doc.data();
//             allGoks.push({
//                 argumento: data.argumento,
//                 criadoEm: data.criadoEm || null,
//                 fixado: data.fixado || false,
//                 id: doc.id,
//             });
//         });

//         allGoks.sort((a, b) => {
//             if (a.fixado && !b.fixado) return -1;
//             if (!a.fixado && b.fixado) return 1;

//             const dataA = a.criadoEm ? a.criadoEm.toDate() : new Date(0);
//             const dataB = b.criadoEm ? b.criadoEm.toDate() : new Date(0);
            
//             return dataB - dataA;
//         });
//         return allGoks;
//     } catch (e) {
//         alert("Um erro foi gerado, por favor tire um print completo dessa tela e envie para Elisa: " + JSON.stringify(e));
//         return [];
//     }
// }
// window.getAllGoks = getAllGoks;

/* Auth process */
// async function signIn(email, password) {
//     let currentUser = firebase.auth().currentUser;
//     if (currentUser) {
//         window.location.replace("my-account.html");
//         return;
//     }
//     try {
//         const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
//         currentUser = userCredential.user;
//     } catch (error) {
//         currentUser = false;
//         if (error.code === 'auth/invalid-login-credentials') {
//             alert("Erro no login: Você não é o Gok.");
//         } else {
//             alert("Um erro foi gerado, por favor tire um print completo dessa tela e envie para Eliza: " + JSON.stringify(error));
//         }
//     }
//     if (currentUser) {
//         window.location.replace("my-account.html");
//     }
// }

// firebase.auth().onAuthStateChanged(function(user) {
//     displayNavBarLoginOrMyAccount();
//     displayAndHideHtml();
// });

// async function sendPasswordReset(email) {
//     if (!email) {
//         return "Por favor, informe um e-mail.";
//     }

//     try {
//         await firebase.auth().sendPasswordResetEmail(email);
//         return true;
//     } catch (error) {
//         if (error.code === 'auth/user-not-found') {
//             return "Esse e-mail não pertence ao Gok, acho que você não é ele heim (suspeito)";
//         } else {
//             return "Erro ao enviar email de recuperação. Tente novamente.";
//         }
//     }
// }
// window.sendPasswordReset = sendPasswordReset;

/* Logout */
// function doLogout(){
//     firebase.auth().signOut().then(() => {
//         window.location.replace("my-account.html");
//     })
//     .catch((error) => {
//         alert("Erro ao sair:", error);
//     });
// }
// window.doLogout = doLogout;