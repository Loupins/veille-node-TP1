var express = require('express');
var app = express();
app.use(express.static('public'));
const MongoClient = require('mongodb').MongoClient;
var util = require("util");
const ObjectID = require('mongodb').ObjectID;
const peupler = require("./mes_modules/peupler");

/* on associe le moteur de vue au module «ejs» */
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs'); // générateur de template

///////////////////////////////////// ROUTE ACCUEIL
app.get('/accueil', function(req,res) {
	res.render('composants/accueil.ejs')
})

app.get('/adresses', function (req, res) {
   var cursor = db.collection('adresse')
                .find().toArray(function(err, resultat){
	if (err) return console.log(err)
 	console.log('util = ' + util.inspect(resultat));
	 // transfert du contenu vers la vue index.ejs (renders)
	 // affiche le contenu de la BD
	res.render('composants/adresses.ejs', {adresses: resultat})
	}) 
})

app.post('/ajouter', (req, res) => {
	console.log(req.body._id)
	if(req.body._id ==""){
		console.log("nouveau");
		let objet ={
			nom:req.body.nom,
			prenom:req.body.prenom,
			courriel: req.body.courriel,
			telephone:req.body.telephone
		}
		db.collection('adresse').save(objet, (err, result) => {
		if (err) return console.log(err)
			console.log('sauvegarder dans la BD')
			res.redirect('/adresses')
		})
	}else{
		console.log("modifier");
		let objet = {
			_id: ObjectID(req.body._id),
			nom:req.body.nom,
			prenom:req.body.prenom,
			courriel: req.body.courriel,
			telephone:req.body.telephone
		}
		db.collection('adresse').save(objet, (err, result) => {
			if (err) return console.log(err)
			console.log('sauvegarder dans la BD')
			res.redirect('/adresses')
		})
	}
	
})

app.get('/peupler', (req, res) => {
	let tableauPersonne = peupler();
	for(var i=0;i<20;i++) {
		let tableau = tableauPersonne[i];
		let objet = {
			nom:tableau[0],
			prenom:tableau[1],
			courriel:tableau[2],
			telephone:tableau[3]
		}
		db.collection('adresse').save(objet, (err, result) => {
			if (err) return console.log(err)
			console.log('sauvegarder dans la BD')
		})
	}
	res.redirect('/adresses');
})

app.get('/detruire/:id', (req, res) => {
	var id = req.params.id
	console.log(id)
	db.collection('adresse').findOneAndDelete({"_id": ObjectID(req.params.id)}, (err, resultat) => {
	if (err) return console.log(err)
		res.redirect('/adresses')  // redirige vers la route qui affiche la collection
	})
})

app.get('/vider', (req, res) => {
	db.collection('adresse').remove({}, (err, resultat) => {
		if (err) return console.log(err)
		res.redirect('/adresses')  // redirige vers la route qui affiche la collection
	})
})

app.get('/trier/:cle/:ordre', (req, res) => {
	let cle = req.params.cle;
	let ordre = (req.params.ordre == 'asc' ? 1 : -1)
	let cursor = db.collection('adresse').find().sort(cle,ordre).toArray(function(err, resultat){
		//ordre = !ordre;
		res.render('composants/adresses.ejs', {adresses: resultat, cle, ordre })
	})
});

let db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
	if (err) return console.log(err)
	db = database.db('carnet_adresse')
	// lancement du serveur Express sur le port 8081
	app.listen(8081, () => {
		console.log('connexion à la BD et on écoute sur le port 8081')
	})

	
})

