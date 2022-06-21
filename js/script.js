var nom_fruits = ["citron", "fraise", "poire", "orange"];
var fruits_joues = ["", "", ""];
var coup_en_cours = 0;
var score = 0;
var tours_restants = 5;
$("#game_over").hide();

$("#button_play").click(function(){
  var fruit_a_jouer = "#fruit"+(coup_en_cours+1);
  fruits_joues[coup_en_cours] = choisirFruit($(fruit_a_jouer));
  coup_en_cours++;
  if(coup_en_cours>2){
    calculerScore();
    if(tours_restants<1) {
      gameOver();
      return;
    }
    setTimeout(reinitialiser, 1000);
  }
})

function reinitialiser(){
  coup_en_cours = 0;
  fruits_joues = ["", "", ""];
  $(".carte").children("img").each(function(){
    $(this).attr("src", "img/mystere.jpg");
  });
}

function gameOver(){
  $("#cartes").hide();
  $("#play").hide();
  $("#game_over").show();
}

function choisirFruit(image){
  var indice = entierAleatoire(nom_fruits.length);
  var nom_fruit = nom_fruits[indice];
  image.attr("src", "img/"+nom_fruits[indice]+".jpg");
  return nom_fruit;
}

function entierAleatoire(max) {
  return Math.floor(Math.random() * max);
}

function calculerOccurrence(valeur) {
    var compte = 0;
    fruits_joues.forEach((v) => (v === valeur && compte++));
    return compte;
}

function calculerScore(){
  tours_restants --;
  var max_occurrence = 0;
  fruits_joues.forEach((f) =>
    {
      occ = calculerOccurrence(f);
      if(occ>max_occurrence) max_occurrence = occ;
    }
  );
  if(max_occurrence==2) score += 50;
  if(max_occurrence==3) {
    score += 200;
    tours_restants += 1;
  }
  $("#affichage_score").html("Score : "+score);
  $("#affichage_coups").html("Tours restants : "+tours_restants);
}
