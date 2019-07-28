// fetch('https://reqres.in/api/users/1')
// .then(response => {

//     response.json()
//     .then(user => {
//         console.log(user.data);
//     });

//     //ERROR! 'Response': body stream is locked or stream already read!
//     //Necesitamos CLONAR la petición si la vamos a utilizar dos veces!
//     response.json()
//     .then(user => {
//         console.log(user.data);
//     });
    

// });

//USAMOS CLONE - El clone siempre debe ir antes de utilizar el original!
//Una vez que se leyo el REQUEST ORIGINAL ya NO se puede volver a leer!
fetch('https://reqres.in/api/users/1')
.then(response => {

    //1: usamos el clone
    response.clone().json()
    .then(user => {
        console.log(user.data);
    });

    //2: usamos otro clone
    response.clone().json()
    .then(user => {
        console.log(user.data);
    });

    //3: usamos la original!
    response.json()
    .then(user => {
        console.log(user.data);
    });
    
});
