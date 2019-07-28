fetch('not-found.html')
.then(response => response.text())
.then(html => {
    //IF EXIST ANY ERROR HERE, THEN THE CATCH SECTION IS TRIGGERED.
    //For example:
    //let body = document.querySelec('body'); Sintax erros ==> trigger catch!
    console.log(html);
    let body = document.querySelector('body');
    body.innerHTML = html;
    
})
.catch(error => {
    console.log("Error en la petición");
    console.log(error);
})