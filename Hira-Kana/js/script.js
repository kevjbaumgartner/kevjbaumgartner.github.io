//Global flags
var langOne = 0; //Default English
var langTwo = 1; //Default Hiragana
var choiceSize = 4; //Default 4 - representative of n

//Global trackers
var attempts = 0;
var correct = 0;
var incorrect = 0;

//Character dictionary
var dictionary = [
["a","i","u","e","o","ka","ki","ku","ke","ko","sa","shi","su","se","so","ta","chi","tsu","te","to","na","ni","nu","ne","no","ha","hi","fu","he","ho","ma","mi","mu","me","mo","ya","yu","yo","ra","ri","ru","re","ro","wa","wo","n"],
["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","ら","り","る","れ","ろ","わ","を","ん"],
["ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ","サ","シ","ス","セ","ソ","タ","チ","ツ","テ","ト","ナ","ニ","ヌ","ネ","ノ","ハ","ヒ","フ","ヘ","ホ","マ","ミ","ム","メ","モ","ヤ","ユ","ヨ","ラ","リ","ル","レ","ロ","ワ","ヲ","ン"]
];

//Functions
//fontChange(string name of the font-family)
function fontChange(name){
	$("#fontSample").css("font-family", name);
	$("#characterArea").css("font-family", name);
	$(".fontButton").removeClass("chosen");
	$(event.target).addClass("chosen");
}

//nextRound()
function nextRound(){
	var presentedCharacter;
	var characterArray = new Array(choiceSize);

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

		//Fill an array with n position values to use as a pointer
		var randomArray = new Array(characterArray.length);
		for(var i = 0; i < randomArray.length; i++){
			randomArray[i] = i;
		}

		//Generate visible choice elements up to n times
		//Remove the selected index at n from randomArray[] and repeat until all choices presented
		for(var i = 0; i < characterArray.length; i++){
			var min = 0;
			var max = randomArray.length - 1;
			var temp = Math.floor(Math.random() * (max - min + 1) ) + min;
			$("#choiceArray").append('<span id="choice' + randomArray[temp] + '" class="choiceButton" onclick="checkAnswer(' + randomArray[temp] + ')">' + characterArray[randomArray[temp]] + '</span>');
			randomArray.splice(temp, 1);
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
		nextRound();
		correct++
	}
	else{
		$(event.target).addClass("answerFade");
		$("#presentArea").addClass("errorWiggle");
		setTimeout(function(){
			$("#presentArea").removeClass("errorWiggle");
		}, 200);
		incorrect++;
	}
}

//convertTo(string value of desired character, var name of incoming lang, var name of desired lang)
function convertTo(inCharacter, inLang, outLang){
	var temp = dictionary[inLang].indexOf(inCharacter);
	return dictionary[outLang][temp];
}

//Keystroke detection
$(document).keydown(function(event){
	var keystroke;

	try{
		keystroke = event.keyCode || event.which;
	} catch(err){
		alert(err.message);
	}

	if(keystroke == 13){
		FLAG_started = 1;
		startGame();
	}
});

nextRound();