console.log("Hello world!");

var request = new XMLHttpRequest();

request.open("GET", "https://reqres.in/api/users", true);
request.send(null); //no envio argumentos

request.onreadystatechange = function(state){
    // console.log(request);

    if(request.readyState == 4){ 
        var response = request.response;
        var objectResponse = JSON.parse(response);
        console.log(objectResponse);
    }
};

//Esto es demasiado code para solamente hacer una llamada por eso distintas librerias
//lo solucionaron con diferentes flavors
// JQUERY soluciono esto con AJAX
// JS ahora implemento con Fetch API