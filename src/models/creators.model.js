module.exports = (sequelize, DataTypes) => {
  const Creators = sequelize.define('creators', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    of_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    photos_count: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    profile_json: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'creators',
    timestamps: false
  });
  return Creators;
};
