#!/usr/bin/env node;

//Above is the shebang syntax 
// Shebang or hashbang (#!) is the first line of the file which 
// tells the OS which interpreter to use. It typically looks like this:
// #!/absolute/path/to/the/interpreter [optional params]

let fs = require("fs");
let path = require("path");


let helpObject = require("./commands/help");
let treeObject = require('./commands/tree');
let organizeObject = require('./commands/organize');



// To take input from command line we use process.argv command
// We have sliced in from index two because at index 0 and 1 we have our "node" and "file_name.js" 

let inputArr = process.argv.slice(2) // user input start from 2

// we can see the content of command line input collected in an array
// console.log(inputArr);

// node main.js tree "directorypath"
// node main.js organize "directoryPath"
// node main.js help

//Now we are taking 1st string of our command line input which can be 
// tree
// organize
// help
// If any other string entered will be handled 
let command = inputArr[0];

switch (command) {
    // If command is tree then we will call our treeKey function
    case "tree":
        // Here inputArr[1] is the path on which we want to run our command
        treeObject.treeKey(inputArr[1]);
        break;
    // If command is tree then we will call our organizeKey function
    case "organize":
        organizeObject.organizeKey(inputArr[1]);
        break;
    // If command is tree then we will call our helpKey function
    case "help":
        helpObject.helpKey();
        break;
    // If any other string entered then we will prompt user to enter valid command
    default:
        console.log("Please input right command")
        break;
}
