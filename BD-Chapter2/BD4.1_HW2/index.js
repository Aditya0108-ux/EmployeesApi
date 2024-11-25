let express = require("express");
let app = express();
let sqlite3 = require("sqlite3").verbose();
let { open } = require("sqlite");
let PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename : "tracks_database.sqlite",
    driver : sqlite3.Database,
  });
  })();

app.get("/", (req , res) => {
     res.status(200).json({message : "Welcome to the Track Database"});
  })

/* Exercise 1: Retrieve All Tracks
http://localhost:3000/tracks */

async function fetchAllTracks(){
   let query = "SELECT * from tracks";
   let response = await db.all(query, []);
       return {tracks : response};
}

app.get("/tracks", async (req , res) => {
        let results =await fetchAllTracks();
         res.status(200).json(results);
});

/* Exercise 2: Retrieve Tracks by Artist
http://localhost:3000/tracks/artist/Arijit%20Singh */

async function fetchTracksByArtist(artist){
     let query = "SELECT * from tracks WHERE artist = ?";
     let response = await db.all(query , [artist]);
        return {tracks : response};
}

app.get("/tracks/artist/:artist", async (req , res) => {
           let artist = req.params.artist;
            let results = await fetchTracksByArtist(artist);
             res.status(200).json(results);
})

/* Exercise 3: Retrieve Tracks by Genre
http://localhost:3000/tracks/genre/Romantic */

async function fetchTracksByGenre(genre){
    let query = "SELECT * from tracks WHERE genre = ?";
    let response = await db.all(query , [genre]);
    return {tracks : response};
}

app.get("/tracks/genre/:genre", async (req , res) => {
          let genre = req.params.genre;
          let results = await fetchTracksByGenre(genre);
           res.status(200).json(results);
})

/* Exercise 4: Retrieve Tracks by Release Year
http://localhost:3000/tracks/release_year/2019 */

async function fetchTracksByReleaseYear(release_year){
     let query = "SELECT * from tracks WHERE release_year = ?";
       let response = await db.all(query , [release_year]);
        return {tracks : response};
}

app.get("/tracks/release_year/:year", async (req , res)=> {
       let release_year = req.params.year;
        let results = await fetchTracksByReleaseYear(release_year);
         res.status(200).json(results);
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


