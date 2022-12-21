const handlebars = require('express-handlebars');
const moment = require('moment')

function init(app){
    app.engine("handlebars", handlebars({
        defaultLayout:'main',
        helpers:{
            formatDate: (date) => {
                return moment(date).format('DD/MM/YYYY HH:MM:SS')
            }
        },
        layoutsDir: __dirname + '/views/layouts/',
        partialsDir: __dirname + '/views/partials/',        
    }));
    app.set('view engine','handlebars');
}

function formatadata(data){
    return moment(data).format("DD/MM/YYYY");
};

module.exports = init;