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
                titulo:"Error al guardar",
                resultado : "-1"
            }            
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: `Usuario guardado con la id ${result.insertId}`,
                titulo:"Guardado",
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
                titulo:"Error al buscar",
                resultado : "-1"
            }            
        }else{
            if(result.length>0){
                respuesta = {
                    error: false,
                    codigo: 200,
                    mensaje: "Usuario encontrado",
                    titulo:"busqueda Ok",
                    resultado : result
                } 
            }else{
                respuesta = {
                    error: true,
                    codigo: 200,
                    mensaje: "Usuario no encontrado",
                    titulo:"Error al buscar",
                    resultado : result
                } 
            }
            
        }
        response.send(respuesta);
    });
}

function putPerfil(request,response){
    let temp = request.body;
    param = [temp.nombre,temp.apellidos,temp.correo,temp.url,temp.password,temp.id_usuario];
    sql = "UPDATE usuario SET nombre = COALESCE(?,nombre),apellidos = COALESCE(?,apellidos), correo = COALESCE(?,correo)" +
        ", url = COALESCE(?,url), password = COALESCE(?,password) WHERE id_usuario = ?";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err);
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Usuario no modificado",
                titulo:"Error al modificar",
                resultado : "-1"
            }            
        }else{
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: "Usuario modificado",
                titulo:"Modificado",
                resultado : result
            } 
        }
        response.send(respuesta);
    });

}
 
module.exports = {postRegistro,postLogin,putPerfil}