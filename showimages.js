
//time config

var seconds=60,mins=9; // total mins for break
var interquestion=3000; // interduration time gap
var delay1=5000  // delay
var persecond=1000 // for counter
//

var questionid,t;
var myIndex = 0;

getpath()
carousel();

// to get the question number
function getpath(){
	let loc=window.location.href
	let question = loc.split('/')
	questionid = question[question.length-2]
}

// to iterate the images
function carousel() {
	var i;
	var x = document.getElementsByClassName("mySlides");
	for (i = 0; i < x.length; i++) { x[i].style.display = "none"; } myIndex++;
	if (myIndex > x.length) {
		myIndex = -1; 
		document.getElementById('status').innerHTML="<center><bold>Memorization phase of this test is now over, now we will move to 10 mins break.</bold></center>";
		setTimeout(moveToBreak, delay1);
	}
	x[myIndex-1].style.display = "block";
	setTimeout(carousel, interquestion); 
}

function moveToBreak(){
	document.getElementById('status').innerHTML="";
	startCounter();
}

// to handle the break

function sub(){
	seconds--;
	
	if(seconds==0 && mins==0){
		clearTimeout(t)
		mins=0
		seconds=0
		document.getElementById('count_down').innerHTML = mins+" : "+seconds;
		document.getElementById('status').innerHTML="<center><bold>Recall test will start now</bold></center>";
		end()
		return
	}

	else if(seconds==0){
		seconds=60;
		mins--;
	}

	
	document.getElementById('count_down').innerHTML = mins+" : "+seconds;
	timer();
	
}

function startCounter(){
	var timeDisp = document.getElementById('count_down');
	timeDisp.innerHTML = mins+" : "+seconds;
	timer();
}

function timer(){
	t = setTimeout(sub,persecond);
}

function end(){
	//var request = new XMLHttpRequest()
	window.location = 'http://localhost:3000/answer/'+questionid
	
}