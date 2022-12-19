const mongoose = require('mongoose');
const usuariosModel = require('./usuarios');
const tarefasModel = require('./tarefas');
const crypto = require('crypto-js');

mongoose.connect("mongodb://localhost:27017/agenda");


const Usuarios = mongoose.model("Usuarios",usuariosModel);

const usuario = new Usuarios({
    nome:"Higor Rafael Rabelo",
    senha:crypto.MD5("Higor20").toString(),
    email:"higor.rabelo@gmail.com"
});

usuario.save()

//module.exports = mongoose;

/*

CADASTRO DE USUÁRIOS
const Usuarios = mongoose.model("Usuarios",usuariosModel);

const usuario = new Usuarios({
    nome:"Higor Rafael Rabelo",
    senha:crypto.MD5("Higor20").toString(),
    email:"higor.rabelo@gmail.com"
});

usuario.save()

CADASTRO DE TAREFAS
const Tarefas = mongoose.model("Tarefas",tarefasModel);

const tarefa = new Tarefas({
    titulo:"Higor Rafael Rabelo",
    descricao:"Qualquer descrição em texto"
});

tarefa.save()


*/