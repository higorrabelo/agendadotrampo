const express = require('Express');
const app = express();
const bodyParser = require('body-parser');
const initApp = require('./helpers');
const mongoose = require("mongoose");
const Usuarios = require('./models/usuarios');
const Tarefas = require('./models/tarefas');
const crypto = require('crypto-js');//chamando a biblioteca crypto-js para harsh de senhas
const moment = require('moment');

mongoose.connect("mongodb://localhost:27017/agenda")//conexão com o banco mongodb agenda

app.use(express.static("public"))//Atrelando a pasta public com os arquivos css e js para o frontend

initApp(app)//Iniciando Handlebars

//chamando a biblioteca body-parser para captura de dados dos formulários
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//findOneAndRemove função para remoção de valores do banco

app.get("/",function(req,resp){
    resp.render("index",{layouts:"Home"});
})
app.get("/agenda",function(req,resp){
    Tarefas.find({}).populate({path:'id_usuario',select:'nome'})
    .exec(function(err,tarefa){
            if(err){
                resp.redirect("/")
            }
            req.options = {}
            req.options.title = "Agenda"
            req.options.tarefas = tarefa 
            resp.render("agenda",req.options);
    });
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
app.get("/tarefa",function(req,resp){
    Usuarios.find({},function(err,usuario){
        resp.render("cadastro_tarefa",{title:"Tarefas",usuarios:usuario, tarefa: {}});
    })
});
app.get("/tarefa/:id",function(req,resp){
    var id = req.params.id;
    Tarefas.findOne({_id:id}).populate({path:'id_usuario',select:'nome'})
    .exec(function(err,tarefa){
        if(err){
            resp.redirect("/")
        }
        Usuarios.find({}, function(err, usuarios) {
            req.options = {}
            req.options.title = "Editar"
            req.options.tarefa = tarefa 
            req.options.usuarios = usuarios 
            req.options.edita = true
            resp.render("cadastro_tarefa",req.options);  
        })
    });
});

app.put("/tarefa",function(req,resp){
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var id = req.body.id;
    const filtro = {_id:id};
    const update = {titulo:titulo, descricao:descricao};
    Tarefas.findOneAndUpdate(filtro,update).exec(function(err,confirma){
        if(err){
            console.log("Erro");
        }
        resp.redirect("/agenda");
    });
    
});
app.post("/tarefa",function(req,resp){
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var id_usuario = req.body.usuario;
    const tarefa = new Tarefas({
            titulo:titulo,
            descricao:descricao,
            id_usuario:id_usuario
    });
    tarefa.save()
    resp.redirect("/agenda"); 

});
app.get("/contato",function(req,resp){
    resp.render("contato");
});
app.listen(8080,function(){
    console.log("Servidor Ativo")
});