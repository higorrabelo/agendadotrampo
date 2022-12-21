const mongoose = require('mongoose');

const schema = mongoose.Schema({
    nome:String,
    email:String,
    senha:String,
    inscricao:{type:Date, default: new Date},
    edicao: Date
});

var usuariosModel = mongoose.model("usuarios",schema);

module.exports = usuariosModel;