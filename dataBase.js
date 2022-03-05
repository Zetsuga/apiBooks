const mysql = require("mysql2");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "Jose@12.",
    database : "appbooks"
})


connection.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Conexión correcta a la base de datos");
    }
})

module.exports = connection;