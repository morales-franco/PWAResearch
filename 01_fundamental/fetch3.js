//Request POST
//https://reqres.in/api/users
//Fetch! It's native of JS - we don't need to install anything, it lives in the browser!

let user = {
    "name": "Franco",
    "surname": "Morales"
};

fetch('https://reqres.in/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(jsonObject => console.log(jsonObject))
.catch(error => {
    console.log("Error en la petición");
    console.log(error);
});