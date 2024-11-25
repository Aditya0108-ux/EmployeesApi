let express = require("express");
let { sequelize } = require("./lib/index");
let { track } = require("./model/track.model")


let app = express();

let songsData = [
  {
    name: 'Raabta',
    genre: 'Romantic',
    release_year: 2012,
    artist: 'Arijit Singh',
    album: 'Agent Vinod',
    duration: 4,
  },
  {
    name: 'Naina Da Kya Kasoor',
    genre: 'Pop',
    release_year: 2018,
    artist: 'Amit Trivedi',
    album: 'Andhadhun',
    duration: 3,
  },
  {
    name: 'Ghoomar',
    genre: 'Traditional',
    release_year: 2018,
    artist: 'Shreya Ghoshal',
    album: 'Padmaavat',
    duration: 3,
  },
  {
    name: 'Bekhayali',
    genre: 'Rock',
    release_year: 2019,
    artist: 'Sachet Tandon',
    album: 'Kabir Singh',
    duration: 6,
  },
  {
    name: 'Hawa Banke',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Darshan Raval',
    album: 'Hawa Banke (Single)',
    duration: 3,
  },
  {
    name: 'Ghungroo',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'War',
    duration: 5,
  },
  {
    name: 'Makhna',
    genre: 'Hip-Hop',
    release_year: 2019,
    artist: 'Tanishk Bagchi',
    album: 'Drive',
    duration: 3,
  },
  {
    name: 'Tera Ban Jaunga',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Tulsi Kumar',
    album: 'Kabir Singh',
    duration: 3,
  },
  {
    name: 'First Class',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 4,
  },
  {
    name: 'Kalank Title Track',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 5,
  },
]

app.get("/seed_db", async (req , res) => {
    try{
          await sequelize.sync({force : true})
          await track.bulkCreate(songsData);
          res.status(200).json({
            message : "Database Seeding Successful"
          })
      
    } catch(error){
      res.status(500).json({
        message : "Error Seeding the data",
        error : error.message
      })
    }
})

/* Exercise 1: Fetch all tracks
http://localhost:3000/tracks */


async function fetchAllTracks(){
    let tracks = await track.findAll();
    return { tracks };
}

app.get("/tracks", async (req , res) => {
       try {
       let result = await fetchAllTracks();
        if(result.tracks.length === 0){
          return res.status(404).json({message : "No tracks found"});
        }
         res.status(200).json(result);
       } catch(error){
         res.status(500).json({error : error.message});
       }
})

/* Exercise 2: Fetch track details by ID 
http://localhost:3000/tracks/details/2 */

async function fetchTrackById(id){
   let trackData = await track.findOne({where : {id}});
    return { track : trackData};
}

app.get("/tracks/details/:id", async (req , res) => {
    let id = req.params.id;
    try {
      let result = await fetchTrackById(id);
      if(result.track.length === 0){
        return res.status(404).json({message : "No track found for the id : " + id});
      }
      res.status(200).json(result);
    } catch(error){
      res.status(500).json({error : error.message});
    }
})

/* Exercise 3: Fetch all tracks by an artist
http://localhost:3000/tracks/artist/Arijit%20Singh */

async function fetchTracksByArtist(artist){
     let tracks = await track.findAll({where : {artist}});
     return { tracks};
} 

app.get("/tracks/artist/:artist", async (req , res) => {
     let artist = req.params.artist;
  try {
     let result = await fetchTracksByArtist(artist);
      if(result.tracks.length === 0){
        return res.status(404).json({message : "No tracks found for the artist : " + artist});
      }
      res.status(200).json(result);
  } catch(error){
    res.status(500).json({error : error.message});
  }
});

/* Exercise 4: Sort all the tracks by their release year
http://localhost:3000/tracks/sort/release_year?order=desc */

async function sortTrackByReleaseYear(order){
    let sortedTracks = await track.findAll({ order : [["release_year" , order]] });
  return { tracks : sortedTracks };
}
app.get("/tracks/sort/release_year" , async (req , res) => {
  let order = req.query.order;
  try {
    let result = await sortTrackByReleaseYear(order);
    if(result.tracks.length === 0){
     return res.status(404).json({message : "No tracks found for the tracks sorted in " + order + " order"});
    }
    res.status(200).json(result);
  } catch (error){
    return res.status(500).json({error : error.message});
  }
})

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
})
