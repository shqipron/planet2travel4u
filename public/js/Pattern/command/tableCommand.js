import {CreateButtonFactory} from "../factory/button.js";


class CommandBase {
    constructor(eventTarget) {
        this.eventTarget = eventTarget;
    }
    execute() {
    }

}

//TODO: Ändern der Liste damit man events wieder löschen kann (named funktion usw)
const eventList = [];
window.popoverTriggerList = [];
const buttonFactory = new CreateButtonFactory();

//TODO: Refactor zu spezifischem Delete für Body, Tr usw.
class DeleteTableTagCommand extends CommandBase {
    constructor(eventTarget) {
        super(eventTarget);
    }

    execute(tableContainer,btn) {

        const newBtnDataAttr = setEleListenerAttribute(btn,this.eventTarget);
        const table = document.getElementById(tableContainer.container);

        if (eventList.indexOf(newBtnDataAttr) === -1){
        table.addEventListener("click", (event) => {
            if (event.target.dataset.action === newBtnDataAttr) {
                const target = event.target.closest(this.eventTarget) || table.querySelector(this.eventTarget);
                if (target){
                target.parentNode.removeChild(target);
                }
            }
        });
        eventList.push(newBtnDataAttr);
        }
    }
}

class DeleteTBodyCommand extends CommandBase {
    constructor() {
        super("tbody");
    }

    execute(tableContainer,btn) {

        const newBtnDataAttr = setEleListenerAttribute(btn,this.eventTarget);
        const table = document.getElementById(tableContainer.container);

        if (eventList.indexOf(newBtnDataAttr) === -1){
            table.addEventListener("click", (event) => {
                if (event.target.dataset.action === newBtnDataAttr) {
                    const target = event.target.closest("tbody") || table.querySelector("tbody");
                    if (target){
                        target.innerHTML = "";
                    }
                }
            });
            eventList.push(newBtnDataAttr);
        }
    }
}

//TODO: tbody zu generisch, wegen anderen funktionen
class AddTableRowCommand extends CommandBase {
    constructor() {
        super("tbody tr");
        this.rowCopied = null;
    }
    execute(tableContainer,btn) {

        const newBtnDataAttr = setEleListenerAttribute(btn, this.eventTarget);
        const table = document.getElementById(tableContainer.container);

        if (eventList.indexOf(newBtnDataAttr) === -1){
            this.#setCopiedRow(table);
        table.addEventListener("click", (event) => {
            if (event.target.dataset.action === newBtnDataAttr) {

                let tblBody = table.querySelector("tbody");
                const clonedRow = this.rowCopied.cloneNode(true);

                if (!tblBody?.children) {
                    const tbody = document.createElement("tbody");
                    table.lastChild.appendChild(tbody);
                    tbody.appendChild(clonedRow);
                    enableDragAndDrop(clonedRow, tbody);
                } else {
                    tblBody.appendChild(clonedRow);
                    enableDragAndDrop(clonedRow, tblBody);
                }
                    const triggerEles = Array.from(clonedRow.querySelectorAll("BUTTON"))?.filter(btn => btn?.getAttribute("data-bs-toggle") === "popover");
                    triggerEles.forEach(popoverInstance => addPopoverTriggerEl(popoverInstance));


            }
        });
        eventList.push(newBtnDataAttr);
        }
    };

    #setCopiedRow(table) {
        let tblBody = table?.querySelector("tbody");
        if (tblBody && tblBody.children.length > 0) {
            const row = tblBody.firstElementChild.cloneNode(true);
            const tdEle = row.getElementsByTagName("td");
            const cButton = row.getElementsByTagName("BUTTON")?.length || 0;

            for (let i = 0; i < tdEle.length - cButton; i++) {
                if (tdEle.firstChild){
                    tdEle[i].textContent = " ";
                }
            }

            const triggerEles = Array.from(row.querySelectorAll("BUTTON"))?.filter(btn => btn?.getAttribute("data-bs-toggle") === "popover");
            triggerEles.forEach(popoverInstance => addPopoverTriggerEl(popoverInstance));

            enableDragAndDrop(row, tblBody);

            this.rowCopied = row;
        }
    }

}

class AddTableInfo extends CommandBase {
    constructor(eventTarget = "") {
        super(eventTarget);
    }

