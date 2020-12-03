//Flags
var FLAG_started = 0;
var FLAG_previewmode = 0;

//Tracers
var nextKey = 0;
var currentKey = 0;
var prevKey = 0;
var gameTimer;
var chosenTime = 60;

//Counters
var COUNTER_total = 0;
var COUNTER_correct = 0;
var COUNTER_incorrect = 0;
var COUNTER_time = 0;
var COUNTER_currentStreak = 0;
var COUNTER_highestStreak = 0;

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

//previewLetter()
function previewLetter(){
		$(".keyboardRow ul li:contains('" + String.fromCharCode(nextKey).toUpperCase() +"')").removeClass("flashNext");
	do{
		nextKey = randomLetter();
	}while(nextKey == currentKey);
	$(".keyboardRow ul li:contains('" + String.fromCharCode(nextKey).toUpperCase() +"')").addClass("flashNext");
	$("#pmLetter").text(String.fromCharCode(nextKey).toUpperCase());
}

//updateLetter()
function updateLetter(){
	prevKey = currentKey;
	$(".keyboardRow ul li:contains('" + String.fromCharCode(currentKey).toUpperCase() +"')").removeClass("highlight");

	do{
		currentKey = randomLetter();
	}while(currentKey == prevKey);

	if(FLAG_previewmode == 1){
		if(nextKey != 0){
			currentKey = nextKey;
		}
		previewLetter();
	}

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
	resetThings();
	clearAllTimeouts();
	COUNTER_time = chosenTime;
	updateAddKeyboard("de");
	updateLetter();
	if(FLAG_previewmode == 1){
		displayPM();
	}
	hideFooter();
	hideScoreboard();
	displayTime();
	displayKeyboard();
	hideSettings();
	hideStreaks();
	hideCursor();
	startTimer();
	updateScoreboard();
	updateStreak();
	FLAG_started = 1;
}

//endGame()
function endGame(){
	updateScoreboard();
	updateStreak();
	if(FLAG_previewmode == 1){
		hidePM();
	}
	endTimer();
	$("#letter").text("");
	delayWrite("letter", "again?")
	updateRemoveKeyboard("highlight");
	updateRemoveKeyboard("flashNext");
	updateRemoveKeyboard("flashCorrect");
	updateRemoveKeyboard("flashIncorrect");
	displayFooter();
	displayScoreboard();
	displaySettings();
	displayStreaks();
	showCursor();
	hideTime();
	hideKeyboard();
	resetThings();
	FLAG_started = 0;
	COUNTER_time = 0;
}

//resetThings()
function  resetThings(){
	nextKey = 0;
	currentKey = 0;
	prevKey = 0;
	COUNTER_total = 0;
	COUNTER_correct = 0;
	COUNTER_incorrect = 0;
	COUNTER_currentStreak = 0;
}

//showCursor()
function showCursor(){
	$("body").css("cursor", "default");
}

//hideCursor()
function hideCursor(){
	$("body").css("cursor", "none");
}

//displayFooter()
function displayFooter(){
	$("#footer").removeClass("reduce");
}

//hideFooter()
function hideFooter(){
	$("#footer").addClass("reduce");
}

//displayKeyboard()
function displayKeyboard(){
	$("#keyboard").css("opacity", "1");
}

//hideKeyboard()
function hideKeyboard(){
	$("#keyboard").css("opacity", "0");
}

//displayScoreboard()
function displayScoreboard(){
	$("#scoreboard").css("opacity", "1");
}

//hideScoreboard()
function hideScoreboard(){
	$("#scoreboard").css("opacity", "0");
}

//displayTime()
function displayTime(){
	$("#time").css("opacity", "0.25");
}

//hideTime()
function hideTime(){
	$("#time").css("opacity", "0");
}

//displaySettings()
function displaySettings(){
	$("#settings").removeClass("reduce cursorDisable");
}

//hideSettings()
function hideSettings(){
	$("#settings").addClass("reduce cursorDisable");
}

//displayStreaks()
function displayStreaks(){
	$("#streaks").removeClass("reduce cursorDisable");
}

//hideStreaks()
function hideStreaks(){
	$("#streaks").addClass("reduce cursorDisable");
}

//changeTime(val)
function changeTime(val){
	chosenTime = val;
	$(".tb").addClass("buttonDe");
	$(".tb:contains('" + val +"')").removeClass("buttonDe");
	localStorage.setItem("storedTime", val);
}

