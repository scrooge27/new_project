
const express = require('express');
const app = express();
const port = 3000;

const handlebars = require('express-handlebars');

app.set('view engine', 'hbs');

app.engine('hbs', handlebars({
layoutsDir: __dirname + '/views/layouts',
extname: 'hbs',
defaultLayout: 'planB',
//new configuration parameter
partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static('public'))

app.get('/', (req, res) => {
//Using the index.hbs file instead of planB
res.render('main', {layout: 'index'});
});

app.listen(port, () => console.log(`App listening to port ${port}`));