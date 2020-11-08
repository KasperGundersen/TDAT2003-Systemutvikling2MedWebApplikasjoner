let myButton = document.querySelector("#myButton");

myButton.addEventListener("click", e => {
  console.log("Fikk klikk-event");
  let url = "/login";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({"brukernavn": document.getElementById("username").value,"passord": document.getElementById("password").value})
  })
    .then(response => response.json())
    .then(json => (localStorage.token = json.jwt))
    .catch(error => console.error("Error: ", error)); 
});

nyKnapp.addEventListener("click", e =>{
  console.log("Fikk klikk-event");
  update();
  console.log("Oppdaterte jwt");
  let url = "/api/person";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-access-token": localStorage.token
    },
  })
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.error("Error: ", error)); 
});

refresh.addEventListener("click", e =>{
  console.log("Fikk klikk event");
  let url ="/token";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-access-token": localStorage.token
    }
  })
  .then(response => response.json())
  .then(json => (localStorage.token = json.jwt))
  .then(json => console.log(json))
  .catch(error => console.error("Error: ", error)); 
});

function update(){
  let url ="/token";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-access-token": localStorage.token
    }
  })
  .then(response => response.json())
  .then(json => (localStorage.token = json.jwt))
  .catch(error => console.error("Error: ", error)); 
}