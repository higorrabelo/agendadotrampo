const express = require('Express');
const app = express();
const bodyParser = require('body-parser');
const initTemplate = require('./helpers');
const mongoose = require("mongoose");
const Usuarios = require('./models/usuarios');
const Tarefas = require('./models/tarefas');
const crypto = require('crypto-js');//chamando a biblioteca crypto-js para harsh de senhas
const moment = require('moment');

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
    Tarefas.find({},function(err,tarefa){
        resp.render("agenda",{title:"Agenda",tarefas:tarefa});
    })
})

app.get("/remover/:id",function(req,resp){
    var id = req.params.id;
    Tarefas.findOneAndRemove({_id:`${id}`},function(data){
            resp.redirect("/agenda")
    })
});


app.get("/cadastro_usuario",function(req,resp){
    resp.render("cadastro_usuario");
})
app.post("/cadastro_user",function(req,resp){
    var nome = req.body.nome;
    var senha = req.body.senha;
    var email = req.body.email;

    const usuarios = new Usuarios({
            nome:nome,
            senha:crypto.MD5(senha).toString(),
            email:email
    });
    usuarios.save()
    resp.redirect("/agenda");  
});

app.get("/editar/:id/:titulo/:descricao",function(req,resp){
    var id = req.params.id;
    var titulo = req.params.titulo;
    var descricao = req.params.descricao;
    resp.render("cadastro_tarefa",{id,titulo,descricao});
});

app.get("/cadastro_tarefa",function(req,resp){
    Usuarios.find({},function(err,usuario){
        resp.render("cadastro_tarefa",{title:"Tarefas",usuarios:usuario});
    })
});
app.post("/cad_tarefa",function(req,resp){
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var id_usuario = req.body.usuario;
    const tarefa = new Tarefas({
            titulo:titulo,
            descricao:descricao,
            id_usuario:id_usuario
    });
    tarefa.save()
    resp.redirect("/agenda");  ;
    //resp.send(`Titulo: ${titulo}  \n Descrição: ${descricao} \n Id_usuario: ${usuario}`)
});
app.get("/contato",function(req,resp){
    resp.render("contato");
});


app.listen(8080,function(){
    console.log("Servidor Ativo")
});