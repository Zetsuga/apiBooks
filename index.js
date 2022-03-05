const app = require("./app");

require("./dataBase");

app.listen(app.get("port"),()=>(console.log("Servidor funcionando en el puerto ",app.get("port"))));