function initSpinner() {
    let spinnerDiv = document.createElement("div");
    let spinner = document.createElement("div");
    let spinnerSpan = document.createElement("span");

    spinnerDiv.classList.add("justify-content-center");
    spinnerDiv.id = "spinner";
    spinner.classList.add("spinner-border");
    spinner.role = "status";
    spinnerSpan.classList.add("sr-only");

    spinner.append(spinnerSpan);
    spinnerDiv.append(spinner);
    return spinnerDiv;
}

function createCard(product) {
    let divCard = document.createElement("div");
    let prodImg = document.createElement("img");
    let divBody = document.createElement("div");
    let prodTitle = document.createElement("h5");
    let p = document.createElement("p");

    divCard.classList.add("card", "shadow-sm");
    divCard.style = "width: 18%;";

    prodImg.classList.add("card-img-top");
    prodImg.src = product.image;

    divBody.classList.add("card-body");

    prodTitle.classList.add("card-title");
    prodTitle.textContent = product.name;

    p.classList.add("card-text");
    p.textContent = product.price;

    [prodTitle, p].forEach(elem => divBody.append(elem));
    [prodImg, divBody].forEach(elem => divCard.append(elem));

    return divCard;
}

function createInfoBlock(text) {
    let infoBlock = document.createElement("div");
    infoBlock.classList.add("alert", "alert-danger");
    infoBlock.textContent = text;

    return infoBlock;
}

export {initSpinner, createCard, createInfoBlock};