import { MoleculeComposition } from "../src/molecule.js"
import * as assert from 'assert'

let molecule = MoleculeComposition("H2")

describe('MoleculeComposition.getElementsSymbol()', function () {
  let expected = ["H"]
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    assert.deepEqual(molecule.getElementsSymbol(), expected);
  });
});

describe('MoleculeComposition.getNumberOfAtoms()', function () {
  let expected = [2]
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    assert.deepEqual(molecule.getNumberOfAtoms(), expected);
  });
});

describe('MoleculeComposition.getElementCounterDict()', function () {
  let expected = {
    "H": 2
  }
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    assert.deepEqual(molecule.getElementCounterDict(), expected);
  });
});

describe('MoleculeComposition.getElementsList()', function () {
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

describe('MoleculeComposition.getAvailableSpecies()', function () {
  let expected = "AR"
  it('should return ' + expected + ' as the first specie of the available species', function () {
    assert.deepEqual(molecule.getAvailableSpecies()[0], expected);
  });
});