const mongoose = require('mongoose');
const usuariosModel = require('./usuarios');
const tarefasModel = require('./tarefas');

mongoose.connect("mongodb://localhost:27017/agenda");

/*
tarefasModel.find().populate("id_usuario").then(function(retorno){
    console.log(retorno)
}).catch(err=>console.log(err));
*/

console.log(tarefasModel.find().populate("id_usuario"));