const Pregunta = require('../models').Pregunta;
const OpcionRespuesta = require('../models').OpcionRespuesta;

module.exports = {
  create(req, res) {
    return Pregunta
      .create({
        idnivel: req.body.idnivel,
        descripcion: req.body.descripcion
      })
      .then(() => res.redirect('back'))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Pregunta
      .findAll({
        attributes: ['id', 'idnivel', 'descripcion'],
        include: [{model: OpcionRespuesta,as: 'opcionRespuesta',}],
      })
      .then(pregunta => res.status(200).send(pregunta))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Pregunta
      .findByPk(req.params.id)
      .then(pregunta => {
        if (!pregunta) {
          return res.status(404).send({
            message: 'Pregunta No Encontrado',
          });
        }
        return pregunta
          .update({
            idnivel: req.body.idnivel,
            descripcion: req.body.descripcion
          })
          .then(() => res.redirect('back'))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Pregunta
      .findOne({
          where: {
            id: req.params.id            
          },
        })
      .then(pregunta => {
        if (!pregunta) {
          return res.status(404).send({
            message: 'Pregunta no encontrada',
          });
        }
  
        return pregunta
          .destroy()
          .then(() => res.redirect('back'))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  getOpcionesDeRespuesta(req, res) {
    return Pregunta
      .findByPk(req.params.idPregunta, {
        include: [{
          model: OpcionRespuesta,
          as: 'opcionRespuesta',
          attributes: ['opcionRespuesta']
        }],
        attributes: ['id']
      })
      .then(pregunta => {
        if (!pregunta) {
          return res.status(404).send({
            message: 'Opciones de Respuesta no encontrada',
          });
        }
        return res.status(200).send(pregunta);
      })
      .catch(error => res.status(400).send(error));
  }
};