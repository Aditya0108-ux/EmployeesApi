let express = require("express");
let app = express();
let { track } = require("./models/track.model");
let { sequelize} =  require("./lib");
let { user } = require("./models/user.model")
let {like } = require("./models/like.model")
let { Op } = require("@sequelize/core")

app.use(express.json())

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
        try {
            await sequelize.sync({ force : true});
          await track.bulkCreate(songsData);
          await user.create(
            {
              username: 'testuser',
              email: 'testuser@gmail.com',
              password: 'testuser',
            }
          )
           res.status(200).json({message : "Database Seeding Successful"});
        } catch (error) {
          res.status(500).json({ message : "Error seeding the data ", error : error.message});
        }
})

/* Exercise 1: Like a Track
http://localhost:3000/users/1/like?trackId=2 */

async function likeTrack(data){
  let newLike = await like.create({
    userId : data.userId,
    trackId : data.trackId,
 })
  return {message : "Track Liked", newLike}
  
}

app.get("/users/:id/like", async (req , res) => {
         try {
           let userId = req.params.id
           let trackId = req.query.trackId;
           let response = await likeTrack({userId , trackId})
           return res.status(200).json(response)
         } catch (error) {
            res.status(500).json({error : error.message})
         }
}) 

/* Exercise 2: Dislike a Track
http://localhost:3000/users/1/dislike?trackId=2 */


async function dislikeTrack(data){
  let count = await like.destroy({where : {
      userId : data.userId,
      trackId : data.trackId,
  }});

  if(count === 0) return {};
  
  return {message : "Track Disliked"};
  }

app.get("/users/:id/dislike", async (req , res) => {
  try {
    let userId = req.params.id;
    let trackId = req.query.trackId;
    let response = await dislikeTrack({userId , trackId});
    if(!response.message){
      res.status(404).json({message : "This track is not in your liked list"});
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({error : error.message})
  }
});

/* Exercise 3: Get All Liked Tracks
http://localhost:3000/users/1/liked */


async function getAllLikedTracks(userId){
  let trackIds = await like.findAll({
    where : {userId},
    attributes : ["trackId"],
  });
  //console.log(trackIds);

  let trackRecords = []
  for(let i=0; i<trackIds.length;i++){
    trackRecords.push(trackIds[i].trackId);
  }
  //console.log(trackRecords);

  let likedTracks = await track.findAll({
    where : { id : { [Op.in] : trackRecords}},
  })
   return { likedTracks };
}

app.get("/users/:id/liked", async (req , res) => {
  try {
    let userId = req.params.id;
    let response = await getAllLikedTracks(userId);
    if(response.likedTracks.length === 0){
     return res.status(404).json({ message : "No liked tracks found."});
    }
    res.status(200).json(response)
  } catch (error){
    res.status(500).json({error : error.message});
  }
})

/* Exercise 4: Get All Liked Tracks by Artist
http://localhost:3000/users/1/liked-artist?artist=Arijit%20Singh */


async function getAllLikedTracksByArtist(userId , artist){
  let trackIds = await like.findAll({
    where : {userId},
    attributes : ["trackId"]
  })
  let trackRecords = []
  for(let i=0; i<trackIds.length;i++){
    trackRecords.push(trackIds[i].trackId);
  }

  let likedTracks = await track.findAll({
    where : { id : { [Op.in ] : trackRecords } , artist },
  });

  return { likedTracks };
  
}

app.get("/users/:id/liked-artists" , async (req ,res) => {
  try {
    let userId = req.params.id;
    let artist = req.query.artist;
    let response = await getAllLikedTracksByArtist(userId , artist);
    if(response.likedTracks.length === 0){
      return res.status(404).json({message : "No liked tracks found for the artist :" + artist});
    }
    res.status(200).json(response);
  } catch(error){
    res.status(500).json({error : error.message});
  }
})

app.listen(3000 , () => {
  console.log(`Server is running on http://localhost : ${3000}`);
});