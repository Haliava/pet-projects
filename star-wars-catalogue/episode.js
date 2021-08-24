function addParameterToTable(jsonData, paramName) {
    return Promise.all(jsonData[paramName].map(paramLink => fetch(paramLink).then(res => res.json())))
        .then(paramData => {
            let tr = document.createElement("tr");
            let th = document.createElement("th");
            let paramTextData = document.createElement("td");
            let text = "";
            th.scope = "row";
            th.textContent = paramName.toUpperCase();
            tr.append(th);

            paramData.forEach(param => {
                paramTextData = document.createElement("td");
                text += param.name + ",<br>";
            });

            paramTextData.innerHTML = text;
            tr.append(paramTextData);
            return tr;
        });
}

async function renderEpisodeDetailsPage(episodeNum) {
    let serviceFunc = await import("./service-functions.js");
    let data = await serviceFunc.getDataJson(episodeNum);

    let container = document.getElementById("container");
    container.classList.add("container", "flex-column", "text-center", "justify-content-between", "flex-wrap", "py-4");
    let title = document.createElement("h1");
    let menuButton = document.createElement("button");
    let introParagraph = document.createElement("p");

    title.classList.add("h1");
    title.innerHTML = data.title + "<br>" + "Порядковый номер: " + data.episode_id;
    menuButton.classList.add("btn", "btn-info", "mb-5");
    menuButton.textContent = "Back to episodes";
    menuButton.addEventListener("click", async () => {
        container.innerHTML = "";
        container.className = "";
        history.back();
    });
    menuButton.disabled = true;

    introParagraph.classList.add("p");
    introParagraph.innerHTML = data.opening_crawl.toString().replaceAll("\n", "<br>");

    container.append(title);
    container.append(menuButton);
    container.append(introParagraph);

    let tableDiv = document.createElement("div");
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    tableDiv.classList.add("table-responsive");
    table.classList.add("table", "table-striped", "align-middle");
    ["Criteria", "Value"].forEach(val => {
        let th = document.createElement("th");
        th.scope = "col";
        th.textContent = val;

        tr.append(th);
    });
    thead.append(tr);
    table.append(thead);

    let tableBody = document.createElement("tbody");
    tableDiv.classList.add("table-body");

    let promises = [];
    for (const paramArr of Object.entries(data)) {
        if (typeof paramArr[1] === "object")
            promises.push(addParameterToTable(data, paramArr[0])); // чтобы все запросы отправились сразу
    }
    for (let promise of promises)
        tableBody.append(await promise);
    table.append(tableBody);
    tableDiv.append(table);

    container.append(tableDiv);
    menuButton.disabled = false;
}

export {renderEpisodeDetailsPage};
