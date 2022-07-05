const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize('postgresql://postgres:F6aZF4*En&p%5EaAH@95.216.205.114/OnlyFans');
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.creators = require('./creators.model')(sequelize, Sequelize);
db.promo = require('./promo.model')(sequelize, Sequelize);

module.exports = db;
