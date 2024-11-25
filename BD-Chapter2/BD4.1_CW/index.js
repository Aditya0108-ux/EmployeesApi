let express = require("express");
let cors = require('cors');
let sqlite3 = require("sqlite3").verbose();
let { open } = require("sqlite");

let app = express();
app.use(cors());
app.use(express.json());
let PORT = process.env.PORT || 3000;
let db;

// Connect to SQLite database
(async () => {
  db = await open({ filename: "database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();

/* Exercise 1: Fetch all movies
http://localhost:3000/movies */

async function fetchAllMovies(){
  let query = 'SELECT * from movies';
  let response = await db.all(query , []);
   return {movies : response};
} 

app.get("/movies", async (req, res) => {
    let results = await fetchAllMovies();
     res.status(200).json(results);
});

/* Exercise 2: Fetch all movies by genre
http://localhost:3000/movies/genre/Biography */

async function fetchMovieByGenre(genre){
   let query = "SELECT * from movies WHERE genre = ?";
    let response = await db.all(query,[genre]);
     return {movies : response};
}

app.get('/movies/genre/:genre',async (req , res) => {
        let genre = req.params.genre;
         let results = await fetchMovieByGenre(genre);
           res.status(200).json(results);
})

/* Exercise 3: Fetch movie details by ID
http://localhost:3000/movies/details/3 */

async function fetchMovieDetailsById(id){
    let query = "SELECT * from movies WHERE id = ?";
    let response = await db.all(query,[id]);
      return {movies : response};
}

app.get('/movies/details/:id', async (req , res) => {
         let id = req.params.id;
         let results = await fetchMovieDetailsById(id);
            res.status(200).json(results);
})

/* Exercise 4: Fetch movie details by release_year
http://localhost:3000/movies/release_year/2016 */

async function fetchMoviesByYear(release_year){
         let query = "SELECT * from movies WHERE release_year = ?";
         let response = await db.all(query, [release_year]);
          return {movie : response};
}

app.get('/movies/release_year/:year',async (req , res) => {
              let release_year = req.params.year;
              let results = await fetchMoviesByYear(release_year);
                res.status(200).json(results);
})



// YOUR ENPOINTS GO HERE

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
