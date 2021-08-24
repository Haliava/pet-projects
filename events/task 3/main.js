(() => {
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.8
    }

    let callback = function(entries, observer) {
        let scrollNum = document.getElementById("scrolled-number");

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let neck = document.createElement("pre");
                neck.textContent = `   ▀▄▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▄▒▒▒▒▌
   ▄▀▒▒▒▒▒▒▒▒▒▒▒░▒░▒▄▒▒▒▒▒▌
  ▄▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▒▄▒▒▐
  ▀▄▒▒▒▒▒░▒▒▒▒▒▒▒░▒░▒▄▒▒▒▒▌
   ▀▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▄▒▒▌
  ▄▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▒▄▒▒▐
   ▀▄▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▄▒▒▒▒▌
   ▄▀▒▒▒░▒▒▒▒▒▒▒░▒░▒▄▒▒▒▒▒▌
  ▄▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▒▄▒▒▐
  ▀▄▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▄▒▒▒▒▌
   ▀▄▒▒▒▒░▒▒▒▒▒▒▒▒▒░▒▄▒▒▒▒▌
   ▄▀▒▒▒▒▒▒▒▒▒▒▒░▒░▒▄▒▒▒▒▒▌
  ▄▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▒▄▒▒▐
  ▀▄▒▒▒▒▒░▒▒▒▒▒▒▒░▒░▒▄▒▒▒▒▌
   ▀▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▄▒▒▌
  ▄▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▒▄▒▒▐
   ▀▄▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▄▒▒▒▒▌
   ▄▀▒▒▒░▒▒▒▒▒▒▒░▒░▒▄▒▒▒▒▒▌
   ▀▄▒▒▒▒░▒▒▒▒▒▒▒▒▒░▒▄▒▒▒▒▌
   ▄▀▒▒▒▒▒▒▒▒▒▒▒░▒░▒▄▒▒▒▒▒▌
  ▄▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▒▄▒▒▐
  ▀▄▒▒▒▒▒░▒▒▒▒▒▒▒░▒░▒▄▒▒▒▒▌
   ▀▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▄▒▒▌
  ▄▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▒▄▒▒▐
   ▀▄▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▄▒▒▒▒▌
   ▄▀▒▒▒░▒▒▒▒▒▒▒░▒░▒▄▒▒▒▒▒▌
  ▄▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▒▄▒▒▐
  ▀▄▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒▄▒▒▒▒▌`;
                neck.classList.add("neck");
                document.getElementById("container").append(neck);
            }

            observer.unobserve(entry.target);
            observer.observe(document.getElementById("container").lastElementChild);
            scrollNum.textContent = "Прокручено: " + window.pageYOffset;
        });

    };

    let observer = new IntersectionObserver(callback, options);
    observer.observe(document.getElementById("container").lastElementChild);

    document.getElementById("button").addEventListener("click", () => {
       window.scrollTo({"top": 0, "behavior": "smooth"});
    });
})();