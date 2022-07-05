const { DataTypes } = require('sequelize');
const _creators = require('./creators');

function initModels(sequelize) {
  const creators = _creators(sequelize, DataTypes);

  return {
    creators,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
