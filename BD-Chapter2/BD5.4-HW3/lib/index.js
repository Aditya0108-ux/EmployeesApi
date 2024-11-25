let sq = require("sequelize")
let sequelize = new sq.Sequelize({
  dialect : "sqlite",
  storage : "./chef_database.sqlite",
})
module.exports = {
  DataTypes : sq.DataTypes , sequelize
}