let { DataTypes , sequelize } = require("../lib/")
let book = require("./book.model")
let author = require("./author.model")

let bookAuthor = sequelize.define("bookAuthor", {
    bookId : {
      type : DataTypes.INTEGER,
       references : {
         model : book,
         keys : "id"
       }
    },
      
  authorId : {
  type : DataTypes.INTEGER,
    references : {
      model : author,
      keys : "id",
    }
  }
})

author.belongsToMany(book , {through : bookAuthor})
book.belongsToMany(author , {through : bookAuthor})
module.exports = {
  bookAuthor,
}