const Sequelize = require('sequelize');
const cloudinary = require('cloudinary');
const config = require('../config/cloudinary').cloudinary;
const Fruta = require('../models').Fruta;
const Categoria = require('../models').Categoria;

/*configure our cloudinary*/
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret
});

module.exports = {
  create(req, res) {
    return Fruta
      .create({
        nombre: req.body.nombre,
        url: req.files.url.path,
        valor: req.body.valor,
        categoriaid: req.body.categoriaid,
        preguntaid: req.body.preguntaid
      })
      .then(fruta => {
        var name = req.files.url.originalFilename.split(".");
        var path = name[0] + "-id" + fruta.dataValues.id;
        var url_cloudinary;

        cloudinary.v2.uploader.upload(req.files.url.path, {
            public_id: path,
            tags: ['fruta', 'proyecto-final']
          },
          function (error, result) {
            url_cloudinary = result.url;
            console.log(url_cloudinary);
            console.log(result, error);
            return fruta
              .update({
                nombre: req.body.nombre || fruta.nombre,
                url: url_cloudinary || fruta.url,
                valor: req.body.valor || fruta.valor,
                categoriaid: req.body.categoriaid,
                preguntaid: req.body.preguntaid
              })
              .then(() => res.redirect('back')) // Send back the updated fruta.
              .catch((error) => res.status(400).send(error));
          });
      })
      .catch(error => res.status(400).send(error));
  },
  getfruitCount(req, res) {
    return Fruta
      .findAll({
        attributes: [
          [Sequelize.literal('COUNT(DISTINCT(id))'), 'countOfFruits']
        ]
      })
      .then(fruta => res.status(200).send(fruta))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Fruta
      .findAll({
        attributes: ['id', 'nombre', 'url', 'categoriaid', 'preguntaid']
      })
      .then(fruta => res.status(200).send(fruta))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Categoria
      .findByPk(req.params.categoriaid, {
        include: [{
          model: Fruta,
          as: 'frutas',
        }],
      })
      .then(categoria => {
        if (!categoria) {
          return res.status(404).send({
            message: 'Categoria de fruta Not Found',
          });
        }
        return res.status(200).send(categoria);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Fruta
      .findByPk(req.params.id)
      .then(fruta => {
        if (!fruta) {
          return res.status(404).send({
            message: 'Fruta No Encontrado',
          });
        }
        var name = req.files.url.originalFilename.split(".");
        var path = name[0] + "-id" + fruta.dataValues.id;
        var url_cloudinary;

        cloudinary.v2.uploader.upload(req.files.url.path, {
            public_id: path,
            tags: ['fruta', 'proyecto-final']
          },
          function (error, result) {
            url_cloudinary = result.url;
            console.log(url_cloudinary);
            console.log(result, error);
            return fruta
              .update({
                nombre: req.body.nombre || fruta.nombre,
                url: url_cloudinary || fruta.url,
                valor: req.body.valor || fruta.valor,
                categoriaid: req.body.categoriaid,
                preguntaid: req.body.preguntaid
              })

              .then(() => res.redirect('back'))
              .catch(error => res.status(400).send(error));
          });

      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Fruta
      .findByPk(req.params.id)
      .then(fruta => {
        if (!fruta) {
          return res.status(404).send({
            message: 'Fruta No Encontrada',
          });
        }
        return fruta
          .destroy()
          .then(() => res.status(204).send('Fruta eliminada exitosamente'))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};