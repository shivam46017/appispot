/**
 * 
 * @param { Array } arr 
 * @description removes repeating values from the array and returns filtered array
 * @example
 * import removeRepeatingValues from '/Sanitize.js'
 * 
 * const array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
 * 
 * console.log(removeRepeatingValues(array)) // [1, 2, 3, 4, 5, 6, 7, 8]
 * @returns 
 */

export const removeRepeatingValues = (arr) => {
    return arr.filter((val, index) => {
        return arr.indexOf(val) === index;
    });
}

/**
 * 
 * @param {Array} arr 
 * @param {Array | string | number} valuesToRemove 
 * @description removes value from the array and get a new modified array
 * @example
 * import { removeThisValue } from "*./Sanitize.js"
 * 
 * const array = ['shivam', 'vishal', 'himanshu', 'alok']
 * 
 * // remove single value
 * console.log(removeThisValue(array, 'shivam')) // ['vishal', 'himanshu', 'alok']
 * 
 * // remove multiple values
 * console.log(removeThisValue(array, ['shivam', 'vishal'])) // ['himanshu', 'alok']
 * @returns 
 */
export const removeThisValue = (arr, valuesToRemove) => {
    if (!Array.isArray(valuesToRemove)) {
        valuesToRemove = [valuesToRemove];
    }
    return arr.filter((val) => {
        return !valuesToRemove.includes(val);
    });
}

