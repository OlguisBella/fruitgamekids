const userController = require('../controllers').user;
const categoriaController = require('../controllers').categoria;
const frutaController = require('../controllers').fruta;
const puntajeController = require('../controllers').puntaje;
const preguntaController = require('../controllers').pregunta;
const nivelController = require('../controllers').nivel;
const opcionRespuestaController = require('../controllers').opcionRespuesta;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  //POST create
  app.post('/api/categoria', categoriaController.create);  
  app.post('/api/fruta', frutaController.create);
  app.post('/api/puntaje', puntajeController.createPuntaje); 
  app.post('/api/pregunta', preguntaController.create);
  app.post('/api/opcionRespuesta', opcionRespuestaController.create);
  app.post('/api/nivel', nivelController.createNivel);
  

  //GET list
  app.get('/api/puntaje', puntajeController.obtenerTotalPuntaje);  
  app.get('/api/categoria', categoriaController.list);
  app.get('/api/opcionRespuesta', opcionRespuestaController.list);
  app.get('/api/totalfruta', frutaController.getfruitCount);
  app.get('/api/nivel', nivelController.listNivel);
  app.get('/api/pregunta', preguntaController.list);
  app.get('/api/fruta', frutaController.list);  
  app.get('/api/sesion', nivelController.getSession);

   //GET list by 
  app.get('/api/fruta/:categoriaid', frutaController.retrieve); 
  app.get('/api/puntaje/:idFruta', puntajeController.getPregunta); 
  app.get('/api/pregunta/:idPregunta', preguntaController.getOpcionesDeRespuesta);
 
  //GET id by
  app.get('/api/categoria/:nameCategoria', categoriaController.getIdCategoria);

  //PUT update
   app.put('/api/fruta/:id', frutaController.update);
   app.put('/api/user/:id', userController.update);
   app.put('/api/pregunta/:id', preguntaController.update);
   app.put('/api/opcionRespuesta/:id', opcionRespuestaController.update);
   app.put('/api/nivel/:id', nivelController.update);
   app.put('/api/categoria/:id', categoriaController.update);
   app.put('/api/puntaje/:idFruta,:idPregunta', puntajeController.updatePuntaje);

   //DELETE one element
  app.delete('/api/fruta/:id', frutaController.destroy);
  app.delete('/api/opcionRespuesta/:id', opcionRespuestaController.destroy);
  app.delete('/api/puntaje', puntajeController.destroyAll);
  app.delete('/api/puntaje/:id,:id', puntajeController.destroyById);
  app.delete('/api/pregunta/:id', preguntaController.destroy);
  app.delete('/api/nivel/:id', nivelController.destroy);
  app.delete('/api/categoria/:id', categoriaController.destroy);
  
};