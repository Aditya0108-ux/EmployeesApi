let express = require("express");
let app = express();
let sqlite3 = require("sqlite3").verbose();
let { open } = require("sqlite");
let PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename : "products_database.sqlite",
     driver : sqlite3.Database,    
  });
})();

app.get("/", (req , res) => {
   res.status(200).json({message : "Welcome to the Products Database"});
})

/* Exercise 1: Fetch All Products
http://localhost:3000/products */

async function fetchAllProducts(){
      let query = "SELECT * from products";
      let response = await db.all(query, []);
       return {products : response};
}

app.get("/products", async (req , res) => {
      let results = await fetchAllProducts();
        res.status(200).json(results);
})

/* Exercise 2: Retrieve Products by Brand 
 http://localhost:3000/products/brand/Sony */

async function fetchProductsByBrand(brand){
      let query = "SELECT * from products WHERE brand = ?";
      let response = await db.all(query, [brand]);
      return {products : response};
}

app.get("/products/brand/:brand", async (req , res) => {
       let brand = req.params.brand;
       let results = await fetchProductsByBrand(brand);
        res.status(200).json(results);
})

/* Exercise 3: Retrieve Products by Category
http://localhost:3000/products/category/Electronics */

async function fetchProductsByCategory(category){
    let query = "SELECT * from products WHERE category = ?";
    let response = await db.all(query , [category]);
     return {products : response};
}

app.get("/products/category/:category",async ( req ,res) => {
         let category = req.params.category;
          let results = await fetchProductsByCategory(category);
            return res.status(200).json(results);
})

/* Exercise 4: Retrieve Products by stocks
http://localhost:3000/products/stock/in-stock */

async function fetchProductsByStock(stock){
     let query = "SELECT * from products WHERE stock = ?";
     let response = await db.all(query , [stock]);
      return {products : response};
}

app.get("/products/stock/:stock", async (req , res) => {
      let stock = req.params.stock;
      let results = await fetchProductsByStock(stock);
      res.status(200).json(results);
})


app.listen(PORT , () => {
   console.log(`Server is running on port ${PORT}`);
})