let {DataTypes , sequelize } = require("../lib/")
const dish = require("./dish.model")
const { chef } = require("./chef.model")
let chefDish = new sequelize.define("chefDish", {
  dishId : {
  type : DataTypes.INTEGER,
  references : {
    model : dish,
    keys : "id",
  }
  },
  chefId : { 
  type : DataTypes.INTEGER,
  references : {
    model : chef,
    keys : "id",
    }
  }
})
dish.belongsToMany(chef ,{through : chefDish})
chef.belongsToMany(dish ,{through : chefDish})

module.exports = {
  chefDish,
}