// Guardar  en el cache dinamico
function actualizaCacheDinamico(dynamicCache, req, res) {
  if (res.ok) {
    return caches.open(dynamicCache).then(cache => {
      cache.put(req, res.clone());

      return res.clone();
    });
  } else {
    return res;
  }
}

// Cache with network update
function actualizaCacheStatico(staticCache, req, APP_SHELL_INMUTABLE) {
  if (APP_SHELL_INMUTABLE.includes(req.url)) {
    // No hace falta actualizar el inmutable
    // console.log('existe en inmutable', req.url );
  } else {
    // console.log('actualizando', req.url );
    return fetch(req).then(res => {
      return actualizaCacheDinamico(staticCache, req, res);
    });
  }
}

//Network with cache fallback- update
function manejoApiMensajes(cacheName, request) {
  //POST request can't be in the CACHE!! Only GET!
  if (request.clone().method === "POST") {
    //POST NEW MESSAGE

    //Evaluamos si el sw soporta manejo de sincronización
    if (self.registration.sync) {
      //Posteo offline
      //registramos request
      //Tendria que guardar el request en el indexDB
      return request
        .clone()
        .text()
        .then(body => {
          console.log(body);

          const bodyObj = JSON.parse(body);
          return saveMessage(bodyObj);
        });
    }
    //else: retornamos request porque el browser no puede trabajar con tareas async
    //Le pegamos al server directamente y NO grabamos en el indexDB
    return fetch(request);
  }

  return fetch(request)
    .then(response => {
      if (response.ok) {
        actualizaCacheDinamico(cacheName, request, response.clone());
        return response.clone();
      }

      return caches.match(request);
    })
    .catch(error => {
      return caches.match(request);
    });
}
