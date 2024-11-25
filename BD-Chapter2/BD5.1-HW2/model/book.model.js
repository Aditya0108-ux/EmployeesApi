let { DataTypes , sequelize} = require("../lib/");
let book = sequelize.define("book", {
    title : DataTypes.TEXT ,
      author : DataTypes.TEXT,
  genre : DataTypes.TEXT,
  publication_year : DataTypes.INTEGER,
});

module.exports = {
  book ,
}