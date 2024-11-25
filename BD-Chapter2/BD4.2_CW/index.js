/* Error - handling */
const express = require("express");
const app = express();

const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const PORT = process.env.PORT || 3000;

let db;
(async () => {
  db = await open({
     filename: "database.sqlite",
     driver: sqlite3.Database
   });
})();

/* Exercise 1: Get all movies
http://localhost:3000/movies */

async function fetchAllMovies(){
      let query = "SELECT * from movies";
      let response = await db.all(query, []);
        return {movies : response};
}

app.get("/movies", async (req , res) => {
  try{
    let results = await fetchAllMovies();
    if(results.movies.length === 0){
      return res.status(404).json({message : "No Movies found"});
    }
     res.status(200).json(results);
  }catch (error){
    return res.status(500).json({error : error.message});
  }
   
});

/* Exercise 2: Fetch movies by genre
http://localhost:3000/movies/genre/Biography */

async function fetchMoviesByGenre(genre){
        let query = "SELECT * from movies WHERE genre = ?";
        let response = await db.all(query , [genre]);
          return {movies : response};
}

app.get("/movies/genre/:genre",async (req , res) => {
     try {
          let genre = req.params.genre;
           let results = await fetchMoviesByGenre(genre);
            if(results.movies.length === 0){
              return res.status(404).json({message : "No Movies of this genre found"});
            }
            res.status(200).json(results);
     } catch (error){
       return res.status(500).json({error : error.message});
     }
});

/* Exercise 3: Fetch movie by ID
http://localhost:3000/movies/details/2 */

async function fetchMovieById(id){
  let query = "SELECT * from movies WHERE id = ?";
   let response = await db.all(query , [id]);
    return {movie : response};
}

app.get("/movies/details/:id", async (req , res) => {
     try {
          let id = req.params.id;
           let results = await fetchMovieById(id);
            if(results.movie === undefined){
              return res.status(404).json({message : "No Movie found by ID"});
              }
                 res.status(200).json(results);
     }   catch (error) {
          return res.status(500).json({error : error.message});
     }  
})

/* Exercise 4: Fetch movies by release year
http://localhost:3000/movies/release-year/2015 */

async function fetchMoviesByReleaseYear(year){
     let query = "SELECT * from movies WHERE release_year = ?";
     let response = await db.all(query , [year]);
      return {movies : response};
}

app.get("/movies/release_year/:year", async (req , res) => {
          try {
             let year = req.params.year;
               let results = await fetchMoviesByReleaseYear(year);
                if(results.movies.length === 0){
                     return res.status(404).json({message : "No Movies found by release year"});     
                }
            res.status(200).json(results);
          } catch (year) {
                  res.status(500).json({error : error.message});
          }
  
})




app.listen(PORT , () => {
       console.log("Server is running on port 3000" + PORT);
})
 

