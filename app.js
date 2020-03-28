var reader=require('./selecttest.js')
var testsession = require('./givetest.js')
var selectanswer = require('./selectanswer.js') 
var express=require('express')
var cors = require('cors')
var app = express()
var path = require('path')

//console.log(ansp)
app.use(cors())
app.use(express.static(path.join(__dirname, '/questions')))
app.use(express.static(path.join(__dirname, '/')))
/*
var whitelist = ['http://localhost:3000/answer/', 'http://localhost:3000/test/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

*/


app.listen(process.env.PORT || 3000, function(){
    console.log('Node.js listening on ' + 3000)
})

app.get("/", (req,res)=>{
    res.sendFile(__dirname+'/selecttest.html')
})


app.get("/files",function(req,res){
    reader(function(data){
        res.json(data)
    })
})

app.get("/starttest", function(req,res){
  res.sendFile(path.join(__dirname+ '/givetest.html'))
})

app.get("/questions/:id", function(req,res){
	let testid = req.params.id 
	var d = new Date()
	console.log("Test start time " + d.getTime())
	testsession(testid, function(images){
		res.writeHeader(200, {"Content-Type": "text/html"});  
		res.write('<!DOCTYPE html><html><title>all the best</title><meta charset="utf-8"><link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><style>.mySlides {display:none;}</style><body><div class="w3-content w3-section" style="max-width:500px" align="center">')	
		for(var i=0;i<images.imagelist.length;i++){
			res.write('  <img class="mySlides" src="'+"../"+images.imagelist[i]+'" style="width:100%">')
		}
		res.write('<p id="status"></p>')
		res.write('<center><h1 id="count_down"></h1></center>')
		res.write('<script type="text/javascript" src="../../showimages.js"></script></body></html>')
		res.end()
	})
})


app.get("/questions/:id/test/:imageid",function(req,res){
	let id = req.params.id 
	let imageid = req.params.imageid
	//console.log(path.join(__dirname+ '/questions/'+id+'/test/'+req.params.imageid))
	res.sendFile(path.join(__dirname+ '/questions/'+id+'/test/'+req.params.imageid))
})

app.get("/answer/:id/",function(req,res){
  	res.sendFile(path.join(__dirname+ '/selectimages.html'))
})

app.get("/api/question/:id", function(req,res){
	var questionid = req.params.id
	selectanswer.listquestions(questionid, function(questionlist){		
		res.json(questionlist)
	})	
})

app.get("/api/answer/:id",function(req,res){
	var answerid=req.params.id
	selectanswer.getanswers(answerid, function(answerlist){
		res.json(answerlist)
	})
})

app.get("/questions/:id/:question/:imageid",function(req,res){
	let id = req.params.id
	let ques = req.params.question
	let imageid=req.params.imageid
	res.sendFile(path.join(__dirname+'/questions/'+id+'/'+ques+'/'+imageid))
})
