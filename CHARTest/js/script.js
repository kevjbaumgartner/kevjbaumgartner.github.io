//Flags
var FLAG_started = 0;

//Tracers
var currentKey = 0;
var prevKey = 0;
var gameTimer;

//Counters
var COUNTER_total = 0;
var COUNTER_correct = 0;
var COUNTER_incorrect = 0;
var COUNTER_time = 0;

//Calculations
var CALC_accuracy = 0;
var CALC_lps = 0;

//Functions
//randomLetter()
function randomLetter(){
	var temp;
	var min;
	var max;

	min = 65;
	max = 90

	temp = Math.floor(Math.random() * (max - min + 1) ) + min;
	return temp;
}

//updateLetter()
function updateLetter(){
	prevKey = currentKey;
	$(".keyboardRow ul li:contains('" + String.fromCharCode(currentKey).toUpperCase() +"')").removeClass("highlight");

	do{
		currentKey = randomLetter();
	}while(currentKey == prevKey);

	$(".keyboardRow ul li:contains('" + String.fromCharCode(currentKey).toUpperCase() +"')").addClass("highlight");
	$("#letter").text(String.fromCharCode(currentKey).toUpperCase());
}

//updateAddKeyboard(cls)
function updateAddKeyboard(cls){
	for(var i = 65; i <= 90; i++){
		$(".keyboardRow ul li:contains('" + String.fromCharCode(i).toUpperCase() +"')").addClass(cls);
	}
}

//updateRemoveKeyboard(cls)
function updateRemoveKeyboard(cls){
	for(var i = 65; i <= 90; i++){
		$(".keyboardRow ul li:contains('" + String.fromCharCode(i).toUpperCase() +"')").removeClass(cls);
	}
}

//startGame()
function startGame(){
	clearAllTimeouts();
	updateAddKeyboard("de");
	updateLetter();
	hideFooter();
	hidescoreboardLeft();
	startTimer();
	updateScoreboardLeft();
}

//endGame()
function endGame(){
	endTimer();
	$("#letter").text("");
	delayWrite("letter", "Again?")
	updateRemoveKeyboard("de highlight");
	displayFooter();
	displayscoreboardLeft();
	FLAG_started = 0;
	currentKey = 0;
	prevKey = 0;
	COUNTER_total = 0;
	COUNTER_correct = 0;
	COUNTER_incorrect = 0;
	COUNTER_time = 0
}

//displayFooter()
function displayFooter(){
	$("#footer").removeClass("reduce");
}

//hideFooter()
function hideFooter(){
	$("#footer").addClass("reduce");
}

//displayscoreboardLeft()
function displayscoreboardLeft(){
	$("#scoreboardLeft").removeClass("reduce");
}

//hidescoreboardLeft()
function hidescoreboardLeft(){
	$("#scoreboardLeft").addClass("reduce");
}

//updateScoreboardLeft()
function updateScoreboardLeft(){
	calculateAccuracy();
	calculateLPS();
	console.log(CALC_accuracy);

	$("#total").text(COUNTER_total);
	$("#correct").text(COUNTER_correct);
	$("#incorrect").text(COUNTER_incorrect);
	if(!isNaN(CALC_accuracy)){
		$("#accuracy").text(CALC_accuracy + "%");
	}
	else{
		$("#accuracy").text("0.00%");
	}
	if(!isNaN(CALC_lps)){
		$("#lps").text(CALC_lps + " lps");
	}
	else{
		$("#lps").text("0.00 lps");
	}
}

//calculateAccuracy()
function calculateAccuracy(){
	CALC_accuracy = (100 * (COUNTER_correct / COUNTER_total)).toFixed(2);
}

//calculateLPS()
function calculateLPS(){
	CALC_lps = ((COUNTER_total / (60 - COUNTER_time)).toFixed(2));
}

//startTimer()
function startTimer(){
	COUNTER_time = 60;
	$('#time').text(COUNTER_time);
	gameTimer = setInterval(function(){
		updateScoreboardLeft();
		COUNTER_time--;
		$('#time').text(COUNTER_time);
		if (COUNTER_time == 0) {
			clearInterval(gameTimer);
			endGame();
		}
	}, 1000);
}

//endTimer()
function endTimer(){
	clearInterval(gameTimer);
	COUNTER_time = 0;
	$('#time').text("");
}

//introduction()
function introduction(){
	delayWrite("letter", "Hello, wanna play?");
}

//clearAllTimeouts()
function clearAllTimeouts(){
	var id = window.setTimeout(function() {}, 0);

	while (id--) {
		window.clearTimeout(id);
	}
}

//delayWrite(id, message)
function delayWrite(id, message){
	for(var i = 0; i < delaySplit(message).length; i++){
		delayTimer(i, id, delaySplit(message));
	}

	function delaySplit(message){
		var splitString = message.split("");
		return splitString;
	}

	function delayTimer(i, id, chars){
		setTimeout(function() {
			$("#" + id).append(chars[i]);
		}, 1000 * (i/25));
	}
}

//Keystroke detection
$(document).keydown(function(event){
	var keystroke;

	try{
		keystroke = event.keyCode || event.which;
	} catch(err){
		alert(err.message);
	}

	if((FLAG_started == 0) && (keystroke == 13)){
		FLAG_started = 1;
		startGame();
	}

	else if((FLAG_started == 0) && (keystroke != 13)){
		clearAllTimeouts();
		$("#letter").text("");
		delayWrite("letter", "That's not ENTER...");
		$("#keyboard").addClass("ANIMATION_errorWiggle");
		setTimeout(function(){ 
			$("#keyboard").removeClass("ANIMATION_errorWiggle");
		}, 200);
	}

	else if(FLAG_started == 1){
		COUNTER_total++;
		updateScoreboardLeft();

		if(keystroke == currentKey){
			COUNTER_correct++;
			$(".keyboardRow ul li:contains('" + String.fromCharCode(keystroke).toUpperCase() +"')").addClass("flashCorrect");
			setTimeout(function(){ 
				$(".keyboardRow ul li:contains('" + String.fromCharCode(keystroke).toUpperCase() +"')").removeClass("flashCorrect");
			}, 150);
			updateLetter();
		}

		else if(keystroke == 13){
			endGame();
		}

		else if(keystroke != currentKey){
			COUNTER_incorrect++;
			$(".keyboardRow ul li:contains('" + String.fromCharCode(keystroke).toUpperCase() +"')").addClass("ANIMATION_errorWiggle flashIncorrect");
			setTimeout(function(){
				$(".keyboardRow ul li:contains('" + String.fromCharCode(keystroke).toUpperCase() +"')").removeClass("ANIMATION_errorWiggle flashIncorrect");
			}, 200);
		}
	}
});

introduction();