const Puntaje = require('../models').Puntaje;
const Pregunta = require('../models').Pregunta;

const Sequelize = require('sequelize');

module.exports = {
  createPuntaje(req, res) {
    return Puntaje
      .create({
        idFruta: req.body.idFruta,
        idPregunta: req.body.idPregunta,
        valorPuntaje: req.body.valorPuntaje
      })
      .then(puntaje => res.status(201).send(puntaje))
      .catch(error => res.status(400).send(error));
  },

  obtenerTotalPuntaje(req, res) {
    return Puntaje.findAll({
      attributes: [[Sequelize.fn('sum', Sequelize.col('valorPuntaje')), 'total']],
      raw: true
    })
      .then(puntaje => res.status(201).send(puntaje))
      .catch(error => res.status(400).send(error));
  },

  destroyAll(req,res){
    Puntaje.destroy({
      where: {},
      truncate: true
  })
  .then(puntaje => res.status(201).send(puntaje))
  .catch(error => res.status(400).send(error));

  },

  destroyById(req,res){
    Puntaje.destroy({
      where: {idFruta:req.params.idFruta,idPregunta:req.params.idPregunta},
      truncate: true
  })
  .then(puntaje => res.status(201).send(puntaje))
  .catch(error => res.status(400).send(error));
  },

  getPregunta(req, res) {
    return Puntaje
      .findOne({
        where: {idFruta: req.params.idFruta},
        attributes: ['Pregunta.descripcion'],
        include: [{
          model: Pregunta,
          attributes:  ['Pregunta.descripcion']
        }]
      })
      .then(pregunta => res.status(200).send(pregunta))
      .catch(error => res.status(400).send(error));
  },
  updatePuntaje(req, res) {   
    return Puntaje     
    .findOne({
      where: {
        idFruta: req.params.idFruta,
        idPregunta: req.params.idPregunta        
      },
    })
  .then(puntaje => { 
    if (!puntaje) {
      return res.status(404).send({
        message: 'Puntaje no encontrado',
      });
    }

    return puntaje
      .update({
        valorPuntaje: req.body.valorPuntaje
      })
      .then(updatedPuntaje => res.status(200).send(updatedPuntaje))
      .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));

}

}


