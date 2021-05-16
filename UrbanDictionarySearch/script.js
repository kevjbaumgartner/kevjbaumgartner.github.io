//Variable Declaration
var selectionIndex = 0;
var dictionaryIndex = document.getElementById("indexText");

var dictionaryTitle = document.getElementById("dictionarySectionDetailTitle");
var dictionaryText =  document.getElementById("dictionarySectionDetailText");
var dictionaryExample = document.getElementById("dictionarySectionDetailExample");
var dictionaryBar = document.getElementById("dictionarySectionSearchBar");
var dictionaryDetail = document.getElementById("dictionarySectionDetail");
var dictionaryInfo = document.getElementById("dictionarySectionDetailInfo");
var dictionaryVoteTotal = document.getElementById("accuracyVoteTotal");
var dictionaryAccuracy = document.getElementById("dictionarySectionDetailInfoAccuracy");

var accuracyChartMatrix = document.getElementById("accuracyChart");
var accChartMatrix = new Chart(accuracyChartMatrix, {type: "bar", data: null});

var apiData;

//Reset Search Bar
dictionaryBar.value = null;

function resetIndex(){
	selectionIndex = 0;
	updateIndexText();
	updateDefinition();
}

//updateDefinition(), updates the detail section with live data entry
function updateDefinition(){
	var string = document.getElementById("dictionarySectionSearchBar").value;
	var apiRequest = new XMLHttpRequest();
	apiRequest.open("GET", "http://api.urbandictionary.com/v0/define?term=" + string, true);
	apiRequest.onload = function(){
		apiData = JSON.parse(this.response);

		if((apiRequest.status >= 200 && apiRequest.status < 400) && (apiData.list[selectionIndex] != undefined) && (string != "")){
			dictionaryInfo.classList.remove("sectionHide");
			dictionaryDetail.classList.remove("sectionHide");
			var dataDefinition = scrubString(apiData.list[selectionIndex].definition);
			var dataExample = scrubString(apiData.list[selectionIndex].example);
			var dataVoteTotal = (apiData.list[selectionIndex].thumbs_up + apiData.list[selectionIndex].thumbs_down);
			var dataAccuracy = Number((apiData.list[selectionIndex].thumbs_up / dataVoteTotal) * 100).toFixed(2);
			dictionaryTitle.innerHTML = apiData.list[selectionIndex].word;
			updateIndexText();

			dictionaryText.innerHTML = dataDefinition;
			if(dataDefinition.length < 150){
				dictionaryText.classList.add("center");
			}
			else{
				dictionaryText.classList.remove("center");
			}

			dictionaryExample.innerHTML = "<span class='specialtext'>e.g.</span> " + dataExample;
			if(dataExample.length < 150){
				dictionaryExample.classList.add("center");
			}
			else{
				dictionaryExample.classList.remove("center");
			}

			if(!(isNaN(dataAccuracy))){
				dictionaryAccuracy.innerHTML = dataAccuracy;
				dictionaryVoteTotal.innerHTML = dataVoteTotal;
				updateAccuracyChart(apiData);
			}
			else{
				dictionaryAccuracy.innerHTML = "0.00";
				dictionaryVoteTotal.innerHTML = dataVoteTotal;
			}

			if(dataAccuracy >= 80){
				dictionaryAccuracy.style.color = "#7cd326";
			}
			else if((dataAccuracy < 80) && (dataAccuracy >= 60)){
				dictionaryAccuracy.style.color = "#d28225";
			}
			else{
				dictionaryAccuracy.style.color = "#d12d25";
			}

		}
		else if(string === ""){
			dictionaryDetail.classList.add("sectionHide");
		}
		else if(!(apiData.list[selectionIndex] != undefined)){
			dictionaryTitle.innerHTML = "We cant find anything for " + string;
			dictionaryText.innerHTML = "";
			dictionaryExample.innerHTML = "";
			dictionaryInfo.classList.add("sectionHide");
		}
	}
	apiRequest.send();
}

//
function updateIndexText(){
	dictionaryIndex.innerHTML = (selectionIndex + 1);
}

//
function navLeft(){
	if(selectionIndex != 0){
		selectionIndex -= 1;
		updateDefinition();
		updateIndexText();
	}
}

//
function navRight(){
	if(apiData.list[selectionIndex + 1] != null){
		selectionIndex += 1;
		updateDefinition();
		updateIndexText();
	}
}

//updateAccuracyChart(), updates the chart canvas on updating the word search
function updateAccuracyChart(data){
	accChartMatrix.destroy();
	accChartMatrix = new Chart(accuracyChartMatrix, {
		type:"pie",
		data:{
			labels: ["Thumbs Up", "Thumbs Down"],
			datasets:[{
				label:"# of Votes",
				data:[data.list[selectionIndex].thumbs_up, data.list[selectionIndex].thumbs_down],
				backgroundColor:[
					"#FF8245",
					"#3a86ff"
				],
				borderColor:[
					"#FAFAFA",
					"#FAFAFA"
				],
				borderWidth: 0
			}]
		},
		options: {
			layout: {
				padding: {
				}
			},
			legend: {
				display: false
			},
			tooltips: false,
			cutoutPercentage:50,
			animation: {
				animateRotate: false
			}
		}
	});
}

//scrubString(), scrubs the detail strings and highlights the relevant areas
function scrubString(str){
	var string = str;
	var lb = /([\[])/g;
	var rb = /([\]])/g;
	var hold1;
	hold1 = string.replace(new RegExp(lb, "g"), "");
	var hold2;
	hold2 = hold1.replace(new RegExp(rb, "g"), "");
	return hold2;
}

//changeSearch(), programatically forces the search bar to search for a new term
function changeSearch(term){
	term = term.replace(/[^a-zA-Z ]/g, "");
	dictionaryBar.value = term;
	updateDefinition();
}

document.addEventListener("keyup", function(e){
	if(e.keyCode === 13 && (document.getElementById("dictionarySectionSearchBar").value != "")){
		resetIndex();
	}
});

document.getElementById("dictionarySectionSearchGoButton").addEventListener("click", function(e){
	if(document.getElementById("dictionarySectionSearchBar").value != ""){
		resetIndex();
	}
});