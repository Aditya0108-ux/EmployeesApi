let express = require("express");
let { book } = require("./model/book.model");
let { sequelize } = require("./lib/index");
let app = express();

let books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    publication_year: 1960,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publication_year: 1949,
  },
  {
    id: 3,
    
    title: "Animal Farm",
    author: "George Orwell",
    genre: "Political Satire",
    publication_year: 1945,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Fiction",
    publication_year: 1813,
  },
  {
    id: 5,
    title: "Green Eggs and Ham",
    author: "Dr. Seuss",
    genre: "Children's literature",
    publication_year: 1960,
  },
];

app.get("/seed_db", async (req , res) => {
    try {
      await sequelize.sync({force : true});
      await book.bulkCreate(books);
      res.status(200).json({message : "Database Seeding Suceessful"});
      } catch(error){
      res.status(500).json({message : "Error Seeding the data" , error : error.message});
      }
});


app.listen(3000 , () => {
   console.log(`Server is running on http://localhost : 3000`);
})
