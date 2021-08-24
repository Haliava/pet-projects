import {getPageContent} from "./api.js";

export async function initBlog() {
    let errors = [];
    window.addEventListener("offline", () => errors.push("noConnection"));

    let errorMessages = {
        "500": "Произошла ошибка, попробуйте обновить страницу позже",
        "404": "Список товаров пуст",
        "wrongJson": "Произошла ошибка, попробуйте обновить страницу позже",
        "noConnection": "Произошла ошибка, проверьте подключение к интернету",
    }
    let container = document.getElementById("posts-container");
    let notifContainer = document.getElementById("notif-container");
    container.append((await import("./view.js")).initSpinner());
    let counter = 0;
    let answer = await getPageContent();
    answer[1].forEach(elem => errors.push(elem));
    while (errors.includes("500") && counter++ < 2) {
        errors = [];
        answer = await getPageContent();
        answer[1].forEach(elem => errors.push(elem));
    }
    document.getElementById("spinner").style.display = "none";

    for (let product of answer[0].products) {
        container.append((await import("./view.js")).createCard(product));
    }

    for (let error of errors) {
        let errorText = errorMessages[error];
        if (error === "404") {
            document.getElementById("title").textContent = errorText;
            continue;
        }
        notifContainer.append((await import("./view.js")).createInfoBlock(errorText));
    }
    setTimeout(removeErrorNotif, 3000);

    function removeErrorNotif() {
        notifContainer.style.display = "none";
    }
}

