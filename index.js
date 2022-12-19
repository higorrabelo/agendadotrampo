const express = require('Express');
const app = express();
const bodyParser = require('body-parser');
const initTemplate = require('./helpers');
const mongoose = require("mongoose");
const usuariosModel = require('./models/usuarios');
const tarefasModel = require('./models/tarefas');
const crypto = require('crypto-js');//chamando a biblioteca crypto-js para harsh de senhas

mongoose.connect("mongodb://localhost:27017/agenda")//conexão com o banco mongodb agenda

app.use(express.static("public"))//Atrelando a pasta public com os arquivos css e js para o frontend

initTemplate(app)//Iniciando Handlebars

//chamando a biblioteca body-parser para captura de dados dos formulários
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//findOneAndRemove função para remoção de valores do banco

app.get("/",function(req,resp){
    resp.render("index",{layouts:"Home"});
})
app.get("/agenda",function(req,resp){
    var Tarefas = mongoose.model("Tarefas",tarefasModel);
    Tarefas.find({},function(err,tarefa){
        resp.render("agenda",{title:"Agenda",tarefas:tarefa});
    })
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
    resp.redirect("/agenda");  
});
app.get("/cadastro_tarefa",function(req,resp){
    var Usuarios = mongoose.model("Usuarios",usuariosModel);
    Usuarios.find({},function(err,usuario){
        resp.render("cadastro_tarefa",{title:"Tarefas",usuarios:usuario});
    })
});
app.post("/cad_tarefa",function(req,resp){
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var usuario = req.body.usuario;
    const Tarefas = mongoose.model("Tarefas",tarefasModel);
    const tarefa = new Tarefas({
            titulo:titulo,
            descricao:descricao,
            usuario:usuario
    });
    tarefa.save()
    resp.redirect("/agenda");  ;
});
app.get("/contato",function(req,resp){
    resp.render("contato");
});
app.listen(8080,function(){
    console.log("Servidor Ativo")
});