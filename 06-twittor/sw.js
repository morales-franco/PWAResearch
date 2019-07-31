importScripts('js/sw-utils.js')

const STATIC_CACHE = "static-v2";
const DYNAMIC_CACHE = "dynamic-v1";
const INMUTABLE_CACHE = "inmutable-v1";

//Librerias y recursos hechos por mi que son parte del appshell- core de la app
const APP_SHELL = [
  // "/", --> Porque al hostearlo en github este site ya no va  a estar en la raiz
  "index.html",
  "css/style.css",
  "img/favicon.ico",
  "img/avatars/hulk.jpg",
  "img/avatars/ironman.jpg",
  "img/avatars/spiderman.jpg",
  "img/avatars/thor.jpg",
  "img/avatars/wolverine.jpg",
  "js/app.js"
];

const APP_SHELL_INMUTABLE = [
  "https://fonts.googleapis.com/css?family=Quicksand:300,400",
  "https://fonts.googleapis.com/css?family=Lato:400,300",
  "https://use.fontawesome.com/releases/v5.3.1/css/all.css",
  "css/animate.css",
  "js/libs/jquery.js"
];

self.addEventListener("install", e => {
  const staticCache = caches
    .open(STATIC_CACHE)
    .then(cache => cache.addAll(APP_SHELL));

  const inmutableCache = caches
    .open(INMUTABLE_CACHE)
    .then(cache => cache.addAll(APP_SHELL_INMUTABLE));

  e.waitUntil(Promise.all([staticCache, inmutableCache]));
});

self.addEventListener("activate", e => {
  //ELIMINO CACHE VIEJO

  const clearCachePromise = caches.keys().then(keys => {
    keys.forEach(key => {
      if (key !== STATIC_CACHE && key.includes("static")) {
        return caches.delete(key);
      }
    });
  });

  e.waitUntil(clearCachePromise);
});

self.addEventListener('fetch', e => {

    const response = caches.match( e.request ).then(response => {

        if(response){
            return response
        }
        
        //No esta el recurso en cache - Intento recuperarlo del server
        return fetch(e.request).then(newResponse => {
            return updateDynamicCache( DYNAMIC_CACHE, e.request, newResponse )
        });


    })

    e.respondWith(response);

});