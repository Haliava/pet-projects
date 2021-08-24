function addEntry() {
    document.getElementById("sub").addEventListener("click", () => {
        let form = document.getElementById("form");
        let newEntry = [];
        let mistakes = "";

        for (let elem of form.children) {
            if (elem.id === "sub") continue;
            elem.value = elem.value.trim().split(/ {2,}/).join(" ");
            if (!["birthdate", "start-year"].includes(elem.id))
                if (!elem.value) mistakes += `Invalid ${elem.id}\n`;
                else newEntry.push(elem.value);
        }

        let date = document.getElementById("birthdate").valueAsDate;
        let now = Date.now();
        let old = new Date(1900, 1, 1);
        if (date > now || date < old || date === null)
            mistakes += `Invalid birth date, you're too ${date > now ? "young": "old"}\n`;
        else newEntry.push(date);

        let start = document.getElementById("start-year").value;
        if (start <= new Date().getFullYear() && start >= 2000) newEntry.push(start);
        else mistakes += `start year is too ${start >= 2000 ? "big": "small"}\n`;

        if (mistakes) {
            localStorage.setItem("hasNewEntry", "false");
            alert(mistakes);
        } else {
            alert(newEntry);
            localStorage.setItem("newEntry", JSON.stringify(newEntry));
            localStorage.setItem("hasNewEntry", "true");
            alert("Ученик успешно добавлен");
        }
    });
}

export {addEntry};