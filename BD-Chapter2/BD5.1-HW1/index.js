let express = require("express");
let app = express();
let { movie } = require("./models/movie.model");
let { sequelize } = require("./lib/index");


let movieData = [
  {
    name : "Drishyam 2",
    genre : "Suspense",
    imdb_rating : 8.2,
    year : 2022,
    director : "Abhishek Pathak",
    earning : "342.1cr",
  },
  {
     name : "Bahubali 2 : The Conclusion",
    genre : "Action",
    imdb_rating : 8.4,
    year : 2014,
    director : "S. S. Rajamouli",
    earning : "1000cr",
  }, 
  {
    name : "KGF : Chapter 2",
    genre : "Action",
    imdb_rating : 8.2,
    year : 2022,
    director : "Prashanth Neel",
    earning : "1300cr"
  },
  {
    name : "Secret Superstar",
    genre : "Comedy",
    imdb_rating : 7.8,
    year : 2017,
    director : "Advait Chandan",
    earning : "830.8cr"
  },
  {
    name : "Sanju",
    genre : "Comedy",
    imdb_rating : 7.6,
    year : 2018,
    director : "Rajkumar Hirani",
    earning : "580.1cr"
  },
  {
    name : "Kabir Singh",
    genre : "Romance",
    imdb_rating : 7.0,
    year : 2019,
    director : "Sandeep Reddy Vanga",
    earning : "373.8cr"
  },
  {
    name : "Stree 2",
    genre : "Horror",
    imdb_rating : 7.4,
    year : 2024,
    director : "Amar Kaushik",
    earning : "847.1cr"
  }
  
  ]

app.get("/seed_db", async (req , res) => {
    try{
      await sequelize.sync({force : true});
      await movie.bulkCreate(movieData);
      res.status(200).json({message : "Database Seeding Successful"});
     } catch(error){
      res.status(500).json({message : "Error Seeding the data", error : error.message});
     }
})

app.listen(3000 , () => {
  console.log(`Server is running on http://localhost : 3000`);
})