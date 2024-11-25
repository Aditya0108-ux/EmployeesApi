/* we will build a backend for a food discovery app called 'FoodieFinds' using raw SQL queries for reading data. This system will allow users to search for restaurants and dishes based on various filters and sorting options. By the end of this lesson, you will have learned how to:

Write raw SQL queries to read data from a database.

Implement various filtering and sorting options.

Retrieve details of specific restaurants and dishes. */

const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const PORT = process.env.port || 3000;
let db;

(async () => {
  db = await open({
    filename: 'restaurants_database.sqlite',
    driver: sqlite3.Database,
  });
})();

/* Exercise 1: Get All Restaurants
http://localhost:3000/restaurants */

async function fetchAllRestaurants() {
  let query = 'SELECT * from restaurants';
  let response = await db.all(query, []);
  return { restaurants: response };
}

app.get('/restaurants', async (req, res) => {
  try {
    let results = await fetchAllRestaurants();
    if (results.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

/* Exercise 2: Get Restaurant by ID
http://localhost:3000/restaurants/details/1 */

async function fetchRestaurantsById(id) {
  let query = 'SELECT * FROM restaurants WHERE id = ?';
  let response = await db.all(query, [id]);
  return { restaurants: response };
}

app.get('/restaurants/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let results = await fetchRestaurantsById(id);
    if (results.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants found by Id' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 3: Get Restaurants by Cuisine
http://localhost:3000/restaurants/cuisine/Indian */

async function fetchRestaurantsByCuisine(cuisine) {
  let query = 'SELECT * FROM restaurants WHERE cuisine = ?';
  let response = await db.all(query, [cuisine]);
  return { restaurants: response };
}

app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    let results = await fetchRestaurantsByCuisine(cuisine);
    if (results.restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: 'No restaurants found for ' + cuisine + ' cuisine' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 4: Get Restaurants by Filter
http://localhost:3000/restaurants/filter?isVeg=true&hasOutdoorSeating=true&isLuxury=false */

async function fetchRestaurantsByFilter(isVeg, hasOutdoorSeating, isLuxury) {
  let query =
    'SELECT * from restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?';
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
}

app.get('/restaurants/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;
  try {
    let results = await fetchRestaurantsByFilter(
      isVeg,
      hasOutdoorSeating,
      isLuxury
    );
    if (results.restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: 'No restaurants found by the given filter' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 5: Get Restaurants Sorted by Rating
http://localhost:3000/restaurants/sort-by-rating */

async function sortByRating() {
  let query = 'SELECT * FROM restaurants ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { restaurants: response };
}

app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    let results = await sortByRating();
    if (results.restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: 'No restaurants sorted by rating high to low' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 6: Get All Dishes
http://localhost:3000/dishes */

async function fetchAllDishes() {
  let query = 'SELECT * FROM dishes';
  let response = await db.all(query, []);
  return { dishes: response };
}

app.get('/dishes', async (req, res) => {
  try {
    let results = await fetchAllDishes();
    if (results.dishes.length === 0) {
      return res.status(404).json({ message: 'No Dishes found' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

/* Exercise 7: Get Dish by ID
http://localhost:3000/dishes/details/1 */

async function fetchDishesById(id) {
  let query = 'SELECT * FROM dishes WHERE id = ?';
  let response = await db.all(query, [id]);
  return { dishes: response };
}

app.get('/dishes/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let results = await fetchDishesById(id);
    if (results.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found by Id' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 8: Get Dishes by Filter
http://localhost:3000/dishes/filter?isVeg=true */

async function getDishesByFilter(isVeg) {
  let query = 'SELECT * from dishes WHERE isVeg = ?';
  let response = await db.all(query, [isVeg]);
  return { dishes: response };
}

app.get('/dishes/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  try {
    let results = await getDishesByFilter(isVeg);
    if (results.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found for the veg' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* Exercise 9: Get Dishes Sorted by Price
http://localhost:3000/dishes/sort-by-price */

async function getDishesSortedByPrice() {
  let query = 'SELECT * FROM dishes ORDER BY price';
  let response = await db.all(query, []);
  return { dishes: response };
}

app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    let results = await getDishesSortedByPrice();
    if (results.dishes.length === 0) {
      return res
        .status(404)
        .json({ message: 'No dishes sorted by price low to high' });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost : ${PORT}`);
});
