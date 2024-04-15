import {getUserData} from "../firebase/firebaseDB.js";

function renderLogoutCard(containerId, btnCallback) {
    const container = document.getElementById(containerId);

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");

    const title = document.createElement("h3");
    title.classList.add("card-title");
    title.textContent = `Hallo ${firebase.auth().currentUser?.displayName || "User"}`;


    //TODO: Factorybutton mit content als Parameter
    const logoutButton = document.createElement("button");
    logoutButton.type = "button";
    logoutButton.classList.add("btn", "btn-danger", "mt-3");
    logoutButton.textContent = "Logout";

    //TODO: Callback definieren
    logoutButton.addEventListener("click", function () {
        firebase.auth().signOut();
        cardDiv.remove();
    })

    cardBodyDiv.appendChild(title);
    cardBodyDiv.appendChild(logoutButton);
    cardDiv.appendChild(cardBodyDiv);
    container.appendChild(cardDiv);
}

export { renderLogoutCard }