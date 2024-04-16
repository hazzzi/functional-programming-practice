"use strict";
// map :: (a -> b) -> f a -> f b
// Array
const map = (array, f) => {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(f(array[i]));
    }
    return result;
};
const numbers = [1, 2, 3, 4];
const numberToString = (num) => `${num}`;
console.log(map(numbers, numberToString));
