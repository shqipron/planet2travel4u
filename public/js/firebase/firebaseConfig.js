
function initializeFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyBDk7T8_R03S83lZeJiRkjtgYxdfmldeZw",
        authDomain: "plan2travel4u.firebaseapp.com",
        databaseURL: "https://plan2travel4u-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "plan2travel4u",
        storageBucket: "plan2travel4u.appspot.com",
        messagingSenderId: "23144614495",
        appId: "1:23144614495:web:632bb9004f92a62d82a9ea",
        measurementId: "G-T98TSL8RYN",
        dataBaseURL: "gs://plan2travel4u.appspot.com"
    };

    firebase.initializeApp(firebaseConfig);
}

export {initializeFirebase};