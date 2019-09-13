module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    freezeTableName:true
  });
  
  Categoria.associate = (models) => {
    Categoria.hasMany(models.Fruta, {
      foreignKey: 'categoriaid',
      as: 'frutas',
    });
  };

  return Categoria;
};