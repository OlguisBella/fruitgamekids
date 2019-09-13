const OpcionRespuesta = require('../models').OpcionRespuesta;

module.exports = {
  create(req, res) {
    console.log(req.body);
    return OpcionRespuesta
      .create({
        idPregunta:req.body.idPregunta,
        descripcion: req.body.descripcion,
        respuestaValida: req.body.respuestaValida
      })
      .then(() => res.redirect('back'))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return OpcionRespuesta
    .findAll({
      attributes: ['id', 'descripcion', 'idPregunta','respuestaValida']
    })
      .then(opcionRespuesta => res.status(200).send(opcionRespuesta))
      .catch(error => res.status(400).send(error));
  },  
  update(req, res) {
    return OpcionRespuesta
      .findByPk(req.params.id)
      .then(opcionRespuesta => {
        if (!opcionRespuesta) {
          return res.status(404).send({
            message: 'opcionRespuesta No Encontrado',
          });
        }
        return opcionRespuesta
          .update({
            idPregunta:req.body.idPregunta,
            descripcion: req.body.descripcion,
            respuestaValida: req.body.respuestaValida           
          })
          .then(() => res.redirect('back'))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return OpcionRespuesta
      .findByPk(req.params.id)
      .then(opcionRespuesta => {
        if (!opcionRespuesta) {
          return res.status(404).send({
            message: 'opcionRespuesta No Encontrada',
          });
        }
        return opcionRespuesta
          .destroy()
          .then(() => res.redirect('back'))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }

};