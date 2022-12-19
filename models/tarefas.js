const mongoose = require('mongoose');

const tarefasModel = mongoose.Schema({
    titulo:String,
    descricao:String,
    status:String,
    inscricao:{type:Date, default: new Date},
    edicao: Date
});

module.exports = tarefasModel;