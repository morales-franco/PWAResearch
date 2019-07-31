const CACHE_STATIC_NAME = 'cache-static-v1';
const CACHE_DYNAMIC_NAME = 'cache-dynamic-v1';
const CACHE_INMUTABLE_NAME = 'cache-inmutable-v1';
const CACHE_DYNAMIC_LIMIT = 50;

function cleanCache(cacheName, maxItem){

    caches.open(cacheName)
    .then ( cache => {
        cache.keys()
        .then(keys => {
            if( keys.length >= maxItem ){
                cache.delete(keys[0])
                .then(cleanCache(cacheName, maxItem));

            }
        })

    });

}

self.addEventListener('install', event =>{

    //STATIC CACHE: Grabamos el app-shell
    const cacheStaticPromise = caches.open(CACHE_STATIC_NAME).then(cache => {
        // '/' necesitamos guardar esto tamb! porque el client puede ingresar desde localhost:8080 o localhost:8080/index.html
        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/img/main.jpg',
            '/js/app.js'
        ]);
    });

    //Contenido inmutable, que NO va a cambiar
    const cacheInmutablePromise = caches.open(CACHE_INMUTABLE_NAME).then(cache => {
        return cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
    });


    event.waitUntil(Promise.all([cacheStaticPromise, cacheInmutablePromise]));

});

self.addEventListener('fetch', e => {
    //3 - Network with cache fallback

    //Network first
    const responseNetwork = fetch( e.request ).then(response => {

        //Si la respuesta NO existe - 404
        if(!response){
            return caches.match(e.request);
        }

        console.log('Fetch', response);
        caches.open( CACHE_DYNAMIC_NAME)
        .then( cache => {
            cache.put(e.request, response);
            cleanCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);

        });

        return response.clone();
    }).catch( error => {

        return caches.match(e.request);
    });

    e.respondWith(responseNetwork);

});