//togglePreviewMode(val)
function togglePreviewMode(val){
	var temp;
	FLAG_previewmode = val;
	$(".pmb").addClass("buttonDe");
	if(val == 0){
		temp = "off";
	}
	else{
		temp = "on";
	}
	$(".pmb:contains('" + temp +"')").removeClass("buttonDe");
	localStorage.setItem("storedPM", val);
}

//displayPM()
function displayPM(){
	$("#pmLetter").css("opacity", "0.25");
}

//hidePM()
function hidePM(){
	$("#pmLetter").css("opacity", "0");
}

//updateScoreboard()
function updateScoreboard(){
	calculateAccuracy();
	calculateLPS();
	$("#correct").text(COUNTER_correct);
	$("#incorrect").text(COUNTER_incorrect);
	if(!isNaN(CALC_accuracy)){
		$("#accuracy").text(CALC_accuracy + "%");
	}
	else{
		$("#accuracy").text("0.00%");
	}
	if((!isNaN(CALC_lps)) && isFinite(CALC_lps)){
		$("#lps").text(CALC_lps + " lps");
	}
	else{
		$("#lps").text("0.00 lps");
	}
}

//updateStreak()
function updateStreak(){
	if(COUNTER_highestStreak < COUNTER_currentStreak){
		COUNTER_highestStreak = COUNTER_currentStreak;
		localStorage.setItem("storedHighest", COUNTER_highestStreak);
	}
	$("#streakCurrent").text(COUNTER_currentStreak);
	$("#streakHighest").text(COUNTER_highestStreak);
}

//calculateAccuracy()
function calculateAccuracy(){
	CALC_accuracy = (100 * (COUNTER_correct / COUNTER_total)).toFixed(2);
}

//calculateLPS()
function calculateLPS(){
	CALC_lps = ((COUNTER_total / (chosenTime - COUNTER_time)).toFixed(2));
}

//startTimer()
function startTimer(){
	$('#time').text(COUNTER_time);
	gameTimer = setInterval(function(){
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
	delayWrite("letter", "how fast are you?");

	if(localStorage.getItem("storedTime") !== null){
		changeTime(localStorage.getItem("storedTime"));
	}

	if(localStorage.getItem("storedPM") !== null){
		togglePreviewMode(localStorage.getItem("storedPM"));
	}

	if(localStorage.getItem("storedHighest") !== null){
		COUNTER_highestStreak = localStorage.getItem("storedHighest");
		updateStreak();
	}
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

	else if((FLAG_started == 0) && (keystroke == 8)){
		event.preventDefault();
		FLAG_started = 1;
		startGame();
	}

	else if((FLAG_started == 0) && (keystroke != 13)){
		clearAllTimeouts();
		$("#letter").text("");
		delayWrite("letter", "thats not enter..");
		$("#keyboard").addClass("ANIMATION_errorWiggle");
		setTimeout(function(){ 
			$("#keyboard").removeClass("ANIMATION_errorWiggle");
		}, 200);
	}

	else if(FLAG_started == 1){
		if(keystroke == currentKey){
			COUNTER_correct++;
			COUNTER_currentStreak++;
			updateStreak();
			$(".keyboardRow ul li:contains('" + String.fromCharCode(keystroke).toUpperCase() +"')").addClass("flashCorrect");
			setTimeout(function(){ 
				$(".keyboardRow ul li:contains('" + String.fromCharCode(keystroke).toUpperCase() +"')").removeClass("flashCorrect");
			}, 150);
			updateLetter();
			COUNTER_total++;
		}

		else if(keystroke == 13){
			endGame();
		}

		else if(keystroke == 8){
			event.preventDefault();
			$("#keyboard").addClass("blink");
			setTimeout(function(){ 
				$("#keyboard").removeClass("blink");
			}, 150);
			setTimeout(function(){
				endGame();
				startGame();
			}, 200);
		}

		else if(keystroke != currentKey){
			COUNTER_incorrect++;
			COUNTER_currentStreak = 0;
			updateStreak();
			$(".keyboardRow ul li:contains('" + String.fromCharCode(keystroke).toUpperCase() +"')").addClass("ANIMATION_errorWiggle flashIncorrect");
			setTimeout(function(){
				$(".keyboardRow ul li:contains('" + String.fromCharCode(keystroke).toUpperCase() +"')").removeClass("ANIMATION_errorWiggle flashIncorrect");
			}, 200);
			COUNTER_total++;
		}
	}
});

introduction();