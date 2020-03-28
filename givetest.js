var fs = require('fs')

function starttest(testid, callback){
	var dir='./questions/'+testid+'/test'
	//console.log(dir)
	var imageList = []
	fs.readdir(dir, (err, images)=>{
		if(err)console.log(err)
		else{
			images.forEach(image=>{
				imageList.push(testid+'/test/'+image)
			})
			//console.log(imageList)
			return callback({imagelist: imageList})
		}
	})	
}

module.exports=starttest;