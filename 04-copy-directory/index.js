const fs = require('fs');
const path = require('path');
const pathToFileOriginal = path.join(__dirname, 'files');
const pathToFileCopi = path.join(__dirname, 'files-copy');

fs.stat(pathToFileCopi, (err) => {
  if (err) {
    addStyle ();
  } else {
    fs.readdir(pathToFileCopi, {withFileTypes: true}, (err, items) => {
      if (err) {
        console.error(err);
      } 
      for (let i = 0; i<items.length; i++) {
        fs.unlink(path.join(pathToFileCopi, `${items[i].name}`), (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    });
    addStyle ();
  }
});

function addStyle () {
  fs.mkdir(pathToFileCopi, {recursive: true}, (err) => {
    if (err) {
      console.error(err);
    }
  });
  fs.readdir(pathToFileOriginal, {withFileTypes: true}, (err, items) => {
    if (err) {
      console.error(err);
    } else {
      for (let i = 0; i<items.length; i++) {
        const fileName = items[i].name;
        const pathToFile = path.join(pathToFileOriginal, `${fileName}`);
        const pathToFileClone = path.join(pathToFileCopi, `${fileName}`);
        fs.copyFile(`${pathToFile}`, `${pathToFileClone}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    }
    console.log('Данные скопированы');
  });
}