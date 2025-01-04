function cleanPathName(path){
    return path.replace(" ", "-").toUpperCase();
}

function revertPathName(path){
    return path.replace("-", " ").toUpperCase();
}

export {cleanPathName, revertPathName};