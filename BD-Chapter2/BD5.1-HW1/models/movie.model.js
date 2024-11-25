let {DataTypes , sequelize} = require("../lib/");
let movie = sequelize.define("movie", {
  name : DataTypes.TEXT ,
  genre : DataTypes.TEXT ,
  imdb_rating : DataTypes.REAL,
  year : DataTypes.INTEGER,
  director : DataTypes.TEXT,
  earning : DataTypes.REAL,
})

module.exports = {
  movie ,
}
