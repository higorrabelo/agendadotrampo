const handlebars = require('express-handlebars');
const moment = require('moment')

function init(app){
    app.engine("handlebars", handlebars({
        defaultLayout:'main',
        helpers:{// criação de funções para tagear o html e fazer coisas personalizadas
            formatDate: (date) => {
                return moment(date).format('DD/MM/YYYY HH:MM:SS')
            },
            retornaNome: (id_usuario) =>{
                return id_usuario.nome;
            }
            
        },
        layoutsDir: __dirname + '/views/layouts/',
        partialsDir: __dirname + '/views/partials/',        
    }));
    app.set('view engine','handlebars');
}

module.exports = init;