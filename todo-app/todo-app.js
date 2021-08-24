import {getAllItems, actions} from "./api.js";

async function createTodoApp(container, title = "список дел", defaultTasks = [], localKey) {
    let currentState = parseInt((await import("./storage-toggle.js")).currentStorageState);
    if (currentState && (await getAllItems(localKey)).length <= 0)
        await (await import("./api.js")).addDefaultItemsToServer(defaultTasks);

    let todoStoredItems = currentState ? await getAllItems(localKey) : localStorage.getItem(localKey);
    let todoAppTitle = (await import("./view.js")).createAppTitle(title);
    let todoItemForm = (await import("./view.js")).createTodoItemForm();
    let todoList = (await import("./view.js")).createTodoList();

    if (!currentState)
        todoStoredItems = todoStoredItems ? JSON.parse(todoStoredItems) : defaultTasks;
    const lastItem = todoStoredItems[todoStoredItems.length - 1];
    let latestId = lastItem ? lastItem.id : 1;
    if (!Array.isArray(todoStoredItems)) todoStoredItems = [todoStoredItems]; // если todoStoredItems является объектом, а не массивом

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);
    todoItemForm.button.disabled = true;

    for (let storedItem of todoStoredItems)
        if (storedItem !== null) await createItem(storedItem.name, storedItem.done, storedItem.id);

    todoItemForm.form.addEventListener("submit", e => {
        e.preventDefault();
        actions.onSubmit(todoItemForm, createItem);
    });

    todoItemForm.input.addEventListener("input", () => {
        todoItemForm.button.disabled = !todoItemForm.input.value;
    });

    async function createItem(name, isDone = false, id = 0) {
        let item = (await import("./view.js")).createTodoItem(name);

        let flag = id > 0; // если элемент уже был в todoStoredItems, значит его создание не должно вилиять на id
        item.item.id = flag ? id.toString() : (++latestId).toString();

        if (isDone) item.item.classList.add("list-group-item-success");

        item.doneButton.addEventListener("click", async () => {
            item.item.classList.toggle("list-group-item-success");
            await actions[currentState].onStateChange(item, todoStoredItems, localKey);
        });

        item.deleteButton.addEventListener("click", async () => {
            if (confirm("Вы уверены?")) {
                await actions[currentState].onDelete(item, todoStoredItems, localKey);
                item.item.remove();
            }
        });

        if (flag) { // если есть id
            todoList.append(item.item);
            return;
        } else if (!flag && !currentState) todoStoredItems.push({
            "id": latestId.toString(),
            "name": name,
            "owner": localKey,
            "done": isDone
        });

        if (currentState) { // если нет id
            await (await import("./api.js")).addItemToServer({name: name, owner: localKey, done: isDone});
            let tmp = await getAllItems(localKey);
            item.item.id = tmp[tmp.length - 1].id;
        } else localStorage.setItem(localKey, JSON.stringify(todoStoredItems));
        todoList.append(item.item);
    }
}

export {createTodoApp};