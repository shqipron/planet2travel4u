import { CreateButtonFactory } from "../Pattern/factory/button.js";
import {DeleteTableTagCommand, EnableDragAndDrop} from "../Pattern/command/tableCommand.js";
export { BaseTableListBuilder }

class BaseTableListBuilder {
    constructor() {
        this.type = "";
        this.container = "";
        this.columnNames = [""];
        this.rows = [[]];
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setContainer(container = "") {
        this.container = container;
        return this;
    }

    setColumnNames(columnNames = [""]) {
        this.columnNames = columnNames;
        return this;
    }

    setRows(rows = [[]]) {
        this.rows = rows;
        return this;
    }

    build() {
        if (this.type === "sealed") {
            return new SealedTableList(this, false);
        } else if (this.type === "extendable") {
            return new ExtendableTableList(this, true);
        } else if (this.type === "draggable") {
            return new DraggableTableList(this,false);
        } else {
            throw new Error("Ungültiger Listentyp angegeben: " + this.type);
        }
    }
}

class BaseTableList {
    constructor(builder, isEdit) {
        this.type = builder.type;
        this.container = builder.container;
        this.columnNames = builder.columnNames;
        this.rows = builder.rows;
        this.buttonFactory = new CreateButtonFactory();
        this.cTableRows = this.rows.length;
        this.cTableColumns = this.columnNames.length;
        this.hasHeader = this.columnNames.length > 0;
        this.isEdit = isEdit;
        this.renderTableList();
    }

    renderTableList() {
        const container = document.getElementById(this.container);
        const table = document.createElement('table');

        const tbody = this.#setBody();
        const tfoot = document.createElement('tfoot');
        const thead = this.#setHeader();

        table.classList.add("table", "table-bordered", "table-sm", "border-dark");
        table.style.marginBottom = '5rem';

        table.appendChild(thead);
        table.appendChild(tbody);
        table.appendChild(tfoot);
        container.appendChild(table);
    }

    #setHeader(){
        const thead = document.createElement('thead');
        const headerRow = thead.insertRow();

        for (let i = 0; i < this.cTableColumns; i++) {
            const th = document.createElement('th');
            th.textContent = this.columnNames[i];
            th.style.textAlign = "center";
            th.style.borderBottomWidth = '2px';
            headerRow.appendChild(th);
        }
        return thead;
    }

    #setBody(){
        const tbody = document.createElement('tbody');
        for (let trIndex = 0; trIndex < this.cTableRows; trIndex++) {
            let row = tbody.insertRow();
            for (let colIndex = 0; colIndex < this.cTableColumns; colIndex++) {
                const cell = row.insertCell();
                cell.setAttribute("contenteditable","");
                cell.textContent = this.rows[trIndex][colIndex];

                //TODO: check if button object, then render accordingly with factory
            }
        }
        return tbody;
    }

    execute(command, btn) {
        command.execute(this, btn);
    }

    //TODO: aufteilen der Funktion: addRow, generate Header usw.
}

class SealedTableList extends BaseTableList {
    constructor(builder) {
        super(builder, false);
    }
}

//TODO: command hinzufügen
class DraggableTableList extends BaseTableList {
    constructor(builder) {
        super(builder, true);
        new EnableDragAndDrop().execute(this);
    }
}

class ExtendableTableList extends DraggableTableList {
    constructor(builder) {
        super(builder, true);
    }

    addTableButton(options) {
        const {bType, command, position, single, id } = options;

        const container = document.getElementById(this.container);
        const tbody = container?.querySelector("table tbody");
        let button = this.buttonFactory.createButton(bType);


        //TODO: Enum mit top/ bottom
        //TODO: gnerell überarbeiten der if abfrage...
        if (position === "bottom"){
            const tfoot = container?.querySelector("table tfoot");
            const row = tfoot.insertRow();

            command?.execute(this,button)
            row.appendChild(button.ele);
            button.ele.id = options?.id;
            return button.ele;
        }

        for (let i = 0; i < this.cTableRows; i++) {

            const button = this.buttonFactory.createButton(bType);
            command.execute(this,button);

            if (single){
                const cell = tbody.parentNode.querySelector("thead").rows[0].insertCell();
                cell.appendChild(button.ele);
                button.ele.id = options?.id;
                return button.ele
            }

            const cell = tbody.rows[i].insertCell();
            cell.appendChild(button.ele);
        }

    }
}






// // function typeGuardList(table)





