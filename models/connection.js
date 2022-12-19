const mongoose = require('mongoose');
const usuariosModel = require('./usuarios');
const tarefasModel = require('./tarefas');

mongoose.connect("mongodb://localhost:27017/agenda");


//var Usuarios = mongoose.model("Usuarios",usuariosModel);

var Tarefas = mongoose.model("Tarefas",tarefasModel);

Tarefas.find({},function(err,tarefa){
    console.log(tarefa)
});
