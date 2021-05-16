//Global flags
var inProgress = 0;
var settingsOpen = 0;
var langOne = 0; //Default Romaji
var langTwo = 1; //Default Hiragana
var choiceSize = 4; //Default 4 - representative of n

//Global trackers
var attempts = 0;
var correct = 0;
var incorrect = 0;

//Character dictionary
//1 - Romaji, 2 - Hiragana. 3 - Katakana
var dictionary = [
["a","i","u","e","o","ka","ki","ku","ke","ko","sa","shi","su","se","so","ta","chi","tsu","te","to","na","ni","nu","ne","no","ha","hi","fu","he","ho","ma","mi","mu","me","mo","ya","yu","yo","ra","ri","ru","re","ro","wa","wo","n"],
["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","ら","り","る","れ","ろ","わ","を","ん"],
["ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ","サ","シ","ス","セ","ソ","タ","チ","ツ","テ","ト","ナ","ニ","ヌ","ネ","ノ","ハ","ヒ","フ","ヘ","ホ","マ","ミ","ム","メ","モ","ヤ","ユ","ヨ","ラ","リ","ル","レ","ロ","ワ","ヲ","ン"]
];

//Choice Arrays
var characterArray;
var scrambledArray;

//Functions
//changeLangOne(var name of the desired lang)
function changeLangOne(lang){
	langOne = lang;
	$(".langOneButton").removeClass("chosen");
	$(event.target).addClass("chosen");
	newRound();
}

//changeLangTwo(var name of the desired lang)
function changeLangTwo(lang){
	langTwo = lang;
	$(".langTwoButton").removeClass("chosen");
	$(event.target).addClass("chosen");
	newRound();
}

//nextRound()
function nextRound(){
	var presentedCharacter;
	characterArray = new Array(choiceSize);
	scrambledArray = new Array(choiceSize);

	//newCharacter(var name of the desired lang)
	function newCharacter(lang){
		var min = 0;
		var max = dictionary[0].length - 1;
		var temp = Math.floor(Math.random() * (max - min + 1) ) + min;
		var character = dictionary[lang][temp];
		return character;
	}

	//presentCharacter()
	function presentCharacter(){
		presentedCharacter = newCharacter(langTwo);
		$("#characterPresent").text(presentedCharacter);
	}

	//presentChoices()
	function presentChoices(){
		//Clear the visible area of all previous choice elements
		$("#choiceArray").text("");
		//Generate n-1 characters to fill characterArray[]
		for(var i = 0; i < characterArray.length - 1; i++){
			var repeat = 0;
			var temp = newCharacter(langOne);

			//No repeated correct character
			if(temp == convertTo(presentedCharacter, langTwo, langOne)){
				i--;
				continue;
			}
			else{
				//No repeated choices in the array
				for(var j = 0; j < characterArray.length; j++){
					if(temp == characterArray[j]){
						repeat = 1;
						break;
					}
				}
				if(repeat == 0){
					characterArray[i] = temp;
					continue;
				}
				else if(repeat == 1){
					i--;
					continue;
				}
			}
		}
		
		//Ensure that the correct character exists as a choice
		characterArray[characterArray.length - 1] = convertTo(presentedCharacter, langTwo, langOne);

		//Fill an array with n position values to use as pointers
		var randomArray = new Array(characterArray.length);
		for(var i = 0; i < randomArray.length; i++){
			randomArray[i] = i;
		}

		//Generate visible choice elements up to n times
		//Remove the selected index at n from randomArray[] and repeat until all choices are placed into a new randomized array, scrambledArray[]
		for(var i = 0; i < characterArray.length; i++){
			var min = 0;
			var max = randomArray.length - 1;
			var temp = Math.floor(Math.random() * (max - min + 1) ) + min;

			scrambledArray[i] = characterArray[randomArray[temp]];
			randomArray.splice(temp, 1);
		}

		//Append n elements for each choice option in scrambledArray[]
		for(var i = 0; i < scrambledArray.length; i++){
			$("#choiceArray").append('<span id="choice' + i + '" class="choiceButton" onclick="checkAnswer(' + i + ')">' + scrambledArray[i] + '</span>');
		}
	}

	//Resolve visible elements
	presentCharacter();
	presentChoices();

	//Increment total guesses
	attempts++;
}

