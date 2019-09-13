module.exports = (sequelize, DataTypes) => {
  const Puntaje = sequelize.define('Puntaje', {
    idFruta:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    idPregunta:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valorPuntaje:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    freezeTableName: true
  });

  Puntaje.associate = function(models) {
    Puntaje.belongsTo(models.Pregunta, {
      foreignKey:'idPregunta',
      onDelete:'CASCADE'
    });

    Puntaje.belongsTo(models.Fruta, {
      foreignKey:'idFruta',
      onDelete:'CASCADE'
    });
  };

  return Puntaje;
};