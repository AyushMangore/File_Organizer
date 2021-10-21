let fs = require("fs");
let path = require("path");

// Here we have created a object named types which contains the attributes which holds the array of extensions
let types = {
    // media attribute holds the extensions of media files
    media : ["mp4","mkv"],
    // archives attribute holds the extensions of archive files
    archives : ["zip","7z","rar","tar","gz","ar","iso","xz"],
    // documents attribute holds the extensions of doc files
    documents : ["docx","doc","pdf","xlsx","xls","odt","ods","odf","txt","ps","tex"],
    // app attribute holds the extensions of applications
    app : ["exe","dmg","pkg","deb"] 
}

function organizeFn(dirPath){
    let destPath;
    // console.log("Organize command implemented for ",dirPath);
    // 1. input -> directory path
    // if path provided is null then by default we will execute it for the whole file system of the computer
    if(dirPath == undefined){
        destPath = process.cwd();
        return;
    }else{
       // path exist or not
       // If path is provided then we will check the provided path exist or not 
       // We have existsSync function of fs module which checks whether path exist or not and return boolean answer
       let doesExist = fs.existsSync(dirPath);
       if(doesExist){
           // 2. create -> organized_files -> directory
           // If path is valid then at the root we have to make a folder named as organized_file
           // For that we have to first make its absolute path
           // So we will use path.join() function to make it
           // We have path till the directory which was provided to us through command line
           // In the same directory path we will add out new folder name 
           destPath = path.join(dirPath,"organized_file");
           // We will check if it already exist or nor
           // If exist then we nedd not to create any new folder
           // But of it doesn't exists then we will create
           // For that we will use mkdirSync function of fs module it will create a folder through the path provided
           if(fs.existsSync(destPath) == false)
                    fs.mkdirSync(destPath);
            
       }else{
           console.log("Invalid Path Provided! Please Provide Correct Path");
           return;
       }
    }
    // After creatinng our organized_file folder we will finally organize
    organizeHelper(dirPath,destPath);
    
    
}


function organizeHelper(src,dest){
 // 3. check all files -> identify categories
 // Now we will first extract all the files which are present in our source path
 // For that we have readdirSync function of fs module which return the array of all files and subdirectories
 // present in the path of the directory provided 
let childName =  fs.readdirSync(src);
// console.log(childName);
// Now we will iterate through each file one by one
// And we will create absolute path for each file by concatenting its name name with its parent source directory
for(let i=0 ; i<childName.length; i++){
    let childAddress = path.join(src,childName[i]);
    // If the path is already a folder then we need not to organize it else we will do
    let isFile =  fs.lstatSync(childAddress).isFile();
    if(isFile){
        // console.log(childName[i]);
        // if the path is file only then we will check that in which category does it fall 
        // is it of media type or doc or app or others   
        let category = getCategory(childName[i]);
        // We will keep on logging the category for each file
        console.log(childName[i]," -> ",category);

    //  4. cut files to the organized_files directory and inside it in a particular folder
        // finally we will cut each file and we will paste it in it's proper destination
        sendFiles(childAddress,dest,category);
    }
}

}

// path of the file provides
// destination that is organize_file path provided
// and finally the category provided
function sendFiles(srcFilePath, dest, category){
    // To make proper folder under organize_file we need  to create its path first
    // We will aging use join function and concatenate the dest and category so that the folder under organized_file will be created
    let categoryPath = path.join(dest,category);
    //If that folder already exist then there is no need to create 
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }
    // Now we require the file name to be copied into its new destiantion
    // For the we extract the file name by using path.basename() function
    let fileName = path.basename(srcFilePath);
    // Now we will generate the target path where we want to copy it
    // We will concatenate the file name will its proper categoryPath
    // So finally we have our target destination path 
    let destFilePath = path.join(categoryPath,fileName);
    // Now we have both of our paths ready source path of the file and destination path of our file
    // Then we will finally copy 
    fs.copyFileSync(srcFilePath,destFilePath);
    // After copying we will delete the source file
    // It will give the feel of cut
    // Now if we don't want to cut if we want only to copy then we can comment below line
    fs.unlinkSync(srcFilePath); // comment if just want to copy
    console.log(fileName," Copied To ", category);
}

function getCategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1);
    // console.log(ext);
    for(let type in types){
        let currentTypeArr = types[type];
        for(let i=0 ; i<currentTypeArr.length; i++){
            if(ext == currentTypeArr[i]){
                return type;
            }
        }
    }
    return "others";
}

module.exports={
    organizeKey : organizeFn
}