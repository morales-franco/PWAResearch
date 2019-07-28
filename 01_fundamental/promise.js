//Execute this js: node prom1.js
console.log('hola mundo');

//** First version - Sync
// function addOne(number){
//     return number + 1;
// }
//console.log(addOne(5)); ==> return 6

//** Second Version with delay: 
// function addOne(number){
//     setTimeout(() => {
//         return number + 1;
//     }, 800);
// }
//console.log(addOne(5)); ==> return undefined


//** Third Version with CALLBACK: 
function addOne(number, callback){
    setTimeout(() => {
        callback(number + 1);
    }, 800);
}

addOne(5, function(newValue){
    console.log(newValue);
});
//console.log(addOne(5)); ==> return 6 despues de los 800 ms

//** FOURTH Version multiple callbacks
addOne(5, function(newValue1){
    addOne(newValue1, function(newValue2){
        addOne(newValue2, function(newValue3){
            console.log(newValue3);
        });
    });
});
//console.log(addOne(5)); ==> return 8 despues de los 2400 ms

//Podemos manejar llamdas async pero el codigo se va haciendo grande y si metemos 
//manejo de errores todavia crece aun más porque en cada sub-llamada tenemos que recibir callback y error function
//caemos en un CALLBACK HELL!


