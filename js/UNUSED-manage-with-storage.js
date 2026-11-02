/* 
 * Firebase Storage is a billed feature, we will not use that in our project
 * BUT I already developed the complete structure, i don't want to just delete so I wiil keep in here
 */

import { ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-storage.js";

const imageUrl = await sendImageToStorage(eventId, image);

/* Storage */

async function sendImageToStorage(id, image){
    if (image) {
        const path = getEventImageName(id, image);
        const storageRef = ref(firebaseStorage, path);

        await uploadBytes(storageRef, image);

        return await getDownloadURL(storageRef);
    }
    return "";
}

async function deleteDocImage(imageUrl) {
    if (!imageUrl){ 
        return;
    }

    const imageRef = ref(firebaseStorage, imageUrl);
    await deleteObject(imageRef);

    console.log("Imagem deletada.");
}

function getEventImageName(id, file) {
    return "users/" + firebaseAuth.currentUser.uid + "/" + eventsDatabaseName + "/" + id + "/" + file.name;
}

