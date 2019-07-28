//PROMISE RACE

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

/**
 * Promise.race : pone a competir las funciones como parametro y retorna la primera que
 * finalice. Si ambas finalizan al mismo tiempo, entonces retorna la que esta más a la izquierda.
 * SI ALGUNA DE LAS PROMISE DA ERROR, CANCELA TODO EL PROCESO!
 */

Promise.race([addSlowly(5), addQuickly(10)])
.then(response =>{
    console.log(response);
})
.catch(error => {
    console.error(error);
});



