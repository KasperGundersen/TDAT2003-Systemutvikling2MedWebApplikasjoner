let url = "http://bigdata.stud.iie.ntnu.no/sentiment/webresources/sentiment/log?api-key=Happy!!!";
let getMood = document.querySelector("#knapp");


getMood.addEventListener("click", event => {
    let sendInput = document.getElementById('textInput').value;
    console.log(sendInput);
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ sentence: sendInput })
    })
        .then(response => response.json())
        .then(json => changeColor(json.value))
        .catch(error => console.error("Error: ", error));

})

function changeColor(number) {
    if (number == 4) {
        document.body.style.backgroundColor = "Violet";
    } else if (number == 1) {
        document.body.style.backgroundColor = "Orchid";
    } else if (number == 2) {
        document.body.style.backgroundColor = "green";
    } else if (number == 3) {
        document.body.style.backgroundColor = "blue";
    } else if (number == 0) {
        document.body.style.backgroundColor = "black";
    }
}