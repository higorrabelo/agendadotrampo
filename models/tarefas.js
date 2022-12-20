const mongoose = require('mongoose');

const tarefasModel = mongoose.Schema({
    titulo:String,
    descricao:String,
    status:String,
    id_usuario:{type:Object},
    inscricao:{type:Date, default: new Date()},
    edicao: Date
});

module.exports = tarefasModel;