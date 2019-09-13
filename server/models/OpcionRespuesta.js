module.exports = (sequelize, DataTypes) => {
  const OpcionRespuesta = sequelize.define('OpcionRespuesta', {
    descripcion:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    idPregunta:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    respuestaValida:{
      type:DataTypes.BOOLEAN,
      allowNull: false,
    }     
  }, {
    freezeTableName: true
  });

  OpcionRespuesta.associate = function(models) {
    OpcionRespuesta.belongsTo(models.Pregunta, {
      foreignKey: 'idPregunta',
      onDelete: 'CASCADE'
    });
  };

  return OpcionRespuesta;

};