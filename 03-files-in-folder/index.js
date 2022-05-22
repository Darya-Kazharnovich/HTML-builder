const fs = require('fs')
const path = require('path')
const pathToDirectory = path.join(__dirname, 'secret-folder')
fs.readdir(pathToDirectory, {withFileTypes: true}, (err,items) => {
    if (err) {
        console.error(err)
    } else {
        for (let i=0; i<items.length; i++) {
            if (items[i].isFile()) {
                const extension = items[i].name.split('.')[1]
                const fileName = items[i].name.split('.')[0]
                const pathToFile = path.join(__dirname, 'secret-folder', `${items[i].name}`)
                fs.stat(pathToFile, (err, data) => {
                    if (err) {
                        console.error(err)
                    } process.stdout.write(`${fileName} - ${extension} - ${data.size}B\n`)
                })
            }
        } 
    }
})
