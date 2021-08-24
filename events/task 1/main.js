(() => {
    document.addEventListener("click", event => {
        let itemList = document.getElementById("item-list");
        if (itemList.contains(event.target)) return;
        else if (event.target === document.getElementById("button")) itemList.classList.toggle("show");
        else itemList.classList.remove("show");
    })
})();