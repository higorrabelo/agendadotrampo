const handlebars = require('express-handlebars');
const moment = require('moment')

function init(app){
    app.engine("html", handlebars({
        defaultLayout:'main',
        helpers:{// criação de funções para tagear o html e fazer coisas personalizadas
            formatDate: (date) => {
                return moment(date).format('DD/MM/YYYY HH:MM:SS')
            },
            retornaNome: (id_usuario) =>{
                return id_usuario.nome;
            },
            checaStatus:(status)=>{
               return status==true ? true : false;
            }
            
        },
        extname:'html',
        layoutsDir: __dirname + '/views/layouts/',
        partialsDir: __dirname + '/views/partials/',        
    }));
    app.set('view engine','html');
}

module.exports = init;