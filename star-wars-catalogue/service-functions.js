function setNewUrl(page) {
    let url = location.href.toString().split("/");
    url[url.length - 1] = page;
    return  url.join("/");
}

function getEpisodeNum() {
    return new URLSearchParams(location.search).get("episodeNum") || "1";
}

function getDataJson(episodeNum = "") {
    return fetch(`https://swapi.dev/api/films/${episodeNum}`).then(res => res.json());
}

function toRomanNumerals(num) {
    let roman = {
        M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90,
        L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
    };

    let res = "";
    for (let romanLiteral of Object.keys(roman)) {
        let q = Math.floor(num / roman[romanLiteral]);
        num -= q * roman[romanLiteral];
        res += romanLiteral.repeat(q);
    }

    return res;
}

export {setNewUrl, getDataJson, toRomanNumerals, getEpisodeNum};