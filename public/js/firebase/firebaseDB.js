import { initializeFirebase } from "./firebaseConfig.js"
initializeFirebase();

var database = firebase.database(firebase);

//TODO: Mehrere Tabellen pro unterseite
//TODO: Metadata einfügen - Größe Tabelle/ Zeitpunkt usw.
function writeUserData(userId, sub, payload) {
    return database.ref('users/' + userId + `/${sub}`).set({
        payload: payload
    });
}

function getUserData(userId, sub){
    return database.ref('users/' + userId + `/${sub}`).get().then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return "Missing Data";
        }
    }).catch((error) => {
        console.error(error);
    });
}

export { writeUserData, getUserData }



