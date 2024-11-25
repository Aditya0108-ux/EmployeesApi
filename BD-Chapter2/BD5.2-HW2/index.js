let express = require("express");
let app = express();
let { sequelize } = require("./lib/index")
let { employee } = require("./model/employee.model.js")

let employeeData = [
  {
    name: 'Alice',
    salary: 60000,
    department: 'Engineering',
    designation: 'Software Engineer'
  },
  {
    name: 'Bob',
    salary: 70000,
    department : 'Marketing',
    designation : 'Marketing Manager'
  },
  {
    name: 'Charlie',
    salary: 80000,
    department: 'Engineering',
    designation: 'Senior Software Engineer'
  }
]

app.get("/seed_db", async (req , res)  => {
    try {
      await sequelize.sync({force : true})
      await employee.bulkCreate(employeeData)
      res.status(200).json({message : "Database Seeding Successful"}) 
    } catch(error){
      res.status(500).json({message : "Error seeding the data", error : error.message})
    }
})

/* Exercise 1: Fetch all employees
http://localhost:3000/employees */

async function fetchAllEmployees(){
  let employees = await employee.findAll();
  return {employees}
}

app.get("/employees", async (req , res) => {
    try {
     let result = await fetchAllEmployees();
      if(result.employees.length === 0){
       return res.status(404).json({message : "No employees found"})
      }
         res.status(200).json(result)
       } catch(error){
           return res.status(500).json({error : error.message})
       }
})

/* Exercise 2: Fetch employee details by ID
http://localhost:3000/employees/details/2 */

async function fetchEmployeeDetailsById(id){
  let employeeDetail = await employee.findOne({where : {id}})
  return {"employee" : employeeDetail}
}

app.get("/employees/details/:id", async (req , res) => {
  let id = req.params.id;
    try {
     let result = await fetchEmployeeDetailsById(id);
      if(result.employee.length === 0){
       return res.status(404).json({message : "No employees found for the id " + id})
      }
         res.status(200).json(result)
       } catch(error){
           return res.status(500).json({error : error.message})
       }
})

/* Exercise 3: Fetch all employees by department
 http://localhost:3000/employees/department/Engineering */

async function fetchEmployeesByDepartment(department){
  let employees = await employee.findAll({where : {department}})
  return {employees}
}

app.get("/employees/department/:department", async (req , res) => {
  let department = req.params.department
    try {
     let result = await fetchEmployeesByDepartment(department);
      if(result.employees.length === 0){
       return res.status(404).json({message : "No employees found of the department " + department})
      }
         res.status(200).json(result)
       } catch(error){
           return res.status(500).json({error : error.message})
       }
})

/* Exercise 4: Sort all the employees by their salary
http://localhost:3000/employees/sort/salary?order=desc  */

async function sortEmployeesBySalary(order){
  let employees = await employee.findAll({order : [["salary", order]]})
  return { employees }
}

app.get("/employees/sort/salary", async (req , res) => {
  let order = req.query.order
  try {
     let result = await sortEmployeesBySalary(order);
      if(result.employees.length === 0){
       return res.status(404).json({message : "No employees sorted in the " + order + " order"})
      }
         res.status(200).json(result)
       } catch(error){
           return res.status(500).json({error : error.message})
       }
})


app.listen(3000 , () => {
  console.log(`Server is running on http://localhost : 3000`);
})


