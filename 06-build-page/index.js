const fs = require('fs');
const path = require('path');
const pathToIndexHtml = path.join(__dirname, 'project-dist', 'index.html');
const pathToStyleCss = path.join(__dirname, 'project-dist', 'style.css');
const pathToStylesDir = path.join(__dirname,'styles');
const pathToAssetsDir = path.join(__dirname, 'assets');
const pathToAssets = path.join(__dirname, 'project-dist', 'assets');
const pathToTemplateHtml = path.join(__dirname, 'template.html');
const pathToComponents = path.join(__dirname, 'components');
let indexHtmlCode = '';


fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
  if (err) {
    console.error(err);
  }
});
const arrayStyle = [];
fs.readdir(pathToStylesDir, {withFileTypes: true}, (err, items) => {
  if (err) {
    console.error(err);
  } else {
    for (let i = 0; i<items.length; i++) {
      if (items[i].isFile() && items[i].name.split('.')[1] === 'css') {
        const readStream = fs.createReadStream(path.join(__dirname, 'styles', `${items[i].name}`), 'utf-8');
        readStream.on('data', data => {
          arrayStyle.push(`${data}`);
          const textFile = path.join(pathToStyleCss);
          fs.createWriteStream(textFile).write(arrayStyle.join('\n').toString());
        });
      }
    }
  }
});

const readStreamTemplate = fs.createReadStream(pathToTemplateHtml, 'utf-8');
readStreamTemplate.on('data', (data) => {
  indexHtmlCode = data;
  fs.readdir(pathToComponents, {withFileTypes: true}, (err, html) =>{
    if (err) {
      console.error(err);
    }
    for (let i = 0; i< html.length; i++) {
      if(html[i].isFile() && html[i].name.split('.')[1] === 'html'){
        const pathToHtml = path.join(pathToComponents, html[i].name);
        fs.createReadStream(pathToHtml).on('data', htmlCode => {
          indexHtmlCode = indexHtmlCode.replace(`{{${html[i].name.split('.')[0]}}}`, htmlCode.toString());
          const createWriteStreamIndex = fs.createWriteStream(pathToIndexHtml);
          createWriteStreamIndex.write(indexHtmlCode);
        });
      }
    }
  });
});
fs.mkdir(pathToAssets, {recursive: true}, (err) => {
  if (err) {
    console.error(err);
  }
});
function copyDirectory (pathToAssetsDir, pathToAssets) {
  fs.readdir(pathToAssetsDir, {withFileTypes: true}, (err, items) => {
    if (err) {
      console.error(err);
    } else {
      for (let i = 0; i<items.length; i++) {
        if (items[i].isFile()) {
          const fileName = items[i].name;
          const pathToFile = path.join(pathToAssetsDir, fileName);
          const pathToFileClone = path.join(pathToAssets, fileName);
          fs.copyFile(pathToFile, pathToFileClone, (err) => {
            if (err) {
              console.error(err);
            }
          });
        } else {
          const fileName = items[i].name;
          const pathToFile = path.join(pathToAssetsDir, fileName);
          const pathToFileClone = path.join(pathToAssets, fileName);
          fs.mkdir(pathToFileClone, {recursive: true}, (err) => {
            if (err) {
              console.error(err);
            }
          });
          copyDirectory(pathToFile, pathToFileClone);
        }
      }
    }
  });
}
copyDirectory (pathToAssetsDir, pathToAssets);