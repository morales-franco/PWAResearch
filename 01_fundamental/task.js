// ==============================================
// Ejercicio #1
// ==============================================
/*
https://swapi.co: API STAR-WARS
 Realizar un llamado FETCH a la siguiente API
 https://swapi.co/api/people/1/
 Imprima en consola el nombre y género de la persona.
*/

// Resolución de la tarea #1:


// fetch(' https://swapi.co/api/people/1/')
// .then(result => result.json())
// .then(user=> {
//     console.log(user);
//     console.log(user.name);
//     console.log(user.gender);
// });


// ==============================================
// Ejercicio #2
// ==============================================
/*
 Similar al ejercicio anterior... haga un llamado a la misma api
 (puede reutilizar el código )
 https://swapi.co/api/people/1/
 
 Pero con el nombre y el género, haga un posteo
 POST a: https://reqres.in/api/users

 Imprima en consola el objeto y asegúrese que tenga
 el ID y la fecha de creación del objeto
*/

// Resolución de la tarea #2:


fetch(' https://swapi.co/api/people/1/')
.then(result => result.json())
.then(user=> {

    let newUser = {
        "name": user.name,
        "gender": user.gender
    };

    fetch('https://reqres.in/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(result => result.json())
    .then(newUser => console.log(newUser))
});

//REFACTOR

function postUser(user){

    let newUser = {
        "name": user.name,
        "gender": user.gender
    };

    return fetch('https://reqres.in/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

fetch(' https://swapi.co/api/people/1/')
.then(result => result.json())
.then(postUser)
.then(result => result.json())
.then(newUser => console.log(newUser))



