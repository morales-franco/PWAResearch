
function updateDynamicCache( dynamicCache, request, response ){

    if( response.ok ){
        //almacenar en el cache

        return caches.open(dynamicCache).then(cache => {
            cache.put(request, response.clone());
            return response.clone();
        });
    }

    //falla promesa y cache!
    return response;

}