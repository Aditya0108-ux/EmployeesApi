let sq = require("sequelize");
let sequelize = new sq.Sequelize({
   dialect : "sqlite",
  storage : "./books_database.sqlite"
});

module.exports = { DataTypes : sq.DataTypes , sequelize };


