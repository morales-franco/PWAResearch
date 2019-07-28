//Request GET
//https://reqres.in/api/users
//Fetch! It's native of JS - we don't need to install anything, it lives in the browser!

fetch('https://reqres.in/api/users')
.then(response => response.json())
.then(jsonObject => console.log(jsonObject));

