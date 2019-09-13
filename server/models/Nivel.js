module.exports = (sequelize, DataTypes) => {
  const Nivel = sequelize.define('Nivel', {
    descripcion:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoriaid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    freezeTableName: true
  });

  Nivel.associate = (models) => {
    Nivel.belongsTo(models.Categoria, {
      foreignKey: 'categoriaid',    
      onDelete: 'CASCADE', 
    });
  };

  Nivel.associate = function(models) {
    Nivel.hasMany(models.Pregunta, {
      foreignKey:'idnivel',
      as:'preguntas'    
    });
  };

  return Nivel;

};