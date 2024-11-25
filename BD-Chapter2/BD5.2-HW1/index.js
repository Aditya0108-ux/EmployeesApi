let express = require("express")
let app = express()
let PORT = 3000;
let { sequelize } = require("./lib/index");
let { post } = require("./models/post.model");

let postData = [
  {
    name: 'Post1',
    author: 'Author1',
    content: 'This is the content of post 1',
    title: 'Title1'
  },
  {
          name: 'Post2',
          author: 'Author2',
          content: 'This is the content of post 2',
          title: 'Title2'
  },
  {
    name: 'Post3',
    author: 'Author1',
    content: 'This is the content of post 3',
    title: 'Title3'
  }
]

app.get("/seed_db", async (req , res) => {
      try {
        await sequelize.sync({force : true});
        await post.bulkCreate(postData);
        return res.status(200).json({message : "Database Seeding Successful"})
      } catch(error) {
        return res.status(500).json({ error : error.message});
      }
})

/* Exercise 1: Fetch all posts
http://localhost:3000/posts */

async function fetchAllPosts(){
  let posts = await post.findAll();
  return { posts };
}

app.get("/posts", async (req , res) => {
      try {
        let result = await fetchAllPosts();
        if(result.posts.length === 0){
          return res.status(404).json( { message : "No posts found"});
       }
        res.status(200).json(result);
      } catch(error){
        res.status(500).json({ error : error.message});
      }
})

/* Exercise 2: Fetch post details by ID
  http://localhost:3000/posts/details/2 */

async function fetchPostById(id){
   let posts = await post.findOne({where : {id}});
   return { posts };
}

app.get("/posts/details/:id", async (req , res) => {
      let id = req.params.id;
      try {
        let result = await fetchPostById(id);
        if(result.posts.length === 0){
          return res.status(404).json( { message : "No posts found for the id : " + id});
       }
        res.status(200).json(result);
      } catch(error){
        res.status(500).json({ error : error.message});
      }
})

/* Exercise 3: Fetch all posts by an author
http://localhost:3000/posts/author/Author1 */

async function fetchPostsByAuthor(author){
  let posts = await post.findAll({where : {author}});
   return { posts };
}

app.get("/posts/author/:author", async (req , res) => {
     let author = req.params.author;
      try {
        let result = await fetchPostsByAuthor(author);
        if(result.posts.length === 0){
          return res.status(404).json( { message : "No posts found for the auhtor : " + author});
       }
        res.status(200).json(result);
      } catch(error){
        res.status(500).json({ error : error.message});
      }
})

/* Exercise 4: Sort all the posts by their name
http://localhost:3000/posts/sort/name?order=desc */

async function sortPostsByName(order){
    let posts = await post.findAll({ order : [["name" , order]]});
  return { posts };
}

app.get("/posts/sort/name", async (req , res) => {
      let order = req.query.order;
      try {
        let result = await sortPostsByName(order);
        if(result.posts.length === 0){
          return res.status(404).json( { message : "No posts found sorted in the " + order + " order"});
       }
        res.status(200).json(result);
      } catch(error){
        res.status(500).json({ error : error.message});
      }
})


app.listen(PORT , () => {
  console.log(`Server is running on http://localhost : ${PORT}`);
});