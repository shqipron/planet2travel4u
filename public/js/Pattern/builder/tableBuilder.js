import {SealedTableList, DraggableTableList, ExtendableTableList} from "../../table/tableList.js"

export { TableListBuilder }

class TableListBuilder {

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







// // function typeGuardList(table)





