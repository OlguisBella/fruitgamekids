const User = require('../models').User;
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

module.exports = {
  create(req, res) {
    return User
      .create({
        nombre: req.body.nombre,
        username: req.body.username,
        password: req.body.password,
        puntaje: '0'
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return User
      .findAll()
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User No Encontrado',
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    console.log("shdaskdasddjds-fj");
    return User
      .findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User No Encontrado',
          });
        }
        return user
          .update({
            nombre: req.body.nombre || user.nombre,
            username: req.body.username || user.username,
            password: req.body.password || user.password,
            puntaje: req.body.puntaje || user.puntaje
          })
          .then(() => res.status(200).send(user)) // Send back the updated user.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return User
      .findByPk(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User No Encontrado',
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  auth(req, res) {

    if (req.body.username === "aymen") {
      if (req.body.password === 123) {
        //if eveything is okey let's create our token 
        const payload = {
          check: true
        };
        var token = jwt.sign(payload, app.get('Secret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        res.json({
          message: 'authentication done ',
          token: token
        });
      } else {
        res.json({
          message: "please check your password !"
        })
      }
    } else {
      res.json({
        message: "user not found !"
      })
    }
  },
};