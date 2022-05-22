const fs = require('fs')
const path = require('path')
const pathToStyles = path.join(__dirname, 'styles')
const arrayStyle = []
fs.readdir(pathToStyles, {withFileTypes: true}, (err, items) => {
    if (err) {
        console.error(err)
    } else {
        for (let i = 0; i<items.length; i++) {
            if (items[i].isFile() && items[i].name.split('.')[1] === 'css') {
                    const readStream = fs.createReadStream(path.join(__dirname, 'styles', `${items[i].name}`), 'utf-8')
                    readStream.on('data', data => {
                        arrayStyle.push(`${data}`)
                        const textFile = path.join(__dirname, 'project-dist', 'bundle.css')
                        fs.createWriteStream(textFile).write(arrayStyle.join('').toString())
                    })
            }
        }
    }
})
