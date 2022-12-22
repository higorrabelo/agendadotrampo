const mongoose = require('mongoose');
const Usuarios = require('./usuarios');
const Tarefas = require('./tarefas');

mongoose.connect("mongodb://localhost:27017/agenda");

function teste(){
    Tarefas.
    find().
    populate({
        path:'id_usuario',
        select:'nome'
    }).exec(function(err,usuario){
        if(err){
            console.log("Erro: "+err);
        }
        usuario.forEach((parametro)=>{console.log(parametro.id_usuario.nome)})
    });
}

teste()

/*
Exemplo Populate

Tarefas.
find().
populate({
    path:'id_usuario',
    select:'nome'
}).exec(function(err,usuario){
    if(err){
        console.log("Erro: "+err);
    }
    console.log(usuario);
}); */