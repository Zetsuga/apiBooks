const { response } = require("express");
const connection = require("../dataBase");

let sql;
let param;
let respuesta ={};

function getLibros(request,response){
    if(request.query.id_libro ==null){
        param = [request.query.id_usuario];
        sql = "SELECT * FROM libro WHERE id_usuario = ?";
    }else{
        param = [request.query.id_libro,request.query.id_usuario];
        sql = "SELECT * FROM libro WHERE id_libro = ? AND id_usuario = ?";
    }

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Libro no encontrado",
                titulo:"Error al buscar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: `Libro/s encontrado/s`,
                titulo:"Error al buscarBusqueda Ok",
                resultado : result
            }  
        }
        response.send(respuesta);
    })
}

function postLibros(request,response){
    let {id_usuario,titulo,tipo,autor,precio,foto} = request.body;
    param = [id_usuario,titulo,tipo,autor,precio,foto];
    sql = "INSERT INTO libro(id_usuario,titulo,tipo,autor,precio,foto) VALUES (?)";
    
    connection.query(sql,[param],function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Libro no guardado",
                titulo:"Error al guardar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: `Libro guardado con la referencia: ${result.insertId}`,
                titulo:"Guardado",
                resultado : String(result.insertId)
            }
        }
        response.send(respuesta);
    });
}

function putLibros(request,response){
    let {id_libro,id_usuario,titulo,tipo,autor,precio,foto} = request.body;
    param = [id_usuario,titulo,tipo,autor,precio,foto,id_libro];
    sql = "UPDATE libro SET id_usuario = COALESCE(?,id_usuario),titulo = COALESCE(?,titulo), tipo = COALESCE(?,tipo)" +
        ", autor = COALESCE(?,autor), precio = COALESCE(?,precio), foto = COALESCE(?,foto) WHERE id_libro = ?";
    
    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Libro no modificado",
                titulo:"Error al modificar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: `Libro modificado ${result.id_libro}`,
                titulo:"Modificado",
                resultado : String(result.affectedRows)
            }  
        }
        response.send(respuesta);
    });
}

function delLibros(request,response){
    param = [request.body.id_libro];
    sql = "DELETE FROM libro WHERE id_libro = ?";

    connection.query(sql,param,function(err,result){
        if(err){
            console.log(err)
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: "Libro no eliminado",
                titulo:"Error al eliminar",
                resultado : "-1"
            }   
        }else{
            respuesta = {
                error: true,
                codigo: 200,
                mensaje: `Libro eliminado`,
                titulo:"Eliminado",
                resultado : String(result.affectedRows)
            }  
        }
        response.send(respuesta);
    });
}

module.exports = {getLibros,postLibros,putLibros,delLibros};