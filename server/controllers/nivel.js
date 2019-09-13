const Nivel = require('../models').Nivel;

module.exports = {
    createNivel(req, res) {
        return Nivel
          .create({
            descripcion: req.body.descripcion,
            valor: req.body.valor,
            categoriaid: req.body.categoriaid,
          })
          .then(() => res.redirect('back'))
          .catch(error => res.status(400).send(error));
      },

    listNivel(req, res) {
        return Nivel
            .findAll()
            .then(nivel => res.status(200).send(nivel))
            .catch(error => res.status(400).send(error));
    },
    getSession(req, res) {
      return Nivel
          .findAll()
          .then(nivel => res.status(200).send(req.user.dataValues))
          .catch(error => res.status(400).send(error));
    },
    update(req, res) {
      return Nivel
        .findByPk(req.params.id)
        .then(nivel => {
          if (!nivel) {
            return res.status(404).send({
              message: 'Nivel No Encontrado',
            });
          }
          return nivel
            .update({
              descripcion: req.body.descripcion,
              valor: req.body.valor,
              categoriaid: req.body.categoriaid
            })
            .then(() => res.redirect('back'))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
      return Nivel
        .findOne({
            where: {
              id: req.params.id            
            },
          })
        .then(nivel => {
          if (!nivel) {
            return res.status(404).send({
              message: 'Nivel no encontrado',
            });
          }
    
          return nivel
            .destroy()
            .then(() => res.redirect('back'))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }

};
