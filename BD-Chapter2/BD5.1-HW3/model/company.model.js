let { DataTypes , sequelize} = require("../lib/");
let company = sequelize.define("company" , {
  name : DataTypes.TEXT ,
  industry : DataTypes.TEXT ,
  founded_year : DataTypes.INTEGER,
  headquarters : DataTypes.TEXT, 
  revenue : DataTypes.INTEGER,
  employee_count : DataTypes.INTEGER,
})

module.exports = {
  company , 
}
