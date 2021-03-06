import { GasState, GasSpecie, GasMixtureComposition } from "../src/jasali.js"
import { RoundArray, RoundFloat, RunAssertForArray, RunAssertForFloat } from "../src/utils.js"
import * as assert from 'assert'

let state = GasState({ temperature: 393.15, pressure: 4e05 })
let testMixture = [{ "specie": GasSpecie({ name: "H2", gasState: state }), "value": 0.1 },
{ "specie": GasSpecie({ name: "O2", gasState: state }), "value": 0.2 },
{ "specie": GasSpecie({ name: "N2", gasState: state }), "value": 0.7 }]

let compositions = GasMixtureComposition(testMixture, "mole")

describe('GasMixtureComposition.getCompositionType()', function () {
  it('should return "mole" when the test mixture is used', function () {
    assert.equal(compositions.getCompositionType(), "mole");
  });
});

describe('GasMixtureComposition.getMassFraction()', function () {
  let expected = RoundArray([0.007691028712670252, 0.24416501931761103, 0.7481439519697187])
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForArray(compositions.getMassFraction(), expected);
  });
});

describe('GasMixtureComposition.getMoleFraction()', function () {
  let expected = RoundArray([0.1, 0.2, 0.7])
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForArray(compositions.getMoleFraction(), expected);
  });
});

describe('GasMixtureComposition.getNumberOfSpecies()', function () {
  let expected = 3
  it('should return ' + expected + ' when the test mixture is used', function () {
    assert.equal(compositions.getNumberOfSpecies(), expected);
  });
});

describe('GasMixtureComposition.getMolecularWeight()', function () {
  let expected = RoundFloat(26.210798)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(compositions.getMolecularWeight(), expected);
  });
});