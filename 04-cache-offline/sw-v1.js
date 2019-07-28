


self.addEventListener('fetch', event => {

    //TEXT PLANE
    // const offlineResponse = new Response(`
    //     Bienvenido a mi Site

    //     Disculpa para utilizarla necesitas conectarte a internet!
    // `);

    //HTML
    // const offlineResponse = new Response(`
    // <!DOCTYPE html>
    // <html lang="en">
    // <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //     <title>OFFLINE/title>
    // </head>
    // <body class="container p-3">
    //     <h1>Lo sentimos</h1>
    //     <hr>
    
    //     <p>
    //         Usted NO tiene conexión a Internet, no se han podido conectar con el servidor.
    //     </p>
    
    // </body>
    // </html>
    // `, {
    //     headers:{
    //         'Content-Type': 'text/html'
    //     }
    // });


    const offlineResponse = fetch("pages/offlineResponse.html");

    const response = fetch(event.request)
    .catch( () => {

        return offlineResponse;

    } );

    event.respondWith(response);

})