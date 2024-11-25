let {DataTypes , sequelize } = require("../lib")
const { track } = require("./track.model");
const { user } = require("./user.model")

let like = sequelize.define("like", {
  userId : {
    type : DataTypes.INTEGER,
    references : {
      model : user,
      key : "id",
    }
  }, 
  trackId : {
    type : DataTypes.INTEGER,
    references : {
      model : track ,
      key : "id",
    }
  }
});
user.belongsToMany(track, {through : like })
track.belongsToMany(user , {through : like})
module.exports = { like }