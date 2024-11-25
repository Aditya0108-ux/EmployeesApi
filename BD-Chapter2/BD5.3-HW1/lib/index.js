let sq = require("sequelize")
let sequelize = new sq.Sequelize({
   dialect : "sqlite", 
   storage : "./post_database"
})

module.exports = { DataTypes : sq.DataTypes , sequelize }
