import { Molecule, Fractions } from "../src/jasali.js"
import * as assert from 'assert'

let molecule = Molecule();

describe('Molecule.getAvailableSpecies()', function () {
  let expected = "AC3H4"
  it('should return ' + expected + ' as the first specie of the available species', function () {
    assert.deepEqual(molecule.getAvailableSpecies()[0], expected);
  });
});

describe('Molecule.getAvailableSpeciesFormula()', function () {
  let expected = "C3H4"
  it('should return ' + expected + ' as the first specie of the available species', function () {
    assert.deepEqual(molecule.getAvailableSpeciesFormula()[0], expected);
  });
});

describe('Molecule.getAvailableSpeciesChemicalName()', function () {
  let expected = "Allene"
  it('should return ' + expected + ' as the first specie of the available species', function () {
    assert.deepEqual(molecule.getAvailableSpeciesChemicalName()[0], expected);
  });
});

describe('Fractions.MOLE', function () {
  let expected = "mole"
  it('should return ' + expected, function () {
    assert.deepEqual(Fractions.MOLE, expected);
  });
});