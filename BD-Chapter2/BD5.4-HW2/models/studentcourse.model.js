let {DataTypes , sequelize } = require("../lib/")
let course = require("./course.model")
let student = require("./student.model")

let studentCourse = sequelize.define("studentCourse", {
      courseId : {
        type : DataTypes.INTEGER,
        references : {
          model : course,
          keys : "id",  
          }
      }, 
     studentId : {
       type : DataTypes.INTEGER,
       references : {
         model : student,
         keys : "id",  
         }
     }, 
})
 course.belongsToMany(student,{through : studentCourse})
student.belongsToMany(course, {through : studentCourse})
module.exports = {
  studentCourse,
}