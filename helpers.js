const exphbs = require('express-handlebars');

function init(app){
    app.engine("handlebars", exphbs({
        defaultLayout:'main',
        layoutsDir: __dirname + '/views/layouts/',
        partialsDir: __dirname + '/views/partials/' 
    }));
    app.set('view engine','handlebars');
}

module.exports = init;