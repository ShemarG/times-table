$(document).ready(function(){

    var storedColors = JSON.parse(localStorage.savedColors);
    var setColor = localStorage.currentColor;
    if (setColor.toLowerCase() == "black"){
        $("body").css("color", "white");
    }
    $("#pointsDiv").append("Points: " + localStorage.points);
    $("body").css("background-color", setColor);
    var buyFX = new Audio("../purchase.mp3");
    var i;

    //localStorage.clear();

    function checkUnlock(){
        if (storedColors.length == 141){
            return true;
        }
        else{
            return false;
        }
    }

    checkUnlock();

    var patternsArray = ["Horizontal Stripes", "Angled Stripes","Honeycomb","Chevrons", "Carbon Fiber", "Microbial Mat", "Dance", "Checkerboard", "Waves", "Vertical Stripes", "Shippo", "Half-rombes", "Transparent", "Simple Horizontal", "White Carbon", "Cross Stripes", "Subtle Dots", "Thin Stripes", "Speckled Noise", "Blueprint Grid", "Argyle"];

    // function svgToBase64Image(svgElement) {
    //     var div = document.createElement('div');
    //     div.appendChild(svgElement.cloneNode(true));
    //     return 'data:image/svg+xml;base64,' + b64;
    // }
    
    // var svgs = document.getElementsByTagName('svg');
    // var urls = [];
    // for (var h = 0; h < svgs.length; i++){
    //   urls.push('url("' + svgToBase64Image(svgs[h]) + '")');
    // }
    // var url = urls.join(',');
    // //document.body.style.background = url;


    function checkColor(){
        var getColor = localStorage.currentColor;
        var refinedColor = getColor.toLowerCase();

        return refinedColor;
    }


    $(".selectionButton").each(function(){
        
        var gotColor = checkColor(); 
        var initialCheck = this.dataset.color;
        var initialCheckLow = initialCheck.toLowerCase();
        var initialCheckResult = check(this);
        var initialCheckH = this.dataset.hex;

    
       if (initialCheckResult != -1){
            $(this).empty();
            $(this).append("<center><div class='colorDisplay' style='background-color:" + initialCheck + "'</div></center><p>" + initialCheck + "</p><p style='color:green'>Owned &#10004;</p>")
       }else{}

       if (initialCheckLow == gotColor){
            $(this).css("background-color", "#99edff");
       }
       $(this).mouseenter(function(){
            
           $("body").animate({backgroundColor: jQuery.Color("'" + initialCheckH + "'")}, 1000);

            if (initialCheckLow == "black"){
                $("body").animate({color: "white"},100);
            }
       
       }).mouseleave(function(){

           $("body").stop();
           $("body").css("background-color", localStorage.currentColor);
           $("body").css("color", "black");

       });
    });

    
    //console.log(localStorage.savedColors);

    $(".selectionButton").click(function(){
            process(this);
           
    });

   function check(entry){
        var refinedEntry = entry.dataset.color;
        var result = storedColors.indexOf(refinedEntry);

        return result;

    }

    function process(button){ 

        var lookUp = check(button); 
        var input = button.dataset.color;
        var input2 = button.dataset.hex;

        if (lookUp == -1){
            buy(input, button, input2);
        }
        else{
            $("body").css("background-color", input)
            localStorage.currentColor = input;
            localStorage.currentHex = input2;
            //console.log(localStorage.currentColor);
            var getColor = checkColor();

            $(".selectionButton").each(function(){
                var input3 = this.dataset.color;
                var input3Low = input3.toLowerCase();

                if (input3Low != getColor){
                    $(this).css("background-color", "");
                }else{
                    $(this).css("background-color", "#99edff");
                }

            });
            
        }

        //console.log(input);
        
    }

    function buy(x , y, z){

        if (localStorage.points > 10){
            
            localStorage.points = (localStorage.points - 10);
            $("#pointsDiv").empty();
            $("#pointsDiv").append("Points: " + localStorage.points)
            $("body").css("background-color", x)
            $(y).empty();
            $(y).append("<center><div class='colorDisplay' style='background-color:" + x + "'</div></center><p>" + x + "</p><p style='color:green'>Owned &#10004;</p>")
            $(y).css("background-color", "blue");
            localStorage.currentColor = x;
            localStorage.currentHex = z;
            var getColor = checkColor()
            storedColors.push(x);
            localStorage.setItem("savedColors", JSON.stringify(storedColors));
            console.log(storedColors);
            buyFX.load();
            buyFX.play();
            $(".selectionButton").each(function(){
                var input2 = this.dataset.color;
                var input2Low = input2.toLowerCase();

                console.log(input2Low);
                console.log(getColor);

                if (input2Low != getColor){
                    $(this).css("background-color", "");
                }else{
                    $(this).css("background-color", "#99edff");
                }

             });

        }else{
            alert("Not enough points!");
        }
    }







});

