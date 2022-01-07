function deepCopy(newObj, oldObj) {
    for (const key in oldObj) {
        if (oldObj[key] instanceof Array) {
            let tempObj = [];
            newObj[key] = deepCopy(tempObj, oldObj[key]);
        } else if (oldObj[key] instanceof Object) {
            let tempObj = {};
            newObj[key] = deepCopy(tempObj, oldObj[key]);
        } else newObj[key] = oldObj[key];
    }
    return newObj;
}

export default deepCopy;