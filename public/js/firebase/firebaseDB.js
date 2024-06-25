import {initializeFirebase} from "./firebaseConfig.js"

let database;

//TODO: Mehrere Tabellen pro unterseite
//TODO: Metadata einfügen - Größe Tabelle/ Zeitpunkt usw.
function writeUserData(userId, sub, payload) {
    return initializeFirebase().then(_ => {
        database = firebase.database(firebase);
        return database.ref('users/' + userId + `/${sub}`).set({
            payload: payload
        });
    })
}

function getUserData(userId, sub) {
    return initializeFirebase().then(_ => {
        database = firebase.database(firebase);
        return database.ref('users/' + userId + `/${sub}`).get().then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return "Missing Data";
            }
        }).catch((error) => {
            console.error(error);
        });
    })
}

export {writeUserData, getUserData}



