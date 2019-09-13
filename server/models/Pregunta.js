module.exports = (sequelize, DataTypes) => {
  const Pregunta = sequelize.define('Pregunta', {
    idnivel:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    freezeTableName: true
  });

  Pregunta.associate = function(models) {
    Pregunta.belongsTo(models.Nivel, {
      foreignKey:'idnivel',  
    });
   
    Pregunta.hasMany(models.OpcionRespuesta, {
      foreignKey: 'idPregunta',
      as: 'opcionRespuesta',
    });


  };

  return Pregunta;
};