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
            },
            ternario:(verificacao, verdadeiro, falso)=>{
               return verificacao? verdadeiro : falso;
            },
            selected: (value, options) =>{
                console.log(value)
                // console.log(typeof value)
                // console.log(options.fn(this).replace(new RegExp(`value=\"${value}\"`), '$& selected="selected"'))
                
                return options.fn(this).replace(new RegExp(`value=\"${value}\"`), '$& selected="selected"');
            }
            
        },
        extname:'html',
        layoutsDir: __dirname + '/views/layouts/',
        partialsDir: __dirname + '/views/partials/',        
    }));
    app.set('view engine','html');
}

module.exports = init;