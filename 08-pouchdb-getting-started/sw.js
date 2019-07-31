importScripts("js/sw-utils.js");
console.log("Hello world");

const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";
const INMUTABLE_CACHE = "inmutable-v1";

const APP_SHELL = [
    '/',
    'index.html',
    'js/app.js',
    'js/base.js',
    'js/sw-utils.js',
    'style/base.css',
    'style/bg.png'
];

const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/pouchdb@7.1.1/dist/pouchdb.min.js'
];

self.addEventListener('install',  e => {

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
  
        if (key !== DYNAMIC_CACHE && key.includes("dynamic")) {
          return caches.delete(key);
        }
      });
    });
  
    e.waitUntil(clearCachePromise);
  });

  self.addEventListener("fetch", e => {
    const response = caches.match(e.request).then(response => {
      if (response) {
        return response;
      }
  
      //No esta el recurso en cache - Intento recuperarlo del server
      return fetch(e.request).then(newResponse => {
        return updateDynamicCache(DYNAMIC_CACHE, e.request, newResponse);
      });
    });
  
    e.respondWith(response);
  });