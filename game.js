// alert("hii");
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var startedToToggle = false ;
var level = 0 ;

$(document).keypress(function(){
	
	if(!startedToToggle)
	{
		$("#level-title").html("Level "+level);
		nextSequence();
		startedToToggle= true ;
	}
});

$(".btn").click(function()
{
	var userChoosenColor = $(this).attr("id");
	userClickedPattern.push(userChoosenColor);

	playSound(userChoosenColor);
	animatePress(userChoosenColor);
	
	checkAnswer(userClickedPattern.length - 1);
});

function nextSequence()
{
	userClickedPattern = [];

	level= level + 1;
	$("#level-title").text("Level "+level);

	var randomNumber = Math.floor(Math.random()*4);
	var randomChoosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChoosenColor);
	
	$("#"+ randomChoosenColor).fadeIn(100).fadeOut(200).fadeIn(100);

	playSound(randomChoosenColor);
}

function playSound(name)
{
	
	var audio = new Audio("sounds/" + name + ".mp3");
  	audio.play();
}

function animatePress(currentColor)
{
	var element = $("#"+currentColor);
	element.addClass("pressed");
	setTimeout(function() {
	element.removeClass('pressed');
	}, 200);

}

// check answer
function checkAnswer(currentlevel)
{
	console.log("wsucess");
	if(gamePattern[currentlevel] === userClickedPattern[currentlevel])
	{
		if (userClickedPattern.length === gamePattern.length) 
		{
			 setTimeout(function () 
			 {
          		nextSequence();
       		 }, 1000);
		}
	}
	else
	{
		playSound("wrong");
		var element = $("body");
			element.addClass("game-over");
			setTimeout(function() {
			element.removeClass("game-over");
			}, 200);
		$("#level-title").text("Game Over, Press any key to Restart");
		startOver();
	}
}

function  startOver()
{
	level = 0 ;
	gamePattern = [];
	startedToToggle = false;

}