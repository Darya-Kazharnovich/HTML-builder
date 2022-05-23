const fs = require('fs');
const path = require('path');
const route = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(route, 'utf-8');
readStream.on('data', data => {
  console.log(data);
});