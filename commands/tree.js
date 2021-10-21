let fs = require("fs");
let path = require("path");

function treeFn(dirPath){
    
    // we can check by logging the directory path
    // console.log("Tree command implemented for ",dirPath);

    // if path provided is null then by default we will execute it for the whole file system of the computer
    if(dirPath == undefined){
        treeHelper(process.cwd(),"")
        return;
    }else{
       // If path is provided then we will check the provided path exist or not 
       // We have existsSync function of fs module which checks whether path exist or not and return boolean answer
       let doesExist = fs.existsSync(dirPath);
       // If exists then we will do our further process
       if(doesExist){
          treeHelper(dirPath,"");
            
       }
       // If path doesn't exist then we will prompt user to input right path
       else{
           console.log("Invalid Path Provided! Please Provide Correct Path");
           return;
       }
    }
}

// After checking correct path we will execute our treeHelper function
function treeHelper(dirPath,indent){
    // Check whether file or folder
    // lstatSync function of fs module checks whether the path of source is file or directory
    let isFile =  fs.lstatSync(dirPath).isFile();
    // If the path is of file then we not need to expand it rather we will simply print
    if(isFile){
        // Now we will extract the file name through path.basename() function , it returns the name of the file
        // On proving its absolute path
        let filename = path.basename(dirPath);
        // And then we will print it
        console.log( indent+"├───"+filename);
    }else{
        // If the path is of directory then we need to expand until we reach the file folder
        // Now we first need to print directory name before expanding it 
        // So we again use the same function to etract the directory name
        let dirName = path.basename(dirPath);
        // And then print the name of directory with different indentation
        console.log(indent+ "└───"+dirName);
        // Now we will read all the files or sub directories present in our directory
        // For that we have readdirSync function of fs module which return the array of all files and subdirectories
        // present in the path of the directory provided
        let children = fs.readdirSync(dirPath);
        // After getting all subdirectories and files we will iterate through it and repeat the same process
        for(let i=0; i<children.length ; i++){
            // We will extract the path of each child file or subdirectory through path.join() method 
            // it will join our path of child file with the main directory path
            let childPath = path.join(dirPath,children[i]);
            // And after getting the absolute path we will repeat the whole process
            // In this way we will use recursion to dig deep into our directory structure
            treeHelper(childPath,indent+"\t");
        }
    }
}

module.exports={
    treeKey : treeFn
}