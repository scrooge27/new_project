
const express = require('express');
const app = express();
const port = 8000;

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
let i=req.headers['user-agent']
if(i.search('Edg')<0 && (req.query.name==="Simone"||req.query.id==="27"||req.query.sur==="Pucci")){
	res.render('main', {layout: 'index', greeting: 'Hello World!', jumbo:"Hi master"})
}
if(i.search('Edg')<0 && (req.query.name!="Simone" && req.query.id!="27" && req.query.sur!="Pucci")){
	res.render('main', {layout: 'index', greeting: 'Hello World!', jumbo:"This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information."})
}
else{
	res.render('main', {layout: 'index', greeting: 'stai usando Edge, mona!'})
}

});

app.get('/learn', (req, res) => {
let i=req.headers['user-agent']
if(i.search('Edg')<0 && (req.query.name==="Simone"||req.query.id==="27"||req.query.sur==="Pucci")){
	res.render('learn', {layout: 'index', typeAl: 'alert alert-success', content: 'task completed master'})
}
if(i.search('Edg')<0 && (req.query.name!="Simone" && req.query.id!="27" && req.query.sur!="Pucci")){
	res.render('learn', {layout: 'index', typeAl: 'alert alert-success', content: 'task completed'})
}
else{
	res.render('learn', {layout: 'index', typeAl: 'alert alert-danger', content: 'mission failed'})
}

});

app.listen(port, () => console.log(`App listening to port ${port}`));

/*"npm i --save-dev @soluzioni-futura/eslint-config-soluzioni-futura" {
  "extends": "@soluzioni-futura/eslint-config-soluzioni-futura"
}*/