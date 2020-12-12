import * as assert from 'assert'

export const Fractions = Object.freeze({ MOLE: "mole", MASS: "mass" });
export const Parameters = Object.freeze({ R: 8314., pi: 3.14159265358979323846, k: 1.3806488 });

export function RoundFloat(num, numberOfSignificants = 3) {
    return Math.round((num + Number.EPSILON) * Math.pow(10, numberOfSignificants)) / Math.pow(10, numberOfSignificants);
}

export function RoundArray(array, numberOfSignificants = 3) {
    return array.map(element => RoundFloat(element, numberOfSignificants));
}

export function RoundMatrix(matrix, numberOfSignificants = 3) {
    return matrix.map(array => array.map(element => RoundFloat(element, numberOfSignificants)));
}

export function RunAssertForFloat(value, expected, numberOfSignificants = 3) {
    return assert.equal(RoundFloat(value, numberOfSignificants), RoundFloat(expected, numberOfSignificants))
}

export function RunAssertForArray(value, expected, numberOfSignificants = 3) {
    return assert.deepEqual(RoundArray(value, numberOfSignificants), RoundArray(expected, numberOfSignificants))
}

export function RunAssertForMatrix(value, expected, numberOfSignificants = 3) {
    return assert.deepEqual(RoundMatrix(value, numberOfSignificants), RoundMatrix(expected, numberOfSignificants))
}

export function AsaliError(message) {
    console.log(message);
    alert(message);
    exit();
}

