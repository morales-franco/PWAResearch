const CACHE_NAME = 'cache-1';

self.addEventListener('install', event =>{

    const cacheAppShellPromise = caches.open(CACHE_NAME).then(cache => {

        //guardamos app-shell en cache!
        // '/' necesitamos guardar esto tamb! porque el client puede ingresar desde localhost:8080 o localhost:8080/index.html
        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/img/main.jpg',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
            '/js/app.js'
        ]);
    });

    event.waitUntil(cacheAppShellPromise);

});

self.addEventListener('fetch', e => {

    //1 - Cache Only

    //match: busca en todos los caches pertenecientes al mismo dominio
    // event.respondWith( caches.match( event.request ) );

    //2 - Cache with Network Fallback

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

            caches.open(CACHE_NAME)
            .then(cache => {
                //cacheo el nuevo resource
                cache.put( e.request,  newResponse);
            });

            //no podemos usar el response más de una vez
            return newResponse.clone();;
        } );
    });

    e.respondWith(resource);

});