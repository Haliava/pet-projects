let currentStorageState = localStorage.getItem("currentStorageState"); // 0 - localStorage, 1 - server
if (typeof currentStorageState === "null") {
    currentStorageState = 0;
    localStorage.setItem("currentStorageState", currentStorageState.toString());
}

function toggleState() {
    currentStorageState = (+!parseInt(currentStorageState)).toString();
    localStorage.setItem("currentStorageState", currentStorageState);
}

export {currentStorageState, toggleState};

