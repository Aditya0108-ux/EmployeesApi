let express = require("express")
const { sequelize } = require("./lib")
const { book } = require("./model/book.model")
const { author } = require("./model/author.model")
let app = express()

app.use(express.json())

// books
let books = [
  {
    title: 'Harry Potter and the Philosophers Stone',
    genre: 'Fantasy',
    publicationYear: 1997,
  },
  { title: 'A Game of Thrones', genre: 'Fantasy', publicationYear: 1996 },
  { title: 'The Hobbit', genre: 'Fantasy', publicationYear: 1937 },
]

app.get("/seed_db", async (req , res) => {
   try {
     await sequelize.sync({force : true})
     await book.bulkCreate(books)
     res.status(200).json({message : "Database Seeding Successful"})
   } catch (error) {
     res.status(500).json({message : "Error seeding the data", error : error.message})
   }
})

/* Exercise 1: Create New Author
http://localhost:3000/authors/new */

async function addNewAuthor(newAuthorData){
  let newAuthor = await author.create(newAuthorData)
  return {newAuthor}
  
}

app.post("/authors/new", async (req , res) => {
    try {
       let newAuthor = req.body.newAuthor
       let response = await addNewAuthor(newAuthor)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({error : error.message})
    }
})

/* Exercise 2: Update Author by ID
http://localhost:3000/authors/update/1 */

async function updateAuthorById(id, newAuthorData){
  let authorDetails = await author.findOne({where : {id}})
  if(!authorDetails){
    return {}
  }
  authorDetails.set(newAuthorData)
  let updatedAuthor = await authorDetails.save()
  return {message : "Author updated successfully", updatedAuthor}
}


app.post("/authors/update/:id",async (req , res) => {
     try { 
      let data = req.body
      let id = parseInt(req.params.id)
       let response = await updateAuthorById(id , data)
       res.status(200).json(response)
     } catch (error) {
       res.status(500).json({error : error.message})
     }   
})

app.listen(3000, () => {
  console.log(`Server is running on http://localhost : 3000`)
})