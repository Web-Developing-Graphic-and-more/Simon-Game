
// Data Arrays
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

// On keypress start the game

$(document).keypress(function() {
  if (level === 0) {
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

// Save clicked color

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

  return playSound(userChosenColour), animatePress(userChosenColour);
});

// Answer Check

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong")
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
      $("#level-title").text("Game over, Press Any Key to Restart")
      startOver();
    }, 200);
  }
}

// Next button sequence

function nextSequence() {

  userClickedPattern = []

  level++

  $("#level-title").text("Level " + level)

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("div#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  return playSound(randomChosenColour);
}

// Button Sound play Function

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3").play();
}

// Animate Press Function
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Restarting Game Function

function startOver() {
    level = 0;
    gamePattern = [];
}
