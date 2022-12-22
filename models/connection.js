const mongoose = require('mongoose');
const Usuarios = require('./usuarios');
const Tarefas = require('./tarefas');

mongoose.connect("mongodb://localhost:27017/agenda");



const filtro = {_id:'63a327e7110e8f33e437cb45'};
const update = {descricao:"Nova e Atualizada"};

Tarefas.findOneAndUpdate(filtro,update).exec(function(err,data){
    if(err){
        console.log("Erro durante a atualização de Dados");
    }
    console.log("Dados Atualizados com sucesso");
});

/*  */