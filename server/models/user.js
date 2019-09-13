const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    puntaje:{
      type: DataTypes.INTEGER
    }
  }, {
    freezeTableName: true
  }, {
    freezeTableName: true,
    instanceMethods: {
      generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });

  User.prototype.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  return User;
};