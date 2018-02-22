"use strict";
const tableau = require('./tableaux.js');
const tabNom = tableau.tabNom;
const tabPrenom = tableau.tabPrenom;
const tabCourriel = tableau.tabCourriel;
const tabTelephone = tableau.tabTelephone;
const tabCaractere = tableau.tabCaractere;

const peupler_json = () => {
	let tabToutesLesPersonnes = [];
	let tabPersonne = [];
	let position = 0;
	for (let k=0;k<20;k++) {
		tabPersonne = [];
		position = Math.floor(Math.random()*tabNom.length);
		var nom = tabNom[position];
		tabPersonne.push(nom);

		position = Math.floor(Math.random()*tabPrenom.length);
		var prenom = tabPrenom[position];
		tabPersonne.push(prenom);

		position = Math.floor(Math.random()*tabCourriel.length);
		var courriel = tabCourriel[position];
		position = Math.floor(Math.random()*tabCaractere.length);
		var caractere = tabCaractere[position];
		var email = prenom.toLowerCase() + caractere + nom.toLowerCase() + "@" + courriel;
		tabPersonne.push(email);

		position = Math.floor(Math.random()*tabTelephone.length);
		var telephone = tabTelephone[position];
		for(var i = 0; i<7;i++) {
			telephone += Math.floor(Math.random() * 10)
			if(i==2) {
				telephone += "-";
			}
		}
		tabPersonne.push(telephone);

		tabToutesLesPersonnes.push(tabPersonne);
	}
	console.log("tableau personne : " + tabToutesLesPersonnes);
	return(tabToutesLesPersonnes);
}
module.exports = peupler_json;