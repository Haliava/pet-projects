(() => {
    const INPUT_FIELDS_IDS = ["surname", "name", "middle-name"];

    function validate(testedString) {
        return /[\u0400-\u04FF \-]/.test(testedString);
    }

    document.addEventListener("keypress", event => {
        event.preventDefault();
        if (validate(event.key)) event.target.value += event.key;
    });

    INPUT_FIELDS_IDS.forEach(item => {
        let itemElem =  document.getElementById(item);
        itemElem.addEventListener("blur", () => {
            itemElem.value = [...itemElem.value].filter(char => validate(char)).join("").trim()
                .replaceAll(/ {2,}/g, " ").replaceAll(/-{2,}/g, "-").replaceAll(/[^\u0400-\u04FF ]/g, "");
        });
    });

    document.getElementById("submit-button").addEventListener("click", event => {
        event.preventDefault();

        let inputs = [];
        for (let fieldName of INPUT_FIELDS_IDS) {
            let inputElem = document.getElementById(fieldName);
            if (!inputElem.value) return;
            inputs.push(inputElem);
        }

        let container = document.getElementById("container");
        let p = document.createElement("p");
        p.classList.add("h3");
        for (let elem of inputs) {
            p.textContent += elem.value + " ";
            elem.value = "";
        }

        container.append(p);
    });
})();