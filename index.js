const express = require('Express');
const app = express();
const bodyParser = require('body-parser');
const initTemplate = require('./helpers');
const mongoose = require("mongoose");
const usuariosModel = require('./models/usuarios');
const tarefasModel = require('./models/tarefas')
const crypto = require('crypto-js')

mongoose.connect("mongodb://localhost:27017/agenda")

app.use(express.static("public"))
initTemplate(app)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


//findOneAndRmove

app.get("/",function(req,resp){
    resp.render("index");
})
app.get("/agenda",function(req,resp){
    resp.render("agenda");
})
app.get("/cadastro_usuario",function(req,resp){
    resp.render("cadastro_usuario");
})
app.get("/cadastro_usuario",function(req,resp){
    resp.render("cadastro_usuario");
})

app.post("/cadastro_user",function(req,resp){
    var nome = req.body.nome;
    var senha = req.body.senha;
    var email = req.body.email;
    const Usuarios = mongoose.model("Usuarios",usuariosModel);

    const usuario = new Usuarios({
            nome:nome,
            senha:crypto.MD5(senha).toString(),
            email:email
    });

    usuario.save()
    resp.render("agenda");
    
})

app.post("/cad_tarefa",function(req,resp){
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    const Tarefas = mongoose.model("Tarefas",tarefasModel);

    const tarefa = new Tarefas({
            titulo:titulo,
            descrica:descricao
    });

    tarefa.save()
    resp.render("agenda");
    
})

app.get("/cadastro_tarefa",function(req,resp){
    resp.render("cadastro_tarefa");
})
app.get("/contato",function(req,resp){
    resp.render("contato");
})


app.listen(8080,function(){
    console.log("Servidor Ativo")
})