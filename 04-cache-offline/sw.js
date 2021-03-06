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
            '/img/no-img.jpg',
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
    //5 - Cache & Network Race

    const responseNetwork = new Promise((resolve, reject) => {

        let rechazada = false;

        const falloUnaVez = () => {

            if(rechazada){
                //No existe petición válida ni en cache ni en server

                //usar regular expression! Return default image
                if(e.request.url.includes("jpg") ||
                   e.request.url.includes("png")){
                    resolve ( caches.match( '/img/no-img.jpg' ) );
                }else
                {
                    reject("No se encontro respuesta");
                }

            }else{
                rechazada = true;
            }

        };


        fetch( e.request ).then( response => {
            response.ok ? resolve(response) : falloUnaVez()
        }).catch(falloUnaVez);

        caches.match(e.request).then(response => {
            response ? resolve(response): falloUnaVez()
        }).catch(falloUnaVez);


    });
    

   


    

    e.respondWith(responseNetwork);

});