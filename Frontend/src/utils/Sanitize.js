/**
 * 
 * @param { Array } arr 
 * @returns 
 */

export const removeRepeatingValues = (arr) => {
    return arr.filter((val, index) => {
        return arr.indexOf(val) === index;
    });
}


export const removeThisValue = (arr, valuesToRemove) => {
    if (!Array.isArray(valuesToRemove)) {
        valuesToRemove = [valuesToRemove];
    }
    return arr.filter((val) => {
        return !valuesToRemove.includes(val);
    });
}

