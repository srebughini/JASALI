import MoleculeComposition from "../src/molecule.js"
import * as assert from 'assert'

let molecule = MoleculeComposition("H2")

describe('GasState.getElementsSymbol()', function () {
  let expected = ["H"]
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    assert.deepEqual(molecule.getElementsSymbol(), expected);
  });
});

describe('GasState.getNumberOfAtoms()', function () {
  let expected = [2]
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    assert.deepEqual(molecule.getNumberOfAtoms(), expected);
  });
});

describe('GasState.getElementCounterDict()', function () {
  let expected = {
    "H": 2
  }
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    assert.deepEqual(molecule.getElementCounterDict(), expected);
  });
});

describe('GasState.getElementsList()', function () {
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