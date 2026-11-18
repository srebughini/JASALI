import * as assert from 'node:assert'

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
    if (Array.isArray(value) || Array.isArray(expected)) {
        throw new TypeError("RunAssertForFloat expects scalars; use RunAssertForArray for arrays");
    }
    return assert.equal(RoundFloat(value, numberOfSignificants), RoundFloat(expected, numberOfSignificants))
}

export function RunAssertForArray(value, expected, numberOfSignificants = 3) {
    return assert.deepEqual(RoundArray(value, numberOfSignificants), RoundArray(expected, numberOfSignificants))
}

export function RunAssertForMatrix(value, expected, numberOfSignificants = 3) {
    return assert.deepEqual(RoundMatrix(value, numberOfSignificants), RoundMatrix(expected, numberOfSignificants))
}

export function RunAssertForDictionary(value, expected) {
    return assert.deepEqual(JSON.stringify(value), JSON.stringify(expected))
}