    execute(tableContainer, btn) {

        const newBtnDataAttr = setEleListenerAttribute(btn, this.eventTarget);
        const table = document.getElementById(tableContainer.container);

        addPopoverTriggerEl(btn.ele);
        if (eventList.indexOf(newBtnDataAttr) === -1) {
        table.addEventListener("click", (event) => {
            if (event.target.dataset.action !== newBtnDataAttr) {
                window.popoverTriggerList.forEach(popInstance => popInstance.hide());
            }
        });
            eventList.push(newBtnDataAttr);
        }
    }


}

class EnableDragAndDrop extends CommandBase {
    constructor(eventTarget = "") {
        super(eventTarget);
    }

    execute(tableContainer) {
        const rows = document.querySelectorAll(`#${tableContainer.container} table tbody tr`);
        enableDragAndDrop(rows, document.querySelector(`#${tableContainer.container} table tbody`));
    }
}

function enableDragAndDrop(rows, tbody) {
    if (rows instanceof NodeList || rows instanceof HTMLCollection || Array.isArray(rows)) {
        rows.forEach(row => {
            enableDragAndDropForSingleRow(row);
        });
    } else {
        enableDragAndDropForSingleRow(rows);
    }

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    tbody.addEventListener("dragover", throttle((e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(tbody, e.clientY);
        const draggingElement = document.querySelector(".dragging");

        if (afterElement == null) {
            tbody.appendChild(draggingElement);
        } else {
            tbody.insertBefore(draggingElement, afterElement);
        }

    }, 250));

    function enableDragAndDropForSingleRow(row) {
        row.draggable = true;

        row.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", "");
            row.classList.add("dragging", "bg-primary");

            e.dataTransfer.effectAllowed = "none";
            e.dataTransfer.dropEffect = "none";
        });

        row.addEventListener("dragend", () => {
            row.classList.remove("dragging", "bg-primary");
        });
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll("tr:not(.dragging)")];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
}



 function addPopoverTriggerEl(popoverTriggerEl) {
    var popoverInstance = new bootstrap.Popover(popoverTriggerEl);

    popoverTriggerEl.addEventListener("click", function test(event) {
        setTimeout(() => {
            const body = document.querySelector(".popover-body");
            const bAttr = body.getAttribute("data-action");

            if (bAttr?.includes("active")) {
                popoverInstance.hide();
            } else {
                body.setAttribute("contenteditable", "");
                let button = buttonFactory.createButton("save");

                body.parentNode.appendChild(button.ele);
                body.style.setProperty("width","100px");

                button.ele.addEventListener("click", function () {
                    const bodyTxtContent = body.firstChild?.textContent ||  " ";

                    const dataContentButton = event.target.closest("button")
                    dataContentButton.setAttribute("data-bs-content", bodyTxtContent);

                    dataContentButton.classList.toggle("btn-success", bodyTxtContent?.trim().length > 0);
                    dataContentButton.classList.toggle("btn-secondary", !(bodyTxtContent?.trim().length > 0));


                    let index = window.popoverTriggerList.indexOf(popoverInstance);
                    popoverInstance.hide();
                    popoverInstance = new bootstrap.Popover(popoverTriggerEl);
                    popoverTriggerList[index] = popoverInstance;
                });
                body.setAttribute("data-action", "active");
            }
            popoverInstance.update();
        }, 0);
    });

    window.popoverTriggerList.push(popoverInstance)
}

class CRUDCommand extends CommandBase {
    constructor(eventTarget = "", callback) {
        super(eventTarget);
        this.callback = callback;
    }

    execute(tableContainer, btn) {

        const newBtnDataAttr = setEleListenerAttribute(btn, this.eventTarget);
        const table = document.getElementById(tableContainer.container);

        if (eventList.indexOf(newBtnDataAttr) === -1) {
            table.addEventListener("click", (e) => {
                if (e.target.dataset.action === newBtnDataAttr) {
                    this.callback(this.eventTarget,table);
                }
            })
            eventList.push(newBtnDataAttr);
        }
    }


}


function setEleListenerAttribute(btn,eventTarget){
    const newBtnDataAttr = btn.type + " " + eventTarget;
    btn.ele.setAttribute("data-action", newBtnDataAttr);
    btn.ele.querySelector("i")?.setAttribute("data-action", newBtnDataAttr);
    return eventList.indexOf(newBtnDataAttr) === -1 ? newBtnDataAttr : ""
}


export {DeleteTableTagCommand, AddTableRowCommand, AddTableInfo, EnableDragAndDrop, CommandBase, CRUDCommand, DeleteTBodyCommand, addPopoverTriggerEl}