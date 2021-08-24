(() => {
    let formContainer = document.getElementById("form");

    let formElement = document.createElement("form");
    formElement.classList.add("form-group");

    let rowInput = document.createElement("input");
    rowInput.id = "rows";
    rowInput.type = "text";
    rowInput.placeholder = "кол-во строк";
    rowInput.classList.add("form-control");

    let colInput = document.createElement("input");
    colInput.id = "cols";
    colInput.type = "text";
    colInput.placeholder = "кол-во столбцов";
    colInput.classList.add("form-control");

    let subButton = document.createElement("button");
    subButton.id = "sub";
    subButton.type = "button";
    subButton.classList.add("btn", "btn-primary");
    subButton.textContent = "начать игру";

    let restartButton = document.createElement("button");
    restartButton.type = "button";
    restartButton.textContent = "Сыграть ещё раз";
    restartButton.classList.add("btn", "btn-info");
    restartButton.hidden = true;

    formElement.append(rowInput);
    formElement.append(colInput);
    formElement.append(subButton);
    formContainer.append(formElement);

    subButton.addEventListener("click", () => {
        rowInput.hidden = true;
        colInput.hidden = true;
        subButton.hidden = true;
        gameCycle(rowInput.value, colInput.value);
    });


    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function initializeNumArr(rows, cols) {
        let resArr = [];
        for (let i = 1; i < (rows * cols) / 2 + 1; i++) {
            resArr.push(i);
            resArr.push(i);
        }

        return resArr;
    }

    function convertToTwoDimensions(arr, rows, cols) {
        let resArr = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++)
                row.push(arr[cols * i + j]);
            resArr.push(row);
        }

        return resArr;
    }

    function gameCycle(rows, cols, numArr = []) {
        if (rows % 2 !== 0 || rows < 2 || rows > 10) rows = 4;
        if (cols % 2 !== 0 || cols < 2 || cols > 10) cols = 4;
        if (numArr.length <= 0) numArr = initializeNumArr(rows, cols);
        let btnValueMap = new Map();
        let activeButtons = [];
        let solvedButtons = [];
        let isSolved = false;
        shuffle(numArr);
        let numArrCopy = convertToTwoDimensions(numArr, rows, cols);

        let timer = document.getElementById("timer");
        timer.textContent = "60";
        let tick = setInterval(() => {
            timer.textContent--;
            if (timer.textContent === "0") restart();
        }, 1000);

        let container = document.getElementById("main-cont");
        for (let child of container.children) child.remove();
        for (let br of document.getElementsByTagName("br")) br.remove();
        for (let i = 0; i < rows; i++) {
            let groupContainer = document.createElement("div");
            groupContainer.classList.add("btn-group");
            for (let j = 0; j < cols; j++) {
                let button = document.createElement("button");
                button.classList.add("btn", "btn-secondary");
                button.type = "button";
                button.textContent = "$";
                btnValueMap.set(button, numArrCopy[i][j]);

                button.addEventListener("click", () => {
                    button.textContent = btnValueMap.get(button);
                    if (activeButtons[0] === button) return;
                    if (activeButtons.length === 1) {
                        isSolved = btnValueMap.get(activeButtons[0]) === btnValueMap.get(button)
                        activeButtons.push(button);
                        if (isSolved) {
                            for (let elem of activeButtons) {
                                solvedButtons.push(elem);
                                elem.disabled = true;
                            }
                            if (solvedButtons.length === btnValueMap.size) restart();
                        }
                    } else {
                        if (activeButtons.length === 2)
                            for (let elem of activeButtons)
                                if (!solvedButtons.includes(elem)) elem.textContent = "$";
                        activeButtons = [button];
                    }
                });

                groupContainer.append(button);
            }
            container.append(groupContainer);
            container.append(document.createElement("br"));
        }

        function restart() {
            clearInterval(tick);
            tick = null;
            for (let div of container.children)
                for (let button of div.children) button.disabled = true;

            restartButton.addEventListener("click", () => {
                rowInput.hidden = true;
                colInput.hidden = true;
                subButton.hidden = true;
                gameCycle(rows, cols, numArr);
            });

            rowInput.hidden = false;
            colInput.hidden = false;
            subButton.hidden = false;
            restartButton.hidden = false;
            container.append(restartButton);
        }
    }

    window.gameCycle = gameCycle;
})();