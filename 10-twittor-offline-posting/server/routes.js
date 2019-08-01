// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();

//Postman: http://localhost:3000/api GET
const  mensajes = [
  {
    _id: '1',
    user: 'spiderman',
    mensaje: 'Hola mundo - Spiderman'
  },
  {
    _id: '2',
    user: 'hulk',
    mensaje: 'Hola mundo - Hulk'
  }
];



 

// Get mensajes
router.get('/', function (req, res) {
  res.json(mensajes);
});

//POST mensaje
router.post('/', function (req, res) {
  
  const mensaje = {
    mensaje : req.body.mensaje,
    user: req.body.user
  };

  mensajes.push(mensaje);

  console.log(mensaje);

  res.json({
    ok:true,
    mensaje
  })

});


module.exports = router;