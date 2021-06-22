const fs = require("fs");
const path = require("path");
const path1800 = path.join(__dirname, '1800');
const path2000 = path.join(__dirname, '2000');
const boys = path.join(__dirname, 'boys');
const girls = path.join(__dirname, 'girls');
const Directory = path.join(__dirname, "get-all-files");
const path2021 = path.join(__dirname, "2021");

// 1) Студентів з 1800 перевести в групу на 2000. І навпаки

//  function moveStudents(srcDir,dstDir){
//      fs.readdir(srcDir,(err, files1) => {
//          files1.forEach(value => {
//              fs.rename(path.join(srcDir,value),path.join(dstDir,value),err1 => {
//                  if(err1){
//                      console.log(err1);
//                  }
//              });
//          })
//      })
//  }
// moveStudents(path1800,path2000);

// 2) Перемістити всіх дівчат в папку girls а хлопців в папаку boys.
//  function findGender(filePath){
//      fs.readdir(filePath,(err, files) => {
//          files.forEach(value => {
//              fs.readFile(path.join(filePath,value),(err1, data) => {
//                  const {gender}=JSON.parse(data.toString());
//                  if(gender==="female"){
//                      fs.writeFile(path.join(girls,value),data.toString(),err2 => {
//                          if(err2){
//                              console.log(err2);
//                          }
//                      })
//                  }else{
//                      fs.writeFile(path.join(boys,value),data.toString(),err2 => {
//                          if(err2){
//                              console.log(err2);
//                          }
//                      })
//                  }
//
//              })
//          })
//      })
//  }
// findGender(path1800);
//  * вам потрбіно перемісти всі файлики з вкладених папок в іншу папку. Зробити всі файли на одному рівні вкладеності.
function getAllFiles(fromDir) {
    fs.readdir(fromDir, (err, files) => {
        files.forEach(value => {
            let newPath = path.join(fromDir, value);
            fs.stat(newPath, (err1, stats) => {
                stats.isDirectory() ? getAllFiles(newPath) : moveToDir(newPath);
            })
        })
    })
}

function moveToDir(Dir) {
    fs.readFile(Dir, (err, data) => {
        if (err) {
            console.log(err);
        }
        let fileName = Dir.split("\\");
        fileName = fileName[fileName.length - 1];
        fs.writeFile(path.join(Directory, fileName), data.toString(), err1 => {
            if (err1) {
                console.log(err1);
            }
        })
    })
}

getAllFiles(path2021);
