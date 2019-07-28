// Ciclo de vida del SW

//1 - INSTALL
self.addEventListener("install", event => {
  // console.log(event);
  //descargar assets
  //create cache
  console.log("Instalando Service Worker");

  const operation = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Service Worker: Install finish");
      self.skipWaiting();
      resolve();
    }, 500);
  });

  event.waitUntil(operation);
});

//2 - ACTIVATE
self.addEventListener("activate", event => {
  //delete old cache
  console.log("Service Worker Activo y listo para controlar la app");
});

//3 - FETCH: manejo de peticiones HTTP

self.addEventListener("fetch", event => {

    // console.log("SW - FETCH", event.request.url);

    if(event.request.url.includes("https://reqres.in"))
    {
        const response = new Response(` { ok: false, message: 'jajaja' }`);
        event.respondWith(response);
    }

});


//4 - SYNC: cuando recuperamos la conexión a internet
self.addEventListener("sync", event => {

    console.log("SW - SYNC - RECUPERAMOS CONEXIÓN");
    console.log(event);
    console.log(event.tag);

});

//5 - PUSH: Manejar push notifications
self.addEventListener('push', event =>{
    console.log('Notificación recibida');
});