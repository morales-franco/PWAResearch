function addOne(number){
    var promise = new Promise(function(resolve, reject){

        if( number >= 7){ 
            reject("The number can't be upper than 7");
        }

        setTimeout(() => {
            resolve(number + 1);
        }, 800);
    });

    return promise;
}

// addOne(5).then( function(newNumber){
//     console.log(newNumber);

// } );

//lambda expression - chaining promises
addOne(5).then( newNumber => {
    console.log(newNumber); //return 6
    return addOne(newNumber); //return promise - la function inside del then must return a promise!
} )
.then(newNumber =>{
    console.log(newNumber);//return 7
    return addOne(newNumber);//return promise
})
.then(newNumber =>{
    console.log(newNumber);//return 8
})
.catch(error => {
    console.log("ERROR IN PROMISE!")
    console.log(error);
}) //si alguna promise falla va  este catch, podemos tener un catch para cada promise o uno gral.

//improve coding
addOne(5)
.then(addOne)//return a promise a pass the result value to the next function
.then(addOne)
.then(newNumber =>console.log(newNumber)) 
.catch(error => {
    console.log("ERROR IN PROMISE!")
    console.log(error);
}) //si alguna promise falla va  este catch, podemos tener un catch para cada promise o uno gral.
