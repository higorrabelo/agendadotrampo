const mongoose = require('mongoose');
const usuariosModel = require('./usuarios');
const tarefasModel = require('./tarefas');

mongoose.connect("mongodb://localhost:27017/agenda");

var Usuarios = mongoose.model("Usuarios",usuariosModel);


/*
Usuarios.deleteOne({_id:"63a199bd4f17852590800cac"},function(err){
    if(err){
        console.log("Erro ao Remover")
    }
    console.log("Removido com sucesso")
})
*/