import {getUserData, writeUserData} from "../firebase/firebaseDB.js";
import {addPopoverTriggerEl} from "../Pattern/command/tableCommand.js";

export function saveToTableByName(tableName, table){
    let currentUser = firebase.auth()?.currentUser?.uid;
    if (currentUser){
    //let payload = stringifyWrapperTable(table);
    let payload = JSON.stringify(table.querySelector("tbody").innerHTML);
    writeUserData(currentUser,tableName,payload).then(response => {
        alert("Daten gespeichert")
    }).catch(err => alert("Fehler beim speichern der Daten:", err))
    }
}

export function loadTableByName(tableName, table){
    let currentUser = firebase.auth()?.currentUser?.uid;
    if (currentUser) {
        getUserData(currentUser, tableName).then(response => {
            let tbody = table.querySelector("tbody");
            tbody.innerHTML = JSON.parse(response.payload);

            const triggerEles = Array.from(tbody.querySelectorAll("BUTTON"))?.filter(btn => btn?.getAttribute("data-bs-toggle") === "popover");
            triggerEles.forEach(popoverInstance => addPopoverTriggerEl(popoverInstance));

        }).catch(error => {
            console.error("Fehler beim Abrufen der Daten:", error);
        });
    }
}


function stringifyWrapperTable(table) {
    let trData = table.querySelectorAll("tbody tr");
    let tdData = [];

    trData.forEach((trElement, trIndex) => {
        trElement.querySelectorAll("td").forEach((tdElement, tdIndex) => {

            tdData[trIndex] = tdData[trIndex] || [];

            if (tdElement.getAttribute("data-value-db")){
                tdData[trIndex].push({valueDb: tdElement.dataset.valueDb, index: tdIndex});
            }
            if (tdElement.textContent){
                tdData[trIndex].push({textContent: tdElement.textContent, index: tdIndex});
            }

            let infoBtn = tdElement.querySelector("button")?.getAttribute("data-bs-content");
            if (infoBtn?.trim()){
                tdData[trIndex].push({bsContent: infoBtn});
            }
        });
    });

    return JSON.stringify(tdData);
}

function parseWrapperTable(table){

}

