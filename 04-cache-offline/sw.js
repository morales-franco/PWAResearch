self.addEventListener('install', event =>{

    const cacheAppShellPromise = caches.open('cache-1').then(cache => {

        //guardamos app-shell en cache!
        return cache.addAll([
            '/index.html',
            '/css/style.css',
            '/img/main.jpg',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
            '/js/app.js'
        ]);
    });

    event.waitUntil(cacheAppShellPromise);

});