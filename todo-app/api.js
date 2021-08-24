async function deleteItem(item) {
    await fetch(`http://localhost:3000/api/todos/${item.item.id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    })
}

async function setItemDone(item) {
    await fetch(`http://localhost:3000/api/todos/${item.item.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            done: item.item.classList.contains("list-group-item-success")
        })
    })
}

async function getAllItems(owner) {
    return (await (await fetch(`http://localhost:3000/api/todos?owner=${owner}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })).json());
}

async function addDefaultItemsToServer(defaultTasks) {
     for (let task of defaultTasks) {
        await fetch("http://localhost:3000/api/todos", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: task.name,
                owner: task.owner,
                done: task.done
            })
        });
    }
}

async function addItemToServer({name, owner, done}) {
    await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: name,
            owner: owner,
            done: done
        })
    })
}

const actions = {
    1: {
        async onStateChange(item, ...restArgs) {
            await setItemDone(item);
        },

        async onDelete(item, ...restArgs) {
            await deleteItem(item);
        }
    },
    0: {
        async onStateChange(item, itemList, ownerKey) {
            for (let i = 0; i < itemList.length; i++)
                if (itemList[i].id === item.item.id) {
                    itemList[i].done = item.item.classList.contains("list-group-item-success");
                    localStorage.setItem(ownerKey, JSON.stringify(itemList));
                    break;
                }
        },

        async onDelete(item, itemList, ownerKey) {
            for (let i = 0; i < itemList.length; i++)
                if (itemList[i].id === item.item.id) {
                    itemList.splice(i, 1);
                    localStorage.setItem(ownerKey, JSON.stringify(itemList));
                    break;
                }
        }
    },
    onSubmit(inputForm, createItem) {
        if (!inputForm.input.value) return;

        createItem(inputForm.input.value);
        inputForm.input.value = "";
        inputForm.button.disabled = true;
    }
}

export {deleteItem, setItemDone, getAllItems, addItemToServer, addDefaultItemsToServer, actions}