//checkAnswer(int value of the choice they chose)
function checkAnswer(choiceChosen){
	if($('#choice' + choiceChosen).text() == convertTo($("#characterPresent").text(), langTwo, langOne)){
		var point = "#choice" + choiceChosen;
		$(point).addClass("answerCorrect");
		setTimeout(function(){
			newRound();
		}, 200);
		correct++
	}
	else{
		var point = "#choice" + choiceChosen;
		$(point).addClass("errorWiggle answerIncorrect");
		setTimeout(function(){
			$(point).removeClass("errorWiggle answerIncorrect");
		}, 200);
		incorrect++;
	}
}

//convertTo(string value of desired character, var name of incoming lang, var name of desired lang)
function convertTo(inCharacter, inLang, outLang){
	var temp = dictionary[inLang].indexOf(inCharacter);
	return dictionary[outLang][temp];
}

//Click detection
$(document).click(function(event){

	//If the settings menu is open
	//Close it if the user clicks somewhere outside the settings menu (aka the shade)
	if(event.target.id == "settingsShade"){
		settingsOpen = 0;
		$("#settingsShade").addClass("opacityHide");
		$("#settingsArea").addClass("opacityHide");
		$("#footerInstructions #2").text("Press ESC to show the settings")
	}
});

//Keystroke detection
$(document).keydown(function(event){
	var keystroke;
	try{
		keystroke = event.keyCode || event.which;
	}catch(err){
		alert(err.message);
	}

	//Show settings menu on ESC
	if(keystroke == 27 && settingsOpen == 0){
		settingsOpen = 1;
		$("#settingsShade").removeClass("opacityHide");
		$("#settingsArea").removeClass("opacityHide");
		$("#footerInstructions #2").text("Press ESC to hide the settings")
	}

	//Hide settings menu on ESC if it's open
	else if(keystroke == 27 && settingsOpen == 1){
		settingsOpen = 0;
		$("#settingsShade").addClass("opacityHide");
		$("#settingsArea").addClass("opacityHide");
		$("#footerInstructions #2").text("Press ESC to show the settings")
	}

	//Start on ENTER
	if(keystroke == 13 && inProgress == 0 && settingsOpen != 1){
		startRound();
	}
	//End on ENTER if the round is in progress
	else if(keystroke == 13 && inProgress == 1 && settingsOpen != 1){
		newRound();
	}
	//Check answer on NUMBER if the round is in progress
	else if(keystroke != 13 && inProgress == 1 && settingsOpen != 1){
		switch(keystroke){
			case 49:
				checkAnswer(0);
				break;
			case 50:
				checkAnswer(1);
				break;
			case 51:
				checkAnswer(2);
				break;
			case 52:
				checkAnswer(3);
				break;
			case 53:
				checkAnswer(4);
				break;
			case 54:
				checkAnswer(5);
				break;
			case 55:
				checkAnswer(6);
				break;
			case 56:
				checkAnswer(7);
				break;
			case 57:
				checkAnswer(8);
				break;
			case 48:
				checkAnswer(9);
				break;
			default:
				break;
		}	
	}
});

//startRound()
function startRound(){
	inProgress = 1;
	nextRound();
	$("#startArea").addClass("opacityHide");
	$("#presentArea").removeClass("opacityHide");
	$("#footerInstructions #1").text("Press ENTER to generate a new set of flash cards")
}

//newRound()
//Equivalent to nextRound() with the inclusion of a smooth round transition
function newRound(){
	$("#blinkScreen").removeClass("opacityHide");
	setTimeout(function(){
		$("#blinkScreen").addClass("opacityHide");
		nextRound();
	}, 200);	
}

//endRound() - DEPRECATED
// function endRound(){
// 	inProgress = 0;
// 	$("#startArea").removeClass("opacityHide");
// 	$("#presentArea").addClass("opacityHide");
// 	$("#footerInstructions #1").text("Press ENTER to swap to your flash cards")
// }

//increaseSize(value to increase choiceSize by)
function increaseSize(val){
	choiceSize += parseInt(val);
	updateSize();
	if(choiceSize == 10){
		$("#sizeUp").addClass("inactiveButton")
	}
	else{
		$("#sizeUp").removeClass("inactiveButton")
		$("#sizeDown").removeClass("inactiveButton")
	}
}

//decreaseSize(value to decrease choiceSize by)
function decreaseSize(val){
	choiceSize -= parseInt(val);
	updateSize();
	if(choiceSize == 2){
		$("#sizeDown").addClass("inactiveButton")
	}
	else{
		$("#sizeDown").removeClass("inactiveButton")
		$("#sizeUp").removeClass("inactiveButton")
	}
}

//updateSize(desired choiceSize value)
function updateSize(){
	newRound();
	$("#sizeNum").text(choiceSize);
}