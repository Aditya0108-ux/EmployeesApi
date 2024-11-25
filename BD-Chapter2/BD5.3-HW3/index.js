let express = require("express")
let app = express()
let { sequelize } = require("./lib/index")
let { company } = require("./models/company.model")

app.use(express.json())

let companies = [
  {
    'name': 'Tech Innovators',
    'industry': 'Technology',
    'foundedYear': 2010,
    'headquarters': 'San Francisco',
    'revenue': 75000000
  },
  {
    'name': 'Green Earth',
    'industry': 'Renewable Energy',
    'foundedYear': 2015,
    'headquarters': 'Portland',
    'revenue': 50000000
  },
  {
    'name': 'Innovatech',
    'industry': 'Technology',
    'foundedYear': 2012,
    'headquarters': 'Los Angeles',
    'revenue': 65000000
  },
  {
    'name': 'Solar Solutions',
    'industry': 'Renewable Energy',
    'foundedYear': 2015,
    'headquarters': 'Austin',
    'revenue': 60000000
  },
  {
    'name': 'HealthFirst',
    'industry': 'Healthcare',
    'foundedYear': 2008,
    'headquarters': 'New York',
    'revenue': 80000000
  },
  {
    'name': 'EcoPower',
    'industry': 'Renewable Energy',
    'foundedYear': 2018,
    'headquarters': 'Seattle',
    'revenue': 55000000
  },
  {
    'name': 'MediCare',
    'industry': 'Healthcare',
    'foundedYear': 2012,
    'headquarters': 'Boston',
    'revenue': 70000000
  },
  {
    'name': 'NextGen Tech',
    'industry': 'Technology',
    'foundedYear': 2018,
    'headquarters': 'Chicago',
    'revenue': 72000000
  },
  {
    'name': 'LifeWell',
    'industry': 'Healthcare',
    'foundedYear': 2010,
    'headquarters': 'Houston',
    'revenue': 75000000
  },
  {
    'name': 'CleanTech',
    'industry': 'Renewable Energy',
    'foundedYear': 2008,
    'headquarters': 'Denver',
    'revenue': 62000000
  }
]

app.get("/seed_db", async (req , res) => {
      try {
        await sequelize.sync({ force : true })
        await company.bulkCreate(companies)
        res.status(200).json({message : "Database Seeding Successful"})
      } catch (error) {
         res.status(500).json({message : "Error seeding the database" , error : error.message})
      }
})


/*  Exercise 1: Fetch all companies 
http://localhost:3000/companies */

async function fetchAllCompanies(){
  let companies = await company.findAll()
  return { companies }
}

app.get("/companies", async (req , res) => {
    try {
 let result = await fetchAllCompanies()
      if(result.companies.length === 0){
        res.status(404).json({ message : "No companies found" })
      }
      res.status(200).json(result)
    } catch (error){
      res.status(500).json({error : error.message})
    } 
})

/* Exercise 2: Add a new company in the database 
http://localhost:3000/companies/new */

async function addNewCompany(companyData){
  let newCompany = await company.create(companyData)
  return { newCompany }
}

app.post("/companies/new" , async (req , res) => {
     try {
        let newCompany = req.body.newCompany
        let response = await addNewCompany(newCompany)
        res.status(200).json(response)
     } catch (error) {
       res.status(500).json({error : error.message})
     }
})

/* Exercise 3: Update companies information
http://localhost:3000/companies/update/11 */

async function updateCompanyById(updatedCompanyData , id){
  let companyDetails = await  company.findOne({where : {id}})
  if(!companyDetails) return {}
  companyDetails.set(updatedCompanyData)
  let updatedCompany = await companyDetails.save()
   return {message : "Company updated Successfully", updatedCompany}
}

app.post("/companies/update/:id", async(req , res) => {
     try {
       let id = parseInt(req.params.id)
       let newCompanyData = req.body
       let response = await updateCompanyById(newCompanyData , id)
       if(!response.message){
         res.status(404).json({message : "No company found"})
       }
       res.status(200).json(response)
     } catch (error) {
       res.status(500).json({error : error.message})
     }
})

/*  Exercise 4: Delete an company from the database
http://localhost:3000/companies/delete */

async function deleteCompanyById(id){
   let destroyedCompany = await company.destroy({where : {id}})
  if(destroyedCompany === 0) return {}
  return {message : "Company record deleted"}
}

app.post("/companies/delete" , async (req , res) => {
    try {
      let id = parseInt(req.body.id)
       let response = await deleteCompanyById(id)
       if(!response.message){
         res.status(404).json({ message : "No company found"})
       }
      res.status(200).json(response)
    } catch (error){
      res.status(500).json({error : error.message })
    }
})

app.listen(3000 , () => {
    console.log(`Server is running on http://localhost : 3000`)
})