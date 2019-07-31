

// Entrenamiento PouchDB

// 1- Crear la base de datos
// Nombre:  mensajes
var database = new PouchDB('mensajes');


// Objeto a grabar en base de datos
let mensaje = {
    _id: new Date().toISOString(),
    user: 'spiderman',
    mensaje: 'Mi tía hizo unos panqueques muy buenos',
    sincronizado: false
};


// 2- Insertar en la base de datos
// database.put(mensaje)
// .then(console.log('mensaje insertado'))
// .catch(console.log);



// 3- Leer todos los mensajes offline
database.allDocs({ include_docs: true, descending: true })
.then(doc => {
    console.log("select *", doc.rows);
})



// 4- Cambiar el valor 'sincronizado' de todos los objetos
//  en la BD a TRUE

// database.allDocs({ include_docs: true, descending: true })
// .then(docs => {
//     for (const row of docs.rows) {
//         console.log(row);
//         let mensaje = row.doc;

//          mensaje.sincronizado = true;
//          database.put(mensaje)
//          .then(console.log("Update Ok"));
//     }
// })



// 5- Borrar todos los registros, uno por uno, evaluando
// cuales estan sincronizados
// deberá de comentar todo el código que actualiza
// el campo de la sincronización 
database.allDocs({ include_docs: true, descending: true })
.then(docs => {
    for (const row of docs.rows) {
        let mensaje = row.doc;

        if(mensaje.sincronizado === true)
            database.remove(mensaje)
                .then(console.log("DELETE OK"))

        
    }
})





