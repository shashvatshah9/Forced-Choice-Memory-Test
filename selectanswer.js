var fs = require('fs')
var dir = './questions/'
var totalquestion;

function listquestions(questionid, callback){
	let filename=dir+questionid
	var questions=[]
	fs.readdir(filename, (err, names)=>{
		if(err)
  		console.log(err);
  		else{
			names.forEach(name=>{
				if(!isNaN(name)){
					questions.push(name)
				}
			})
		}
		questions.sort(function(a,b){return a-b;})
		totalquestion = questions.length
		return callback({questionlist: questions})
	})
}

function getanswers(questionid, callback){
	let filename = dir+questionid+'/answers.txt'
	fs.readFile(filename, 'utf8', function(err, data) {
		if(err)
  		console.log(err);
  		else{
			var answers = data.toString().split("\n");

			let ob = {answer: answers.slice(0,answers.length-1)}
			return callback(ob)
		}
	});	
} 

module.exports.listquestions=listquestions
module.exports.getanswers=getanswers
