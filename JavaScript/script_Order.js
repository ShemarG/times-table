$(document).ready(function(){

	var dom = document.getElementById("h1");
	var timesNumber = dom.dataset.number;
	var correct;
	var answer;
	var completeCount = 0;
	var rightFx = $("#right")[0];
	var wrongFX = $("#wrong")[0];
	var score = 0;


	var i = 1;
	var j;
	$("#entry").focus();
	generateOrder();
	$("#response").append("<h1>" + completeCount + "</h1>");
	$("#pointsDiv").append("Points: " + localStorage.points);

	var setColor = localStorage.currentColor;
    $("body").css("background-color", setColor);

    if (setColor.toLowerCase() == "black"){
       	$("body").css("color", "white");
       	$("#container1").css("border","ridge 5px white");
    }

	function generateOrder(){
		$("#question").empty();
		correct = (timesNumber * i);
		$("#question").append("<h1 style='color:black'>" + timesNumber + " x " + i + "</h1>");

	};

	function checkOrder(){
		answer = $("#entry").val();

		$("#response").empty();
		
		if (answer == correct){
			if (i == 12){
				i = 1;
				completeCount++;

				score = completeCount * timesNumber;
				
				if(timesNumber != 10){
					for (j = 0; j < timesNumber; j++) {
						localStorage.points++;
					};
				}else{
					localStorage.points++;
				}
				$("#entry").val("");
				$("#response").append("<h1>" + score + "</h1>");
				if (timesNumber != 10 && timesNumber != 1){
					$("#response").append("+" + timesNumber + " Points!");
				}else{
					$("#response").append("+1 point (This is too easy)");
				}
				$("#pointsDiv").empty();
				$("#pointsDiv").append("Points: " + localStorage.points);
				rightFx.load();
				rightFx.play();
				generateOrder();
			}else{
				i++;
				$("#entry").val("");
				$("#response").append("<h1>" + score + "</h1>");
				rightFx.load();
				rightFx.play();
				generateOrder();	
			}
		}else if (answer == ""){
			$("#response").append("<h1>" + score + "</h1>");

		}else{
			$("#response").append("<h1>" + score + "</h1>");
			$("#response").append("<h3 style='font-family: Lucida Console'>" + timesNumber + " x " + i + " = " + correct + "</h3>");
			i = 1;
			$("#entry").val("");
			wrongFX.load();
			wrongFX.play();
			generateOrder();
		}
	}

	$("#next").click(checkOrder);
	
	$("#entry").keyup(function(event){
    	if (event.keyCode == 13){
        	checkOrder();
     	};
 	});


});