let pageid="";

setimages();

function setimages(){
	let loc=window.location.href
	console.log(loc)
	let question = loc.split('/')
	pageid = question[question.length-1]
}

console.log("hel")