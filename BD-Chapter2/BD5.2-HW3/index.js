let express = require('express')
let app = express()
let { sequelize } = require("./lib/index")
let { company } = require("./model/company.model")


let companyData = [
  {
    'id': 1,
    'name': 'Tech Innovators',
    'industry': 'Technology',
    'foundedYear': 2010,
    'headquarters': 'San Francisco',
    'revenue': 75000000
  },
  {
    'id': 2,
    'name': 'Green Earth',
    'industry': 'Renewable Energy',
    'foundedYear': 2015,
    'headquarters': 'Portland',
    'revenue': 50000000
  },
  {
    'id': 3,
    'name': 'Innovatech',
    'industry': 'Technology',
    'foundedYear': 2012,
    'headquarters': 'Los Angeles',
    'revenue': 65000000
  },
  {
    'id': 4,
    'name': 'Solar Solutions',
    'industry': 'Renewable Energy',
    'foundedYear': 2015,
    'headquarters': 'Austin',
    'revenue': 60000000
  },
  {
    'id': 5,
    'name': 'HealthFirst',
    'industry': 'Healthcare',
    'foundedYear': 2008,
    'headquarters': 'New York',
    'revenue': 80000000
  },
  {
    'id': 6,
    'name': 'EcoPower',
    'industry': 'Renewable Energy',
    'foundedYear': 2018,
    'headquarters': 'Seattle',
    'revenue': 55000000
  },
  {
    'id': 7,
    'name': 'MediCare',
    'industry': 'Healthcare',
    'foundedYear': 2012,
    'headquarters': 'Boston',
    'revenue': 70000000
  },
  {
    'id': 8,
    'name': 'NextGen Tech',
    'industry': 'Technology',
    'foundedYear': 2018,
    'headquarters': 'Chicago',
    'revenue': 72000000
  },
  {
    'id': 9,
    'name': 'LifeWell',
    'industry': 'Healthcare',
    'foundedYear': 2010,
    'headquarters': 'Houston',
    'revenue': 75000000
  },
  {
    'id': 10,
    'name': 'CleanTech',
    'industry': 'Renewable Energy',
    'foundedYear': 2008,
    'headquarters': 'Denver',
    'revenue': 62000000
  }
]

app.get("/seed_db", async(req , res) => {
  try {
    await sequelize.sync({force : true})
    await company.bulkCreate(companyData)
    res.status(200).json({ message : "Database Seeding Successful"})
  } catch(error){
    res.status(500).json( { message : "Error Seeding the data" , error : error.message})
  }
})

/* Fetch All Companies
http://localhost:3000/companies */

async function fetchAllCompanies(){
   let companies = await company.findAll()
  return { companies }
}

app.get("/companies", async (req , res) => {
   try {
     let result = await fetchAllCompanies()
     if(result.companies.length === 0){
       return res.status(404).json({ message : "No companies found"})
     }
     return res.status(200).json(result)
   } catch (error){
       return res.status(500).json({error : error.message})
   }
})

/* Fetch Company details by ID
http://localhost:3000/companies/details/2 */

async function fetchCompaniesById(id){
  let companyId = await company.findOne({where : {id}})
  return {company : companyId}
}

app.get("/companies/details/:id", async (req , res) => {
  let id = req.params.id
   try {
      let result = await fetchCompaniesById(id)
      if(result.company.length === 0){
        return res.status(404).json({ message : "No companies found for the id" + id})
      }
      return res.status(200).json(result)
    } catch (error){
        return res.status(500).json({error : error.message})
    }
})

/* Fetch all companies by industry
http://localhost:3000/companies/industry/Technology */

async function fetchCompaniesByIndustry(industry){
   let companies = await company.findAll({ where : {industry}})
   return {companies}
}

app.get("/companies/industry/:industry", async (req , res) => {
  let industry = req.params.industry
   try {
     let result = await fetchCompaniesByIndustry(industry)
     if(result.companies.length === 0){
       return res.status(404).json({ message : "No companies found of the industry : " + industry})
     }
     return res.status(200).json(result)
   } catch (error){
       return res.status(500).json({error : error.message})
   }
})

  /* Sort all companies by their revenue
  http://localhost:3000/companies/revenue?order=asc 
  */

async function sortAllCompaniesByRevenue(order){
    let companies = await company.findAll({ order : [['revenue', order ]]})
    return { companies }
}

app.get("/companies/sort/revenue", async (req , res) => {
   let order = req.query.order
  try {
     let result = await sortAllCompaniesByRevenue(order)
     if(result.companies.length === 0){
       return res.status(404).json({ message : "No companies sorted according to the " + order + " order"})
     }
     return res.status(200).json(result)
   } catch (error){
       return res.status(500).json({error : error.message})
   }
})


app.listen(3000, () => {
  console.log(`Server is running on http://localhost : 3000`)
})
