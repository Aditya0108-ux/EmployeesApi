let { DataTypes , sequelize} = require("../lib/")
let employee = sequelize.define("employee" , {
      name : DataTypes.TEXT,
      salary : DataTypes.INTEGER, 
      department : DataTypes.TEXT,
      designation : DataTypes.TEXT,
})

module.exports = {
   employee , 
}