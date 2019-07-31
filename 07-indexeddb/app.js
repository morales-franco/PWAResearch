
// indexedDB: Reforzamiento

//name BD ; version number
let request = window.indexedDB.open('data-base', 1);

//Se actualiza cuando se crea o se sube la versión de la DB

request.onupgradeneeded = event => {
    console.log("update DB");

    let db = event.target.result;

    db.createObjectStore('heroes', {
        keyPath: 'id'

    });
}

//Manejo de errores
request.onerror = event => {
    console.log("DB Error", event.target.error);
};

//Insert data

request.onsuccess = event => {
    let db = event.target.result;

    let heroesData = [
        {
            id: '111',
            heroe: 'Spiderman',
            mensaje: 'Aquí su amigo Spiderman'
        },
        {
            id: '112',
            heroe: 'Spiderman2',
            mensaje: 'Aquí su amigo Spiderman2'
        }
    ];

    let heroesTransaction = db.transaction('heroes', 'readwrite');

    heroesTransaction.onerror = event => {
        console.log("Error guardando", event.target.error);
    };

    //Informa sobre el exito de la transaction
    heroesTransaction.oncomplete = event => {
        console.log("Transaction hecha", event);
    }

    let heroeStore = heroesTransaction.objectStore('heroes');

    for (const heroe of heroesData) {
        heroeStore.add(heroe);
    }

    heroeStore.onsuccess = event => {
        console.log("Nuevo item agregado a la base de datos");
    }



}