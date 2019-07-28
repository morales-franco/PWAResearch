

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}
//TEST CACHE
// if( window.caches)
// {
//     //creamos cache si no existe
//     //luego de esto podemos cargar datos en el cache prueba-1
//     caches.open('prueba-1');

//     //check si existe el cache prueba-2 ==> retorna una promise
//     caches.has('prueba-2')
//     .then(exist => console.log(exist));

//      caches.delete("prueba-1").then(console.log)

//      caches.open('cache-v1.1').then(cache => {

//         //cacheo un unico resource: index.html
//         //cache.add('/index.html');

//         //cacheo varios resources
//         cache.addAll([
//             '/index.html',
//             '/css/style.css',
//             '/img/main.jpg'
//         ]).then( () => {
//             //delete resource from cache
//             //cache.delete('/css/style.css');

//             //modifico un recurso cacheado
//             cache.put('index.html', new Response('Hello world!'));
//         })
    
//      });

//      //get all caches!
//      caches.keys().then(keys => console.log(keys));
// }