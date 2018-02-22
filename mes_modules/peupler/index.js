"use strict";
const tableau = require('./tableaux.js');
const tabNom = tableau.tabNom;
const tabPrenom = tableau.tabPrenom;
const tabCourriel = tableau.tabCourriel;
const tabTelephone = tableau.tabTelephone;
const max = tabNom.length;
console.log('max = ' + max);
const peupler_json = () => {
	let tabToutesLesPersonnes = [];
	let tabPersonne = [];
	let position = 0;
	for (let k=0;k<20;k++) {
		tabPersonne = [];
		position = Math.floor(Math.random()*tabNom.length);
		tabPersonne.push(tabNom[position]);
		position = Math.floor(Math.random()*tabPrenom.length);
		tabPersonne.push(tabPrenom[position]);
		position = Math.floor(Math.random()*tabCourriel.length);
		tabPersonne.push(tabCourriel[position]);
		position = Math.floor(Math.random()*tabTelephone.length);
		tabPersonne.push(tabTelephone[position]);
		tabToutesLesPersonnes.push(tabPersonne);
	}
	console.log("tableau personne : " + tabToutesLesPersonnes);
	return(tabToutesLesPersonnes);
}
module.exports = peupler_json;