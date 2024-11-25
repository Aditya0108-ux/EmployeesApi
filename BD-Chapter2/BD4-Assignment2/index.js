/* we will build a backend for a Gaming Community Platform using raw SQL queries for reading data. This system will allow users to search for games, players, and tournaments based on various filters and sorting options. By the end of this lesson, you will have learned how to:

Write raw SQL queries to read data from a database.

Implement various filtering and sorting options.

Retrieve details of specific games, players, and tournaments. */

const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const PORT = process.env.port || 3000;
let db;

(async () => {
  db = await open({
    filename: 'games_database.sqlite',
    driver: sqlite3.Database,
  });
})();

/* Exercise 1: Get All Games 
http://localhost:3000/games */

async function fetchAllGames() {
  let query = 'SELECT * from games';
  let response = await db.all(query, []);
  return {
    games: response,
  };
}

app.get('/games', async (req, res) => {
  try {
    let results = await fetchAllGames();
    if (results.games.length === 0) {
      return res.status(404).message({ message: 'No games found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 2: Get Game by ID
 http://localhost:3000/games/details/1 */

async function fetchGameById(id) {
  let query = 'SELECT * from games WHERE id = ?';
  let response = await db.all(query, [id]);
  return {
    games: response,
  };
}

app.get('/games/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let results = await fetchGameById(id);
    if (results.games.length === 0) {
      return res
        .status(404)
        .message({ message: 'No games found for the id : ' + id });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 3: Get Games by Genre
http://localhost:3000/games/genre/FPS */

async function fetchGameByGenre(genre) {
  let query = 'SELECT * from games WHERE genre = ?';
  let response = await db.all(query, [genre]);
  return {
    games: response,
  };
}

app.get('/games/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  try {
    let results = await fetchGameByGenre(genre);
    if (results.games.length === 0) {
      return res
        .status(404)
        .message({ message: 'No games found for the genre : ' + genre });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 4: Get Games by Platform
http://localhost:3000/games/platform/PC */

async function fetchGameByPlatform(platform) {
  let query = 'SELECT * from games WHERE platform = ?';
  let response = await db.all(query, [platform]);
  return {
    games: response,
  };
}

app.get('/games/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let results = await fetchGameByPlatform(platform);
    if (results.games.length === 0) {
      return res
        .status(404)
        .message({ message: 'No games found for the platform : ' + platform });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 5: Get Games Sorted by Rating
http://localhost:3000/games/sort-by-rating */

async function sortGameByRating() {
  let query = 'SELECT * from games ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { games: response };
}

app.get('/games/sort-by-rating', async (req, res) => {
  try {
    let results = await sortGameByRating();
    if (results.games.length === 0) {
      return res
        .status(404)
        .json({ message: 'No games found from high to low order' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 6: Get All Players
http://localhost:3000/players */

async function fetchAllPlayers() {
  let query = 'SELECT * from players';
  let response = await db.all(query, []);
  return {
    players: response,
  };
}

app.get('/players', async (req, res) => {
  try {
    let results = await fetchAllPlayers();
    if (results.players.length === 0) {
      return res.status(404).message({ message: 'No players found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 7: Get Player by ID
http://localhost:3000/players/details/1 */

async function fetchPlayerById(id) {
  let query = 'SELECT * from players WHERE id = ?';
  let response = await db.all(query, [id]);
  return {
    players: response,
  };
}

app.get('/players/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let results = await fetchPlayerById(id);
    if (results.players.length === 0) {
      return res
        .status(404)
        .message({ message: 'No players found for the id : ' + id });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 8: Get Players by Platform
http://localhost:3000/players/platform/PC */

async function fetchPlayerByPlatform(platform) {
  let query = 'SELECT * from players WHERE platform = ?';
  let response = await db.all(query, [platform]);
  return {
    players: response,
  };
}

app.get('/players/platform/:platform', async (req, res) => {
  let platform = req.params.platform;
  try {
    let results = await fetchPlayerByPlatform(platform);
    if (results.players.length === 0) {
      return res.status(404).message({
        message: 'No players found for the platform : ' + platform,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 9: Get Players Sorted by Rating 
http://localhost:3000/players/sort-by-rating */

async function sortPlayerByRating() {
  let query = 'SELECT * from players ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { players: response };
}

app.get('/players/sort-by-rating', async (req, res) => {
  try {
    let results = await sortPlayerByRating();
    if (results.players.length === 0) {
      return res
        .status(404)
        .json({ message: 'No players found from rating high to low' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 10: Get All Tournaments
http://localhost:3000/tournaments */

async function fetchAllTournaments() {
  let query = 'SELECT * from tournaments';
  let response = await db.all(query, []);
  return {
    tournaments: response,
  };
}

app.get('/tournaments', async (req, res) => {
  try {
    let results = await fetchAllTournaments();
    if (results.tournaments.length === 0) {
      return res.status(404).message({ message: 'No tournaments found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 11: Get Tournament by ID
http://localhost:3000/tournaments/details/1 */

async function fetchTournamentById(id) {
  let query = 'SELECT * from players WHERE id = ?';
  let response = await db.all(query, [id]);
  return {
    tournaments: response,
  };
}

app.get('/players/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let results = await fetchPlayerById(id);
    if (results.players.length === 0) {
      return res
        .status(404)
        .message({ message: 'No players found for the id : ' + id });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 12: Get Tournaments by Game ID
http://localhost:3000/tournaments/game/1 */

async function fetchTournamentByGameId(gameId) {
  let query = 'SELECT * from tournaments WHERE gameId = ?';
  let response = await db.all(query, [gameId]);
  return { tournaments: response };
}

app.get('/tournaments/game/:gameId', async (req, res) => {
  let gameId = req.params.gameId;
  try {
    let results = await fetchTournamentByGameId(gameId);
    if (results.tournaments.length === 0) {
      return res
        .status(404)
        .json({ message: 'No tournaments found for the gameId : ' + gameId });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 13: Get Tournaments Sorted by Prize Pool
http://localhost:3000/tournaments/sort-by-prize-pool */

async function sortTournamentsByPrizePool() {
  let query = 'SELECT * from tournaments ORDER BY prizePool DESC';
  let response = await db.all(query, []);
  return { tournaments: response };
}

app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    let results = await sortTournamentsByPrizePool();
    if (results.tournaments.length === 0) {
      return res.status(404).json({
        message: 'No touraments sorted by prize pool from high to low',
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost : ${PORT}`);
});
