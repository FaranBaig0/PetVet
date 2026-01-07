const mysql= require("mysql2")
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"petcare"
});
db.connect((err)=>{
    if(err){
        console.error("Db connenction Failed",err);
    }else{
        console.error("DATA BASE CONNECTED");
    }
})
module.exports =db;