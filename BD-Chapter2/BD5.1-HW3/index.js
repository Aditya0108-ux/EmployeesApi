let express = require("express");
let app = express();
let { company } = require("./model/company.model");
let { sequelize } = require("./lib/index");

let companies = [
    {
        name: 'TechCorp',
        industry: 'Technology',
        founded_year: 1998,
        headquarters: 'San Francisco, CA',
        revenue: 2000,
        employee_count: 5000
    },
    {
        name: 'HealthInc',
        industry: 'Healthcare',
        founded_year: 2005,
        headquarters: 'New York, NY',
        revenue: 1500,
        employee_count: 3000
    },
    {
        name: 'EduTech',
        industry: 'Education',
        founded_year: 2005,
        headquarters: 'Boston, MA',
        revenue: 1800,
        employee_count: 1200
    },
    {
        name: 'AutoMotive',
        industry: 'Automobile',
        founded_year: 1995,
        headquarters: 'Detroit, MI',
        revenue: 5000,
        employee_count: 10000
    },
    {
        name: 'EduServices',
        industry: 'Education',
        founded_year: 1990,
        headquarters: 'Chicago, IL',
        revenue: 4000,
        employee_count: 8000
    },
    {
        name: 'ClickOne',
        industry: 'Media',
        founded_year: 2000,
        headquarters: 'Los Angeles, CA',
        revenue: 1200,
        employee_count: 2500
    },
    {
        name: 'MediaWorks',
        industry: 'Media',
        founded_year: 1995,
        headquarters: 'Atlanta, GA',
        revenue: 3000,
        employee_count: 6000
    },
    {
        name: 'RetailWorld',
        industry: 'Retail',
        founded_year: 1970,
        headquarters: 'Dallas, TX',
        revenue: 6000,
        employee_count: 15000
    },
    {
        name: 'TechOne',
        industry: 'Technology',
        founded_year: 1990,
        headquarters: 'Miami, FL',
        revenue: 1000,
        employee_count: 2000
    },
    {
        name: 'GreenEnergy',
        industry: 'Energy',
        founded_year: 2015,
        headquarters: 'Denver, CO',
        revenue: 500,
        employee_count: 800
    }
];

app.get("/seed_db", async (req , res) => {
       try {
         await sequelize.sync({force : true});
         await company.bulkCreate(companies);
         res.status(200).json({message : "Database Seeding Successful"});
       } catch(error){
         res.status(500).json({message : "Error Seeding the data" , error : error.message});
       }
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
})
