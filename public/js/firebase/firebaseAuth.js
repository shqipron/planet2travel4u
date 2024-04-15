import {initializeFirebase} from "./firebaseConfig.js"
import {renderLogoutCard} from "../component/logoutCard.js";

initializeFirebase();

const uiConfig = {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            if (authResult.user) {
            } else {
                console.log("Error with login")
            }
            return false;
        }
    },
    signInFlow: 'popup',
    signInSuccessUrl: 'not-existing.html'
};

function initializeUI(container) {

    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    if (firebase.auth().currentUser) {
        ui.start('#firebaseui-auth-container', uiConfig)
    }



    firebase.auth().onAuthStateChanged(function (user) {

        let saveBtn = document.getElementById("saveDBTable");
        let loadBtn = document.getElementById("loadDBTable");
        let userAuthBtn = Array.from(document.getElementsByClassName('userAuthBtn'));
        let UserAuthLogOutBtn = document.getElementById('UserAuthLogOutBtn');


        if (!user) {
            ui.start('#firebaseui-auth-container', uiConfig);
            loadBtn?.classList.toggle('disabled', true);
            saveBtn?.classList.toggle('disabled', true);

            userAuthBtn.forEach(item => {
                item.classList.toggle('d-none')
            })

            UserAuthLogOutBtn.classList.add('d-none')

            document.cookie = 'idToken' + "=" + '' + ";path=/";
        } else {
            const authModal = document.getElementById('authModal');
            const modal = bootstrap.Modal.getInstance(authModal);
            modal?.hide();

            ui.reset();
            //renderLogoutCard("firebaseui-auth-container");)

            userAuthBtn.forEach(item => {
                item.classList.add('d-none');
            })

            UserAuthLogOutBtn.classList.toggle('d-none')

            UserAuthLogOutBtn.addEventListener("click", function () {
                firebase.auth().signOut();
            })



            loadBtn?.classList.toggle('disabled', false);
            saveBtn?.classList.toggle('disabled', false);

            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                .then(function (idToken) {
                    document.cookie = 'idToken' + "=" + idToken + ";path=/";
                })
                .catch(function (error) {
                    console.error('Error getting ID token:', error);
                });

        }
    });
}

export {initializeUI}