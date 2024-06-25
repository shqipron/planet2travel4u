export {CreateButtonFactory}

//TODO: Formattierung hinzufügen, icon
class ButtonBase {
    constructor(type) {
        this.type = type;
        this.ele = document.createElement("button");
        this.ele.setAttribute("data-action", type);
        this.ele.classList.add("btn","btn-secondary");
        this.ele.style.setProperty("max-width","25px");
        this.ele.style.setProperty("max-height","25px");
        this.ele.style.display = "flex";
        this.ele.style.justifyContent = "center";
        this.ele.style.alignItems = "center";
    }

    addIcon(btn, classList){
        const icon = document.createElement("i");
        icon.className = classList;
        btn.appendChild(icon);
    }

}

class DeleteButton extends ButtonBase {
    constructor(type) {
        super(type);
        this.addIcon(this.ele, "fa-regular fa-trash-can");

    }
}

class AddButton extends ButtonBase {
    constructor(type) {
        super(type);
        this.addIcon(this.ele,"fa-solid fa-plus")
    }
}

class SaveButton extends ButtonBase {
    constructor(type) {
        super(type);
        this.addIcon(this.ele, "fas fa-save")
    }
}

class LoadButton extends ButtonBase {
    constructor(type) {
        super(type);
        this.addIcon(this.ele, "fa-solid fa-folder-plus")
    }
}


class InfoButton extends ButtonBase {
    constructor(type) {
        super(type);

        this.ele.setAttribute("data-bs-toggle", "popover");
        this.ele.setAttribute("data-bs-container", "body");
        this.ele.setAttribute("data-bs-placement", "bottom");
        this.ele.setAttribute("data-bs-content", " ");

        this.addIcon(this.ele, "fa-solid fa-circle-info")
    }
}


class CreateButtonFactory {
    createButton(type) {
        if (type === "info") {
            return new InfoButton(type);
        } else if (type === "delete") {
            return new DeleteButton(type);
        } else if (type === "add") {
            return new AddButton(type);
        } else if (type === "save") {
            return new SaveButton(type);
        }else if (type === "load") {
            return new LoadButton(type);
}else {
            throw new Error("Ungültiger Buttontyp angegeben: " + type);
        }
    }

}




