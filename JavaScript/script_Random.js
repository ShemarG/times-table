$(document).ready(function(){

	var first = [1,2,3,4,5,6,7,8,9,10,11,12];
	var second = [1,2,3,4,5,6,7,8,9,10,11,12];
	var r1;
	var r2;
	var correct;
	var answer;
	var correctCount = 0;
	var boost = ["GOOD JOB!", "CORRECT!", "KEEP IT UP!", "AWESOME!", "THAT'S RIGHT!", "SWEET!", "You're doing GREAT!", "NICE!"];
	var boostRand;
	var i;

	var rightFX = new Audio("../coin_sound.mp3");
	var wrongFX = new Audio("../incorrect.mp3");;

	generateRands();
	$("#response").append("<h1>" + correctCount + "</h1>");
	$("#pointsDiv").append("Points: " + localStorage.points);

	var setColor = localStorage.currentColor;
    $("body").css("background-color", setColor);

    if (setColor.toLowerCase() == "black"){
       	$("body").css("color", "white");
       	$("#container1").css("border","ridge 5px white");
    }

    $("#entry").focus();

	
	function generateRands(){

		var firstRand = first[Math.floor(Math.random() * first.length)];
		var secondRand = second[Math.floor(Math.random() * second.length)]

		r1 = firstRand;
		r2 = secondRand;

		$("#question").empty();
		$("#question").append("<h1 style='color:black'>" + firstRand + " x " + secondRand + "</h1>");
		
		correct = (firstRand * secondRand);

	};

	function checkRands(){

		answer = $("#entry").val();
		console.log(answer);
		$("#response").empty();
		
		if (answer == correct){
			correctCount++;
			boostRand = boost[Math.floor(Math.random() * boost.length)];
			if(correctCount > 5 && correctCount < 15){
				for(i = 0; i < 3; i++){
					localStorage.points++;
				}
			}else if(correctCount > 15 && correctCount < 25){
				for(i = 0; i < 5; i++){
					localStorage.points++;
				}
			}else if(correctCount > 25){
				for(i = 0; i < 7; i++){
					localStorage.points++;
				}
			}else{
				localStorage.points++;
			}
			$("#response").append("<h1>" + correctCount + "</h1>");
			$("#response").append("<h2>" + boostRand + "<h2>");
			$("#pointsDiv").empty();
			$("#pointsDiv").append("Points: " + localStorage.points);
			$("#question").empty();
			$("#entry").val("");
			rightFX.load();
			rightFX.play();
			generateRands();

		}else if (answer == ""){
			$("#response").append("<h1>" + correctCount + "</h1>");

		}else{

			correctCount = 0;
			$("#response").append("<h1>" + correctCount + "</h1>");
			$("#response").append("<h3 style='font-family: Lucida Console'>" + "Wrong... " + "</h3>" + "<h3 style= 'font-family: Lucida Console'>" + r1 + " x " + r2 + " = " + correct + "</h3>");
			$("#question").empty();
			$("#entry").val("");
			wrongFX.load();
			wrongFX.play();
			generateRands();
		}

	};
	
	$("#next").click(checkRands);
	
	$("#entry").keyup(function(event){
    	if (event.keyCode == 13){
        	checkRands();
     	};
 	});
	
	

});