const mongoose = require('mongoose');

const schema = mongoose.Schema({
    titulo:String,
    descricao:String,
    status:String,
    id_usuario:{type: mongoose.Schema.Types.ObjectId, ref:'usuarios'}, //preparando a utilização com populate referenciando a tabela usuários
    inscricao:{type:Date, default: new Date()},
    edicao: Date
});

var tarefasModel = mongoose.model("tarefas",schema);

module.exports = tarefasModel;