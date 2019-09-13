const Categoria = require('../models').Categoria;

module.exports = {
  create(req, res) {
    return Categoria
      .create({
        nombre: req.body.nombre,
      })
      .then(() => res.redirect('back'))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Categoria
      .findAll({
        attributes: ['id', 'nombre']
      })
      .then(categoria => res.status(200).send(categoria))
      .catch(error => res.status(400).send(error));
  },
  getIdCategoria(req, res) {
    return Categoria
      .findOne({
        where: {nombre: req.params.nameCategoria},
        attributes: ['id'],
      })
      .then(categoria => res.status(200).send(categoria))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Categoria
      .findByPk(req.params.id)
      .then(categoria => {
        if (!categoria) {
          return res.status(404).send({
            message: 'Categoria No Encontrada',
          });
        }
        return categoria
          .update({
            nombre: req.body.nombre,
          })
          .then(() => res.redirect('back'))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Categoria
      .findOne({
          where: {
            id: req.params.id            
          },
        })
      .then(categoria => {
        if (!categoria) {
          return res.status(404).send({
            message: 'Categoria no encontrada',
          });
        }
  
        return categoria
          .destroy()
          .then(() => res.redirect('back'))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },  

};