let express = require("express")
const { sequelize } = require("./lib")
const {dish} = require("./models/dish.model")
const { chef } = require("./models/chef.model")
let app = express()

app.use(express.json())

let dishes = [
  {
     name: 'Margherita Pizza',
    cuisine: 'Italian',
    preparationTime: 20,
  },
  {
    name: 'Sushi',
    cuisine: 'Japanese',
    preparationTime: 50,
  },
  {
    name: 'Poutine',
    cuisine: 'Canadian',
    preparationTime: 30,
  },
]

app.get("/seed_db",async (req,res) => {
  try {
    await sequelize.sync({force : true})
    await dish.bulkCreate(dishes)
    res.status(200).json({message : "Database Seeding Successful"})
  } catch (error) {
    res.status(500).json({message : "Error seeding the database", error: error.message})
  }
})

/* Exercise 1: Create New Chef
http://localhost:3000/chefs/new */

async function addNewChef(newChefData){
  let newChef = await chef.create(newChefData)
  return {newChef}
}

app.post("/chefs/new", async (req , res) => {
     try {
       let newChef = req.body.newChef
       let response = await addNewChef(newChef)
       res.status(200).json(response)
     } catch (error) {
       res.status(500).json({error : error.message})
     }
})

/* Exercise 2: Update Chef by ID
http://localhost:3000/chefs/update/4 */

async function updatedChefById(id , updatedChefData){
  let chefDetails = await chef.findOne({where : {id}})
  if(!chefDetails){
    return {}
  }
  chefDetails.set(updatedChefData)
  let updatedData = await chefDetails.save()
  return {message : "Chef updated successfully", updatedData}
  
}


app.post("/chefs/update/:id", async (req , res) => {
  try {
    let id = req.params.id
    let updatedChefData = req.body
    let response = await updatedChefById(id , updatedChefData)
    res.status(200).json(response)
  } catch (error) {
  res.status(500).json({error : error.message})
  }
})

app.listen(3000, () => {
  console.log(`Server is running on http://localhost : 3000`)
})