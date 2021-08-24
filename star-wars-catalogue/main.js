async function renderPage() {
    let serviceFunc = await import("./service-functions.js");

    let number = 1;
    let container = document.getElementById("container");
    container.classList.add("container", "d-flex", "justify-content-between", "flex-wrap", "py-4");
    for (let episodeData of (await serviceFunc.getDataJson()).results) {
        let cardContainer = document.createElement("div");
        let cardBody = document.createElement("div");
        let title = document.createElement("h5");
        let episodeNumLink = document.createElement("a");

        cardContainer.style.width = "15%";
        cardContainer.classList.add("card", "my-2");
        cardBody.classList.add("card-body");
        title.classList.add("card-title");
        title.textContent = serviceFunc.toRomanNumerals(number++) + ": " + episodeData.title;
        episodeNumLink.classList.add("btn", "btn-primary", "stretched-link");
        episodeNumLink.href = serviceFunc.setNewUrl(`episode-details.html?episodeNum=${episodeData.episode_id}`);
        episodeNumLink.textContent = "Подробнее";
        episodeNumLink.addEventListener("click", (e) => {
            container.innerHTML = "";
            e.preventDefault();
            history.pushState(null, "", episodeNumLink.href);

            import("./episode.js").then(exportedFuncs => exportedFuncs.renderEpisodeDetailsPage(serviceFunc.getEpisodeNum()));
        });


        [title, episodeNumLink].forEach(elem => cardBody.append(elem))
        cardContainer.append(cardBody);
        container.append(cardContainer);
    }
}

window.addEventListener("popstate", async () => {
    console.log(1321);
    await renderPage();
});

export {renderPage};

