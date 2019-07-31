const CACHE_STATIC_NAME = 'cache-static-v1';
const CACHE_DYNAMIC_NAME = 'cache-dynamic-v1';
const CACHE_INMUTABLE_NAME = 'cache-inmutable-v1';

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
    //Cache with Network Fallback - with Dynamic caches
    console.log(e.request.url);
    const resource = caches.match( e.request )
    .then( response => {

        if( response )
        {
            return response;
        }

        //File doesn't exist
        //I need to retrieve resource from the server

        console.log('no existe', e.request.url);

        return fetch( e.request)
        .then(newResponse =>{

            caches.open(CACHE_DYNAMIC_NAME)
            .then(cache => {
                //cacheo el nuevo resource
                cache.put( e.request,  newResponse);
                cleanCache(CACHE_DYNAMIC_NAME, 5);
            });

            //no podemos usar el response más de una vez
            return newResponse.clone();
        } );
    });

    e.respondWith(resource);

});