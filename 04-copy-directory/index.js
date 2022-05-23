const fs = require('fs');
const path = require('path');
fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, (err) => {
  if (err) {
    console.error(err);
  }
});
fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, items) => {
  if (err) {
    console.error(err);
  } else {
    for (let i = 0; i<items.length; i++) {
      const fileName = items[i].name;
      const pathToFile = path.join(__dirname, 'files', `${fileName}`);
      const pathToFileClone = path.join(__dirname, 'files-copy', `${fileName}`);
      fs.copyFile(`${pathToFile}`, `${pathToFileClone}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  }
});