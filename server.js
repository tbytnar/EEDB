// Express
const express = require('express')
const app = express()

// Body parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

// Firebase
const admin = require('firebase-admin');
const serviceAccount = require('../workshop-bot-286003-597bb10efe90.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const quotes = db.collection('quotes');

// Handlers
app.get('/', async (req, res) => {
	let data = []
	await quotes.get().then(querySnapshot => {
		let docs = querySnapshot.docs;
		for (let doc of docs) {
			const selectedItem = {
				id: doc.id,
				name: doc.data().name,
				quote: doc.data().quote
			};
			data.push(selectedItem);
		}
	})
	.then( response => {
		res.render('index.ejs', { quotes: data });
	})
	.catch(error => console.error(error));
})

app.post('/quotes', async (req, res) => {
	await quotes.add(req.body)
	.then(result => {
		res.redirect('/');
	})
	.catch(error => console.error(error));
})

app.put('/quotes', (req, res) => {
	console.log(req.body)
  })

// App listner
app.listen(3000, function() {
	console.log('listening on 3000')
}) 