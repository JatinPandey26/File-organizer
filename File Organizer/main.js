#!/usr/bin/env node

// user input about task

let userInput = process.argv.slice(2);
let fs = require('fs');

let path = require('path');

let types = {
    Image: ['jpg', 'jpeg'],
    TextFile: ['txt'],
    Applications: ['apk'],
}

// console.log(userInput);

switch (userInput[0]) {
    case 'help':
        help();
        break;

    case 'organize':
        organize(userInput[1]);
        break;

    case 'tree':
        tree(userInput[1])
        break;

    default:
        break;
}

function help() {

    console.log(`
PRINT    :      Prints a text file.
PROMPT   :      Changes the Windows command prompt.
PUSHD    :      Saves the current directory then changes it.
RD       :      Removes a directory.
RECOVER  :      Recovers readable information from a bad or defective disk.
REM      :      Records comments (remarks) in batch files or CONFIG.SYS.
REN      :      Renames a file or files.
RENAME   :      Renames a file or files.
`);

}

function organize(directory) {

    if (directory == undefined) {
        console.log('please 🙏😊 enter directory name');
        return;
    }

    // check if path exist

    if (fs.existsSync(directory) == false) {
        console.log('please 🙏😊 valid directory path');
        return;
    }

    console.log('Organising your directory please wait ...........');
    organizeHelper(directory, directory);
}

function organizeHelper(src, dest) {

    let childnames = fs.readdirSync(src);

    for (let i = 0; i < childnames.length; i++) {
        let ext = path.extname(childnames[i]);

        let type = getType(ext.slice(1));
        // console.log(`${childnames[i]} with extension -> ${ext.slice(1)} belongs to ${type}`);
        let childAddress = path.join(src, childnames[i]);
        addFileToDir(childAddress, dest, type);


    }

}

function getType(child) {
    for (let keys in types) {
        let typeArray = types[keys]
        for (let i = 0; i < typeArray.length; i++) {
            ;
            if (typeArray[i] == child) return keys;
        }
    }
    return "others";
}

function addFileToDir(src, dest, category) {

    let pathFolder = path.join(dest, category);

    if (fs.existsSync(pathFolder) == false) {
        fs.mkdirSync(pathFolder);
    }

    let filename = path.basename(src);
    let destinationPathFile = path.join(pathFolder, filename);

    fs.copyFileSync(src, destinationPathFile);
    console.log('Orgainizing', filename, ' to ', category);
    fs.unlinkSync(src);

}

function tree(dirpath) {
    if (dirpath == undefined) {
        console.log('please 🙏😊 enter directory name');
        return;
    }

    // check if path exist

    if (fs.existsSync(dirpath) == false) {
        console.log('please 🙏😊 valid directory path');
        return;
    }

    let isFile = fs.lstatSync(dirpath).isFile();
    let space = "";
    if (isFile) {
        let filename = path.basename(dirpath);
        console.log(space + '├───' + filename);
    }
    else {
        let dirname = path.basename(dirpath);
        console.log(space + '└───' + dirname);

        childTree(dirpath, space + " ");
    }

}

function childTree(dirpath, space) {

    let childnames = fs.readdirSync(dirpath);

    for (let i = 0; i < childnames.length; i++) {
        let childAddress = path.join(dirpath, childnames[i]);

        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile){
            console.log(space + '├───' + childnames[i]); 
            continue;
        }
        
        console.log( space + '└───' + childnames[i]);

        childTree(childAddress, space + " ");
    }
}

