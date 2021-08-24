(() => {
    function initializeApp(defaultStudents) {
        let headers = document.getElementById("head");
        let tableRow = document.createElement("tr");
        let idMap = new Map(
            [["ID", "id"], ["ФИО", "names"], ["Факультет", "spec"],
            ["Дата рождения", "birthday"], ["Годы обучения", "eduYears"]]
        );
        let buttonToObjMap = new Map();

        for (let name of ["ID", "ФИО", "Факультет", "Дата рождения", "Годы обучения"]) {
            let obj = {
                "id": idMap.get(name), "name": name,
                "classList": ["btn", "btn-info"], "state": "0"
            }
            buttonToObjMap.set(createButton(obj), obj);
        }
        headers.append(tableRow);

        let students = studentsArrayInit();

        fillTable(students);

        let nameFilter = document.getElementById("nameFilter");
        let specFilter = document.getElementById("specFilter");
        let startYearFilter = document.getElementById("startYearFilter");
        let endYearFilter = document.getElementById("endYearFilter");
        let filterList = [nameFilter, specFilter, startYearFilter, endYearFilter];
        let activeFilters = [];
        for (let filterInput of filterList)
            filterInput.addEventListener("input", () => filterBy(filterList));

        let resetButton = document.getElementById("reset");
        resetButton.addEventListener("click", resetFilters);

        function resetFilters() {
            for (let filter of filterList) filter.value = "";
            students = studentsArrayInit();
            clearTable();
            fillTable(students);
        }

        function createButton({id, name, classList}) {
            let th = document.createElement("th");
            th.scope = "col";

            let button = document.createElement("button");
            classList.forEach((className) => button.classList.add(className));
            button.textContent = name;
            button.id = id;
            button.addEventListener("click", sortBy);

            th.append(button);
            tableRow.append(th);

            return button;
        }

        function sortBy() {
            // state: 0 - сотрировка не активна, 1 - сортировка активна, 2 - сортировка активна в обратном порядке
            let buttonObj = buttonToObjMap.get(this);
            if (buttonObj.state !== "2") buttonObj.state = (parseInt(buttonObj.state) + 1).toString();
            else buttonObj.state = "1";

            switch (this.id) {
                case "names": {
                    students = students.sort((x, y) => x.join("").localeCompare(y.join("")));
                    break;
                }
                case "spec": {
                    students = students.sort((x, y) => x[1].localeCompare(y[1]));
                    break;
                }
                case "birthday": {
                    students = students.sort(
                        (x, y) => new Date(x[2].split(" ")[0].split(".").reverse().join(".")) - new Date(y[2].split(" ")[0].split(".").reverse().join("."))
                    );
                    break;
                }
                case "eduYears": {
                    students = students.sort((x, y) => parseInt(x[3].split("-")[0]) - parseInt(y[3].split("-")[0]));
                    break;
                }
                default: {
                    students = studentsArrayInit();
                    break;
                }
            }

            if (buttonObj.state === "2") students = students.reverse();
            clearTable();
            fillTable(students);
        }

        function filterBy(filterList) {
            let tempStudents = studentsArrayInit();
            activeFilters = filterList.filter((elem) => elem.value);
            if (this.value && !activeFilters.includes(this)) activeFilters.push(this);

            for (let filter of activeFilters) {
                if (!filter.value) continue;
                switch (filter.id) {
                    case "nameFilter": {
                        tempStudents = tempStudents.filter(
                            (elem) => {
                                return elem[0].trim().split(/ {2,}/).join(" ").toLowerCase()
                                    .split(" ").some((namePart) =>
                                        namePart.includes(filter.value.trim().split(/ {2,}/).join(" ").toLowerCase()));
                            });
                        break;
                    }
                    case "specFilter": {
                        tempStudents = tempStudents.filter(
                            (elem) => elem[1].trim().split(/ {2,}/).join(" ").toLowerCase()
                                .includes(filter.value.trim().split(/ {2,}/).join(" ").toLowerCase()));
                        break;
                    }
                    case "startYearFilter": {
                        tempStudents = tempStudents.filter((elem) => elem[3].split("-")[0] === filter.value);
                        break;
                    }
                    case "endYearFilter": {
                        tempStudents = tempStudents.filter((elem) => elem[3].split("-")[1].split(" ")[0] === filter.value);
                        break;
                    }
                }
            }

            let tempStudentsInStringRows = [...tempStudents];
            for (let row of tempStudents) tempStudentsInStringRows.push(row.join(""))
            students = tempStudents.length < students.length ?
                students.filter(elem => tempStudentsInStringRows.includes(elem.join(""))) : [...tempStudents];
            clearTable();
            fillTable(students);
        }

        function studentsArrayInit() {
            let res = localStorage.getItem("students");
            if (!res) res = [];
            for (let defStud of defaultStudents) res.push(createNewEntry(defStud));

            if (localStorage.getItem("hasNewEntry") === null)
                localStorage.setItem("hasNewEntry", "false");
            if (localStorage.getItem("hasNewEntry") === "true")
                res.push(createNewEntry(JSON.parse(localStorage.getItem("newEntry"))));

            return res
        }
    }

    function createNewEntry(paramArr) {
        // first-name -> last-name -> middle-name -> speciality -> birthday -> start-year
        let newStudent = [];
        let currentDate = new Date();
        let startYear = paramArr[5];
        let currentCourse = currentDate.getFullYear() - startYear;
        newStudent.push(paramArr.slice(0, 3).join(" "));
        newStudent.push(paramArr[3]);
        newStudent.push(
            `${new Date(paramArr[4]).toJSON().slice(0, 10).split("-").reverse().join(".")} (${currentDate.getFullYear() - new Date(paramArr[4]).getFullYear()} лет)`
        );
        newStudent.push(`${startYear}-${parseInt(startYear) + 4} (${
            ((currentCourse === 4 && currentDate.getMonth() >= 9) || (currentCourse > 4)) ? "закончил" : currentCourse + " курс"
        })`);

        return newStudent;
    }

    function fillTable(studentsList) {
        let tableBody = document.getElementById("body");
        for (let i = 0; i < studentsList.length; i++) {
            let tr = document.createElement("tr");
            let th = document.createElement("th");
            th.textContent = (i + 1).toString();
            th.scope = "row";
            tr.append(th);
            for (let elem of studentsList[i]) {
                let td = document.createElement("td");
                td.textContent = elem;
                tr.append(td);
            }
            tableBody.append(tr);
        }
    }

    function clearTable() {
        let tableBody = document.getElementById("body");
        tableBody.innerHTML = "";
    }

    window.initializeApp = initializeApp;
})();