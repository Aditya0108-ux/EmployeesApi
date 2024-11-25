let express = require('express')
let app = express()
let { sequelize } = require("./lib/index")
let { course } = require("./models/course.model")
let {student} = require("./models/student.model")

app.use(express.json())

// courses
let courses = [
  { title: 'Math 101', description: 'Basic Mathematics' },
  { title: 'History 201', description: 'World History' },
  { title: 'Science 301', description: 'Basic Sciences' },
]

 app.get("/seed_db", async (req , res) => {
         try {
           await sequelize.sync({force : true})
           await course.bulkCreate(courses)
           return res.status(200).json({message : "Database Seeding Successful"})
         } catch (error) {
           res.status(500).json({message : "Error seeding the data", error : error,message})
         }
 })

/* Exercise 1: Create New Student
http://localhost:3000/students/new */

async function addNewStudent(newStudentData){
     let newStudent = await student.create(newStudentData)
      return { newStudent }
}

app.post("/students/new" , async (req, res) => {
   try {
     let newStudent = req.body.newStudent
     let response =  await addNewStudent(newStudent)
    res.status(200).json(response)
   } catch (error) {
     res.status(500).json({error : error.message})
   }
})

/* Exercise 2: Update Student by ID
http://localhost:3000/students/update/1 */

async function updateStudentById(id , updateStudentData){ 
    let studentDetails = await student.findOne({where : {id}})
     if(!studentDetails) return {}
     studentDetails.set(updateStudentData)
  let updatedData = await studentDetails.save()
  return {message : "Student updated successfully" , updatedData}
}

app.post("/students/update/:id", async (req , res) => {
         try {
           let id = parseInt(req.params.id)
           let updateStudentData = req.body
           let response = await updateStudentById(id , updateStudentData)
           res.status(200).json(response)
         } catch (error) {
             res.status(500).json({error : error.message})
         }
  
})



app.listen(3000 , () => {
  console.log(`Server is running on http://localhost : 3000`)
})