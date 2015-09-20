$(function(){
    Parse.$ = jQuery;
    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("10v7y0k98zxI0v6s4pDYaj6ihiASOhZC4IXs28QD", "3cp3Kers4Cmcb21kBl5kxClZskjwNWN83x9NG985");    // Inits Parse and checks if user is logged in
    var currentUser = Parse.User.current();
    if (!currentUser) {
        // do stuff with the user
        window.location.replace("./index.html");
    }

    $("#user").text(currentUser.get("username"));

    // Event handler when user logs out
    $("#log-out").on('click', function(e){
      Parse.User.logOut();
      var currentUser = Parse.User.current();  // this will now be null
      window.location.replace("./index.html");
    });



});




var pokemons = [
    {
      name: "charizard",
      first: "img/pokemon/dark-charizard.jpg",
      second: "img/pokemon/charizard.png"
    },
    {
      name: "jigglypuff",
      first: "img/pokemon/dark-jigglypuff.jpg",
      second: "img/pokemon/jigglypuff.png"
    },
    {
      name: "mewto",
      first: "img/pokemon/dark-mewto.jpg",
      second: "img/pokemon/mewto.png"
    },
    {
      name: "pikachu",
      first: "img/pokemon/dark-pikachu.jpg",
      second: "img/pokemon/pikachu.png"
    },
    {
      name: "venusaur",
      first: "img/pokemon/dark-venusaur.jpg",
      second: "img/pokemon/venusaur.png"
    },
    {
      name: "metapod",
      first: "img/pokemon/dark-metapod.png",
      second: "img/pokemon/metapod.gif"
    },
    {
      name: "onix",
      first: "img/pokemon/dark-onix.png",
      second: "img/pokemon/onix.jpg"
    },
    {
      name: "kadabra",
      first: "img/pokemon/dark-kadabra.png",
      second: "img/pokemon/kadabra.png"
    },
    {
      name: "john cena!!!!!!!",
      first: "img/pokemon/dark-john.jpg",
      second: "img/pokemon/john-cena.png"
    },
    {
      name: "obamasnow",
      first: "img/pokemon/dark-squirtle.png",
      second: "img/pokemon/squirtle.jpeg"
    },
    {
      name: "rhyperior",
      first: "img/pokemon/dark-rhyperior.png",
      second: "img/pokemon/rhyperior.png"
    },
    {
      name: "sismisage",
      first: "img/pokemon/dark-sismisage.png",
      second: "img/pokemon/sismisage.png"
    },
    {
      name: "skorupi",
      first: "img/pokemon/dark-skorupi.png",
      second: "img/pokemon/skorupi.png"
    },
    {
      name: "zapdos",
      first: "img/pokemon/dark-zapdos.png",
      second: "img/pokemon/zapdos.png"
    },
    {
      name: "electrode",
      first: "img/pokemon/dark-electrode.png",
      second: "img/pokemon/electrode.png"
    },
];

var score = 0;
var lifes = 3;
var message = "";
var pos = getRandomPokemon(0, pokemons.length);

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomPokemon(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getPokemons(){
  var darkPokemon = '<img src='+ pokemons[pos].first + ' class="img-responsive center-block wow bounceInDown"/>';
  var clearPokemon = '<img src='+ pokemons[pos].second + ' class="img-responsive center-block wow slideInUp hide"/>';
  $("#pokemonWrap").html(darkPokemon);
  $("#pokemonAnswerWrap").html(clearPokemon);
}


function clearForm(){
  $("#guess").val("");
  $("#status").text("");
  $("#submit").attr("disabled", false);
  $("#next").attr("disabled", true);
  $("#imgGood").addClass("hide");
  $("#imgBad").addClass("hide");
}

function checkGame(){
  if(score === 10){
    clearForm();
    $("#status").text("Congrats Pokémon master");
    $("#imgWin").removeClass("hide");
    $("#tweetLink").removeClass("hide");
    message = "I just beat Pok-é-mön, join the party at @ pok-e-mon.com";
  }
  else if(lifes === 0){
    clearForm();
    $("#status").text("Sorry, you died in the hands of Drake");
    $("#imgLose").removeClass('hide');
    $("#tweetLink").removeClass("hide");
    message = "I just got beaten down on Pok-é-mön, try to beat my score at @ pok-e-mon.com";

  }
}


$("#tweetLink").on("click", function(){
  encodeURL();
});

function encodeURL(){
  var text = message;
  var encoded = encodeURIComponent(text);
  $("#tweetLink").attr("href", "https://twitter.com/intent/tweet?text=" + encoded);
};


function reset(){
  score = 0;
  lifes = 3;
  $("#score").text(score);
  $("#lifes").text(lifes);
  $("#next").attr("disabled", true);
}

$(document).ready(function(){
  reset();
  getPokemons();
});

$("#submit").on("click", function(){
  checkGame();
  var guess = $("#guess").val().toLowerCase();
  var answer = pokemons[pos].name;
  $("#pokemonAnswerWrap img").removeClass("hide");
  $("#submit").attr("disabled", true);
  $("#next").attr("disabled", false);
  if(guess === answer){
    score += 1;
    $("#status").text("Correct!");
    $("#score").text(score);
    $("#imgGood").removeClass("hide");
    checkGame();
  }
  else{
    $("#status").text("Sorry, the answer is: " + pokemons[pos].name );
    lifes -= 1;
    $("#lifes").text(lifes);
    $("#imgBad").removeClass("hide");
    checkGame();

  }

});

$("#next").on("click", function(){
  clearForm();
  pos = getRandomPokemon(0, pokemons.length);
  getPokemons();
});

new WOW().init();
