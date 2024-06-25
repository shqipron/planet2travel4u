import {HolidayDecoratorCommand, createTdInputEleCommand} from "../Pattern/command/wrapperCommand.js";

class BasicTableWrapper {
    constructor(tableContainer) {
        this.tableContainer = tableContainer;
        this.wrapperName = "";
    }

    render() {}
}

class HolidayTimesWrapper extends BasicTableWrapper {
    constructor(table) {
        super(table);
        this.wrapperName = "holidaytimes"
    }

    //TODO: Überarbeiten - Callback um targetabfrage wiederzuverwenden
    //TODO: Command um Zeile zu Kategorie umzuwandeln
    render() {
        const command = new HolidayDecoratorCommand("td");
        command.execute(this.tableContainer);
    }

}

class SuitcaseWrapper extends BasicTableWrapper {

    constructor(table) {
        super(table);
        this.wrapperName = "suitcase"
    }

    render(){
        const table = document.getElementById(this.tableContainer.container);

        table.querySelectorAll("tbody tr").forEach((trElement) => {
            if (trElement.children.length > 0) {

                trElement.children[0].style.setProperty("width","100%");

                let tdInputEleChkBox = new createTdInputEleCommand("td");
                let tdElementChkBox = trElement.children[2];
                tdElementChkBox.removeAttribute("contenteditable");


                tdInputEleChkBox.execute(this.tableContainer,tdElementChkBox,"checkbox", function (e)  {

                    if (e.target.getAttribute("data-action") === tdInputEleChkBox.dataAction) {
                            let td = e.target.closest("td");
                            td.setAttribute("data-value-db",e.target.checked);
                            e.target.toggleAttribute("checked");
                    }
                })

                tdElementChkBox.style.textAlign = "center";

                tdElementChkBox.children[0].style.height = "25px";
                tdElementChkBox.children[0].style.width = "25px";

                let tdInputEleNumber = new createTdInputEleCommand("td");
                let tdElementNumber = trElement.children[1];
                tdElementNumber.removeAttribute("contenteditable")

                tdInputEleNumber.execute(this.tableContainer,tdElementNumber,"number", function (e)  {
                    if (e.target.getAttribute("data-action") === tdInputEleNumber.dataAction) {
                            let td = e.target.closest("td");
                            td.setAttribute("data-value-db",e.target.value);
                            e.target.setAttribute("value", e.target.value)
                    }
                })

                tdElementNumber.style.setProperty("max-width","100px");
                tdElementNumber.style.setProperty("padding-right","105px");

                tdElementNumber.children[0].style.maxWidth = "inherit";
            }
        });
    }

}



export { HolidayTimesWrapper, SuitcaseWrapper }
