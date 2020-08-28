// Config
var config = require('./config');

// Express
const express = require('express');
const app = express();
var routes = require('./routes/index.js');

// Handlebars
const handlebars = require('express-handlebars');

// Body parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/',
	extname: 'hbs'
	}));

// Firebase
const admin = require('firebase-admin');
//const serviceAccount = require('../workshop-bot-286003-597bb10efe90.json');
const serviceAccount = require(config.firebaseSAPath);
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
	});
const db = admin.firestore();

// Data Helpers
var PlanetResources = require('./data/planet_resources.js');
planetResources = new PlanetResources(db);

routes(app);

// App listner
app.listen(3000, function() {
	console.log('listening on 3000')
}) 