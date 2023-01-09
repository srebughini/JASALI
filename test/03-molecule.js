import { Molecule } from "../src/molecule.js"
import * as assert from 'assert'

let molecule = Molecule("H2")

describe('Molecule.getElementsSymbol()', function () {
  let expected = ["H"]
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    assert.deepEqual(molecule.getElementsSymbol(), expected);
  });
});

describe('Molecule.getNumberOfAtoms()', function () {
  let expected = [2]
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    assert.deepEqual(molecule.getNumberOfAtoms(), expected);
  });
});

describe('Molecule.getElementCounterDict()', function () {
  let expected = {
    "H": 2
  }
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    assert.deepEqual(molecule.getElementCounterDict(), expected);
  });
});

describe('Molecule.getElementsList()', function () {
  let expected = [{
    id: 1,
    symbol: 'H',
    RCow: 0.37,
    RVdW: 1.2,
    maxBonds: 1,
    mass: 1.00794,
    name: 'Hydrogen',
    posX: 1,
    posY: 1,
    color: '#FFFFFF',
    color2: '#808080'
  }]
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    assert.deepEqual(molecule.getElementsList(), expected);
  });
});

describe('Molecule.getAvailableSpecies()', function () {
  let expected = "AR"
  it('should return ' + expected + ' as the first specie of the available species', function () {
    assert.deepEqual(molecule.getAvailableSpecies()[0], expected);
  });
});