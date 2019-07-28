//Confirmo si podemos usar service worker
if(navigator.serviceWorker){
    console.log("Browser supports Service Worker!");

    //El service worker es recomendable ponerlo en la raiz del site! Index.html!
    navigator.serviceWorker.register("/sw.js");

}

