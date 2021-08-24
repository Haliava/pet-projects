import {currentStorageState, toggleState} from "./storage-toggle.js";

function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
}

function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    buttonWrapper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Добавить дело";

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    let buttonCont = document.getElementById("button-container");
    let toggleButton = document.createElement("button");
    toggleButton.classList.add("btn", "btn-info", "mt-5");
    toggleButton.textContent = parseInt(currentStorageState) ? "Перейти на локальное хранилище" : "Перейти на серверное хранилище";
    toggleButton.addEventListener("click", () => {
        toggleState();
        location.reload();
    });

    buttonCont.append(toggleButton);

    return {form, input, button};
}

function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
}

function createTodoItem(name) {
    let item = document.createElement("li");
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    item.textContent = name;

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "удалить";

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {item, doneButton, deleteButton};
}

export {createTodoItem, createTodoItemForm, createTodoList, createAppTitle};