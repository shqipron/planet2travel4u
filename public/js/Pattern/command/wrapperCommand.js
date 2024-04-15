import {CommandBase} from "./tableCommand.js";

const eventList = [];

class HolidayDecoratorCommand extends CommandBase {
    constructor(eventTarget) {
        super(eventTarget);
        this.dataAction = `holiday ${eventTarget}`
    }

    execute(tableContainer) {

        const table = document.getElementById(tableContainer.container);

        if (eventList.indexOf(this.dataAction) === -1) {
            this.#setTDElements(table);

            table.addEventListener("click", (e) => {
                if (e.target.getAttribute("data-action") === this.dataAction) {
                    let td = e.target;
                    let tdDataVal = Number(td.getAttribute("data-value-db"));

                    if (tdDataVal >= 0) {
                        tdDataVal++;
                        switch (tdDataVal) {
                            case 1:
                                td.style.background = "green";
                                break;
                            case 2:
                                td.style.background = "yellow";
                                break;
                            case 3:
                                td.style.background = "red";
                                break;
                            default:
                                td.style.background = "white";
                                tdDataVal = 0;
                                break;
                        }
                        td.setAttribute("data-value-db", tdDataVal)
                    }
                }
            })

            table.addEventListener("contextmenu", (e) => {
                if (e.target.getAttribute("data-action") === this.dataAction) {
                    e.target.textContent = e.target.textContent !== "X" ? "X" : "";
                }
                e.preventDefault();
            })
            eventList.push(this.dataAction);
        }
    }

    #setTDElements(table) {
        table.querySelectorAll("tbody tr").forEach((trElement) => {
            if (trElement.children.length > 0) {
                trElement.querySelectorAll("td").forEach((tdElement, columnIndex) => {
                    if (columnIndex > 0){
                    if (tdElement.tagName === "TD" && tdElement.querySelector("button") === null) {
                        tdElement.style.setProperty("width", "25px");
                        tdElement.style.setProperty("min-width", "25px");
                        tdElement.style.setProperty("height", "30px");

                        tdElement.setAttribute("data-value-db", "0");
                        tdElement.setAttribute("data-action", this.dataAction);
                        tdElement.textContent = tdElement.textContent !== "X" ? "" : "X";
                        tdElement.removeAttribute("contenteditable");
                        tdElement.style.textAlign = "center";
                    }
                    }else{
                        tdElement.style.setProperty("width","100%");
                    }
                });
            }
        });
    }

}


class createTdInputEleCommand extends CommandBase
{
    constructor(eventTarget) {
        super(eventTarget);
        this.dataAction = "";
    }

    execute(tableContainer, td, type, tableListener) {

        this.dataAction = this.eventTarget + " " + type;
        const element = document.createElement("input");
        element.type = type;

        td.appendChild(element);
        element.setAttribute("data-action",this.dataAction);


        if (eventList.indexOf(this.dataAction) === -1) {
        const table = document.getElementById(tableContainer.container);
            table.addEventListener("click", tableListener);
            eventList.push(this.dataAction);
        }
    }
}




export {HolidayDecoratorCommand, createTdInputEleCommand}