module.exports = (sequelize, DataTypes) => {
  const Promo = sequelize.define('promo', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    username_of: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isPromoted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'promo',
    timestamps: false
  });
  return Promo;
};
