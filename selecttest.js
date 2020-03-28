const testFolder = './questions';
const fs = require('fs');

function reader(callback){
    var ans= []
    fs.readdir(testFolder, (err, files) => {
      files.forEach(file=>{
        var dirname=file.split('.')

        if(dirname.length == 1 && dirname[0].match(/^\d/)){
            ans.push(dirname[0])
            //console.log(ans)
            //console.log(dirname[0])
        }

      })
    return callback({filenames:ans, rootfolder:'.'})

    })
}

module.exports=reader;