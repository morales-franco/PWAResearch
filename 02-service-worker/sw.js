console.log("Registering SW!");

self.addEventListener("fetch", event => {
  //Log todas las peticiones que se realizan para recuperar recursos
  // console.log(event);
  // console.log(event.request.url);

  //Podemos modificar lo que retornamos con responseWith
  //la respuesta de event va a ser lo que retorna el fetch de event.request
  //Basicamente hacemos un pasa manos pero nosotros podriamos retornar lo que queremos
  //solamente que ahora desde consola podemos ver que los recursos los solicito el SW

  //Si bien el style.css exists el service worker return null
  // if(event.request.url.includes('style.css')){
  //     event.respondWith( null );
  // }else{
  //     event.respondWith( fetch( event.request) );
  // }

  // if(event.request.url.includes('.jpg')){

  //     //Diferents forms to return a same resource

  //     console.log(event.request.url);
  //    // let imageAux = fetch('img/main.jpg'); relative path
  //    // let imageAux = fetch(event.request.url); complete url
  //     let imageAux = fetch(event.request); //request object

  //     event.respondWith(imageAux);
  // }

  //   if (event.request.url.includes("style.css")) {
  //     //interceptamos petición

  //     let newResponse = new Response(
  //       `
  //         body {
  //             background-color: red !important;
  //             color: pink;
  //         }`,
  //       {
  //         headers: {
  //           "Content-Type": "text/css"
  //         }
  //       }
  //     );

  //     event.respondWith(newResponse);
  //   }

  //retornando un resource diferentes

  // if( event.request.url.includes('main.jpg') ){
  //     let newImage = fetch('img/mainInvert.jpg');

  //     event.respondWith(newImage);
  // }

  //Desde el index se solicita: <img src="img/main_NOT_FOUND.jpg" alt="Vías del tren" class="img-fluid">
  //Imagen que NO existe en el server --> Esto da un error 404
  //Pero un error 404 NO va al catch! Entonces nosotros queremos manejar ese error y retornar una imagen por defecto.

  const defaultRespond = fetch(event.request).then(response => {
    return response.ok ? response : fetch("img/default.jpg");
  });

  event.respondWith(defaultRespond);
});
