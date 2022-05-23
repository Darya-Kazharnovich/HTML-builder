const fs = require('fs');
const path = require('path');
const textFile = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(textFile);
const { stdin, stdout } = process;
stdout.write('Hello!\n\n');
stdin.on('data', (data) => {
  if (data.toString().trim() !== 'exit') {
    const text = data.toString();
    writeStream.write(text);
  } else if (data.toString().trim() === 'exit') {
    stdout.write('\n\nBye!\n');
    writeStream.end();
    process.exit();
  }
});
process.on('SIGINT', () => {
  stdout.write('\n\nBye!\n');
  process.exit();
});