const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "books_database.sqlite",
    driver: sqlite3.Database,
  });
})();



// YOUR ENDPOINTS GO HERE

/* Exercise 1: Fetch All Books
http://localhost:3000/books */

async function fetchAllBooks(){
      let query = "SELECT * from books";
      let response = await db.all(query, []);
       return {books : response};
}

app.get("/books", async (req , res) => {
     let results = await fetchAllBooks();
       res.status(200).json(results);
})

/* Exercise 2: Fetch Books by Author
http://localhost:3000/books/author/George%20Orwell */

async function filterBookByAuthor(author){
     let query = "SELECT * from books WHERE author = ?";
     let response = await db.all(query , [author]);
      return {books : response};
}

app.get('/books/author/:author', async (req , res) => {
     let author = req.params.author;
      let results = await filterBookByAuthor(author);
        res.status(200).json(results);
})

/* Exercise 3: Fetch Books by Genre 
http://localhost:3000/books/genre/Fiction */

async function fetchBooksByGenre(genre){
  let query = "SELECT * from books WHERE genre = ?";
   let response = await db.all(query , [genre]);
   return {books : response}
}

app.get('/books/genre/:genre', async (req , res)=> {
        let genre = req.params.genre;
        let results = await fetchBooksByGenre(genre);
          res.status(200).json(results);
})

/* Exercise 4: Fetch Books by Publication Year
http://localhost:3000/books/publication_year/1960 */

async function fetchBooksByYear(year){
  let query = "SELECT * from books WHERE publication_year = ?";
  let response = await db.all(query , [year]);
  return {books : response};
}

app.get('/books/publication_year/:year',async (req , res) => {
         let year = req.params.year;
         let results = await fetchBooksByYear(year);
          res.status(200).json(results);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
