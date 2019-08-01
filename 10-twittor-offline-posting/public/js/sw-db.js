//Interacción con indexDB using pouchdb

//Genero DB

const db = new PouchDB("db-messages");

function saveMessage(message) {
  //Si llega a este punto es porque soporta syncronización offline nativa
  //asique guardamos en la db para luego poder syncronizar cuando recuperemos la conexión

  message._id = new Date().toISOString();

  return db.put(message).then(() => {
    console.log("Message guardado para posterior posteo");
    //registro tarea
    //le decimos al SW que existe una tarea que tiene que hacer apenas vuelva tener conexión a internet.

    self.registration.sync.register("nuevo-post");

    const offlineResponse = {
      ok: true,
      offline: true
    };

    return new Response(JSON.stringify(offlineResponse));
  });
}

function postMessages() {
  const posteos = [];

  return db.allDocs({ include_docs: true }).then(docs => {
    docs.rows.forEach(row => {
      const data = row.doc;

      const postPromise = fetch("http://localhost:3000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(response => {
        //post exitoso - eliminamos de la bd
        return db.remove(data);
      });

      posteos.push(postPromise);

    });

    return Promise.all(posteos);

  });
}
