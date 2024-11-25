const sqlite3 = require("sqlite3").verbose();

//Connect to the SQLite Database
const db = new sqlite3.Database("./games_database.sqlite", (err) => {
  if (err) {
    console.error("Error opening the Database", err.message);
  } else {
    console.log("Connected to the SQLite Database");
  }
});

const games = [
  { id: 1, title: "Valorant", genre: "FPS", platform: "PC", rating: 4.5 },
  {
    id: 2,
    title: "FIFA 22",
    genre: "Sports",
    platform: "Console",
    rating: 4.2,
  },
  { id: 3, title: "Among Us", genre: "Party", platform: "Mobile", rating: 4.0 },
];

const players = [
  {
    id: 1,
    name: "Akash Gupta",
    username: "AkashGamer",
    platform: "PC",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Rohit Kumar",
    username: "RohitPlayz",
    platform: "Console",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Sneh Singh",
    username: "SnehWins",
    platform: "Mobile",
    rating: 4.6,
  },
];

const tournaments = [
  {
    id: 1,
    gameId: "1",
    name: "Valorant Championship",
    date: "2022-12-01",
    prizePool: 5000,
  },
  {
    id: 2,
    gameId: "2",
    name: "FIFA World Cup",
    date: "2022-11-15",
    prizePool: 3000,
  },
  {
    id: 3,
    gameId: "3",
    name: "Among  Us Showdown",
    date: "2022-10-20",
    prizePool: 2000,
  },
];

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT , genre TEXT , platform TEXT , rating REAL)`,
    (err) => {
      if (err) {
        console.error("Error creating table : ", err.message);
      } else {
        console.log("Games table created or already exists.");
      }
    },
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT , username TEXT , platform TEXT , rating REAL)`,
    (err) => {
      if (err) {
        console.error("Error creating the table:", err.message);
      } else {
        console.log("Players table created or already exists");
      }
    },
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS tournaments (id INTEGER PRIMARY KEY AUTOINCREMENT,
    gameId TEXT , name TEXT , date TEXT , prizePool INTREGER)`,
    (err) => {
      if (err) {
        console.error("Error creating the table:", err.message);
      } else {
        console.log("Tournaments table created or already exists");
      }
    },
  );

  const stmt = db.prepare(
    "INSERT INTO games(title , genre , platform , rating) VALUES(?,?,?,?)",
  );

  const stmt1 = db.prepare(
    "INSERT INTO players(name , username , platform, rating) VALUES(?,?,?,?)",
  );

  const stmt2 = db.prepare(
    "INSERT INTO tournaments(gameId,name,date,prizePool) VALUES(?,?,?,?)",
  );

  for (let game of games) {
    stmt.run(game.title, game.genre, game.platform, game.rating);
  }
  for (let player of players) {
    stmt1.run(player.name, player.username, player.platform, player.rating);
  }
  for (let tournament of tournaments) {
    stmt2.run(
      tournament.gameId,
      tournament.name,
      tournament.date,
      tournament.prizePool,
    );
  }

  stmt.finalize();
  stmt1.finalize();
  stmt2.finalize();

  console.log("Inserted 3 games into the database");
  console.log("Inserted 3 players into the database");
  console.log("Inserted 3 tournaments into the database");

  //close the database connection
  db.close((err) => {
    if (err) {
      console.error("Error closing the database:", err.message);
    } else {
      console.log("Database connection closed");
    }
  });
});
