import { firebaseDB } from "./firebase.js";
import { getQuestDatabaseName, getAcceptedDatabaseName, getCreatedDatabaseName } from "./crud.js";

import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// import { collection } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";


$(document).ready(async function () {
    await getAllQuests();
    await getCurrentUserCreatedEvents();
    await getCurrentUserAcceptedEvents();
});

export async function getAllQuests() {
    try {
        const collectionRef = collection(firebaseDB, getQuestDatabaseName());
        const snapshot = await getDocs(collectionRef);

        snapshot.forEach((doc) => {
            const data = doc.data();

            console.log("ID:", doc.id);
            console.log(data);
        });

        // return snapshot.docs.map((doc) => ({
        //     id: doc.id,
        //     ...doc.data()
        // }));

    } catch (error) {
        console.error("Erro ao buscar os documentos:", error);
        return [];
    }
}

export async function getCurrentUserCreatedEvents() {
    try {
        const collectionRef = collection(firebaseDB, getCreatedDatabaseName());
        const snapshot = await getDocs(collectionRef);

        snapshot.forEach((doc) => {
            const data = doc.data();

            console.log("ID:", doc.id);
            console.log(data);
        });

        // return snapshot.docs.map((doc) => ({
        //     id: doc.id,
        //     ...doc.data()
        // }));

    } catch (error) {
        console.error("Erro ao buscar os documentos:", error);
        return [];
    }
    
}


export async function getCurrentUserAcceptedEvents() {
try {
        const collectionRef = collection(firebaseDB, getAcceptedDatabaseName());
        const snapshot = await getDocs(collectionRef);

        snapshot.forEach((doc) => {
            const data = doc.data();

            console.log("ID:", doc.id);
            console.log(data);
        });

        // return snapshot.docs.map((doc) => ({
        //     id: doc.id,
        //     ...doc.data()
        // }));

    } catch (error) {
        console.error("Erro ao buscar os documentos:", error);
        return [];
    }
}



// const snapshot = await firebaseDB.collection("gokStatus").get();
    //     const goksRealStatistics = [];

    //     snapshot.forEach((doc) => {
    //         const data = doc.data();
    //         if (data.deixadaPor != "admin") {
    //             data.id = doc.id;
    //             goksRealStatistics.push(data);
    //         }
    //     });

    //     goksRealStatistics.sort((a, b) => {
    //         const dataA = a.data ? a.data.toDate() : new Date(0);
    //         const dataB = b.data ? b.data.toDate() : new Date(0);
            
    //         return dataA - dataB;
    //     });