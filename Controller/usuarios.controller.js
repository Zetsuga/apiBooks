const { response } = require("express");
const connection = require("../dataBase");

let sql;
let param;
let respuesta ={};

function postRegistro(request,response){
    let temp = request.body; 
    param = [temp.nombre,temp.apellidos,temp.correo,temp.url,temp.password];
    sql = "INSERT INTO usuario(nombre,apellidos,correo,url,password) VALUE (?)";

    connection.query(sql,[param],function(err,result){
        if(err){
            console.log(err);
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Usuario no guardado",
                resultado : "-1"
            }            
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Usuario guardado con la id ${result.insertId}`,
                resultado : String(result.insertId)
            } 
        }
        response.send(respuesta);
    });

}

function postLogin(request,response){
    let temp = request.body; 
    param = [temp.correo,temp.password];
    sql = "SELECT * FROM usuario WHERE correo = ? AND password = ?";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err);
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Usuario no encontrado",
                resultado : "-1"
            }            
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: "Usuario encontrado",
                resultado : result
            } 
        }
        response.send(respuesta);
    });
}

module.exports = {postRegistro,postLogin}