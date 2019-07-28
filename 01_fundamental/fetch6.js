//ERROR! Retrieve an user that doesn't exist!
//Error 400/404! But the request doesn't come in to catch statement!
fetch('https://reqres.in/api/users/100')
.then(response => {
    console.log(response);
    
    if( response.ok ){
        return response.json()
    }
    else{
        throw new Error("No existe el user 100");
    }
    
})
.then(console.log)
.catch(error => {
    console.log("Error petición")
    console.log(error);
})
