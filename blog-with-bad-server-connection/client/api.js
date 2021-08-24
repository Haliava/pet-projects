async function getPageContent() {
    let errorsStorage = [];

    return fetch(`http://localhost:3000/api/products`, { //json_invalid=true status=200
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => {
        if (res.status === 200) return res.json();
        else throw new Error(res.status.toString());
    }).then(resJson => {
        if (resJson) return [resJson, errorsStorage];
        else throw new Error("wrongJson");
    }).catch((err) => {
        if (err instanceof SyntaxError) err.message = "wrongJson";
        errorsStorage.push(err.message);
        return [{products: []}, errorsStorage];
    });
}

export {getPageContent};