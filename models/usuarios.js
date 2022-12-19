const mongoose = require('mongoose');

const usuariosModel = mongoose.Schema({
    nome:String,
    email:String,
    senha:String,
    inscricao:{type:Date, default: new Date},
    edicao: Date
});

module.exports = usuariosModel;