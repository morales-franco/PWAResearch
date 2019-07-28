function addSlowly(number){
    return new Promise(function(resolve, reject){
        setInterval(() => {
            resolve(number + 1);
        }, 800);  
    });
}

//STANDARD ECMA SCRIPT 6

let addQuickly = (number) =>{
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            resolve(number + 1);
        }, 300);
    });

};

//addQuickly finish first because it has a delay for 300 ms.
addSlowly(5).then(console.log);
addQuickly(10).then(console.log);

//all, espera a que todas las funciones que le pasen finalicen
//podria pasarle valores distinto de promesas for example:
//Promise.all([addSlowly(5), addQuickly(10), true, myFunctionThatReturnIntNoASYNC()])

Promise.all([addSlowly(5), addQuickly(10)])
.then(responses => { //Response se carga en el mismo orden definido de las promesas arriba. First addSlowly, Second Add Quickly
    console.log(responses);
})
.catch(error => {
    console.error(error); //Si alguna de las promesas falla, TODAS FALLAN
})