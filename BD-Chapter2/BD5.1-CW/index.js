/* Sequelize Installation & Setup

Install the following packages from the Dependencies tab in Replit

express, sequelize , sqlite3

Create a folder named lib and create a file inside this folder named index.js

Create a sequelize instance

Export both sequelize instance and DataTypes which will be used to create models in the next step

Creating Models

Create a folder named models and create a file inside this folder named employee.model.js

Import the sequelize instance & DataTypes from the /lib/index.js file

Define a model named employee with the columns name as TEXT, department as TEXT, salary as INTEGER, designation as TEXT

Export the model from the file

Seeding the database with data

Create an express server with an endpoint /seed_db which will seed the database with dummy data

Declare a variable named employees which will contain an array of objects with dummy employees.

Populate the variable employees with dummy employee data

Use the model employee and bulkCreate method to seed dummy data into the database file whenever the user visits the /seed_db endpoint*/
let express = require("express");
let app = express();
let { track } = require("./models/track.model");
let { sequelize} =  require("./lib/index");

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
           res.status(200).json({message : "Database Seeding Successful"});
        } catch (error) {
          res.status(500).json({ message : "Error seeding the data ", error : error.message});
        }
})

app.listen(3000 , () => {
  console.log(`Server is running on http://localhost : ${3000}`);
});