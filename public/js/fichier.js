(function(){
	$(".sauver").on( "click", function(event) {
		event.preventDefault();
		let parent = $(this).parent().parent();
		let identifiant = parent.children().eq(0);
		let nom = parent.children().eq(1);
		let prenom = parent.children().eq(2);
		let telephone = parent.children().eq(3);
		let courriel = parent.children().eq(4);
		console.log($("mon_formulaire_cache input").eq(0))
		$(".mon_formulaire_cache input").eq(0).val(identifiant.text());
		$(".mon_formulaire_cache input").eq(1).val(nom.text());
		$(".mon_formulaire_cache input").eq(2).val(prenom.text());
		$(".mon_formulaire_cache input").eq(3).val(telephone.text());
		$(".mon_formulaire_cache input").eq(4).val(courriel.text());
		$(".mon_formulaire_cache").submit();
	});

	$("tr th a").on( "click", function(event) {
		let cles = ["id", "nom", "prenom", "telephone", "courriel"];
		let url = window.location.href.split("/");
		let cle = url[4];
		if(url[5] == 'asc') {
			document.querySelectorAll("tr")[0].children[cles.indexOf(cle)].children[0].setAttribute("href", "/trier/"+cle+"/desc");
		} else {
			document.querySelectorAll("tr")[0].children[cles.indexOf(cle)].children[0].setAttribute("href", "/trier/"+cle+"/asc");
		}
	});

	$(".burger").on("click", function(event) {
		if($(".menu").css("display") != "block") {
			$(".menu").css("display", "block");
		} else {
			$(".menu").css("display", "none");
		}
		
	});
}());