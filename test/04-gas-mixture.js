import { GasState, GasSpecie, GasMixtureComposition, GasMixture } from "../src/jasali.js"
import { RoundArray, RoundFloat, RoundMatrix, RunAssertForArray, RunAssertForFloat, RunAssertForMatrix } from "../src/utils.js"
import * as assert from 'assert'

let state = GasState({ temperature: 393.15, pressure: 4e05 })
let testMixture = [{ "specie": GasSpecie({ name: "H2", gasState: state }), "value": 0.1 },
{ "specie": GasSpecie({ name: "O2", gasState: state }), "value": 0.2 },
{ "specie": GasSpecie({ name: "N2", gasState: state }), "value": 0.7 }]

let compositions = GasMixtureComposition(testMixture, "mole")

let mixture = GasMixture({ gasState: state, mixtureComposition: compositions })

describe('GasMixture.getMassFraction()', function () {
  let expected = RoundArray([0.007691028712670252, 0.24416501931761103, 0.7481439519697187])
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForArray(mixture.getMassFraction(), expected);
  });
});

describe('GasMixture.getMoleFraction()', function () {
  let expected = RoundArray([0.1, 0.2, 0.7])
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForArray(mixture.getMoleFraction(), expected);
  });
});

describe('GasMixture.getMolecularWeight()', function () {
  let expected = RoundFloat(26.210798)
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForFloat(mixture.getMolecularWeight(), expected);
  });
});

describe('GasMixture.getDensity()', function () {
  let expected = RoundFloat(3.207538918753929)
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForFloat(mixture.getDensity(), expected);
  });
});

describe('GasMixture.getMolarSpecificHeat()', function () {
  let expected = RoundFloat(29393.761533347457)
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForFloat(mixture.getMolarSpecificHeat(), expected);
  });
});

describe('GasMixture.getMassSpecificHeat()', function () {
  let expected = RoundFloat(1121.4371089864358)
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForFloat(mixture.getMassSpecificHeat(), expected);
  });
});

describe('GasMixture.getMolarEnthalpy()', function () {
  let expected = RoundFloat(2784533.9583383026)
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForFloat(mixture.getMolarEnthalpy(), expected);
  });
});

describe('GasMixture.getMassEnthalpy()', function () {
  let expected = RoundFloat(106236.13818771573)
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForFloat(mixture.getMassEnthalpy(), expected);
  });
});

describe('GasMixture.getMolarEntropy()', function () {
  let expected = RoundFloat(184690.2081112568)
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForFloat(mixture.getMolarEntropy(), expected);
  });
});

describe('GasMixture.getMassEntropy()', function () {
  let expected = RoundFloat(7046.340523903804)
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForFloat(mixture.getMassEntropy(), expected);
  });
});

describe('GasMixture.getViscosity()', function () {
  let numberOfSignificants = 8
  let expected = RoundFloat(0.000022710191868890118, numberOfSignificants)
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForFloat(mixture.getViscosity(), expected, numberOfSignificants);
  });
});


describe('GasMixture.getMixtureDiffusion()', function () {
  let numberOfSignificants = 8
  let expected = RoundArray([0.000034673450119418794, 0.000008829670412225227, 0.000009404100254623969], numberOfSignificants)
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForArray(mixture.getMixtureDiffusion(), expected, numberOfSignificants);
  });
});

describe('GasMixture.getBinaryDiffusion()', function () {
  let numberOfSignificants = 8
  let expected = RoundMatrix([
    [
      0.00005806966679370405,
      0.0000323846344785999,
      0.00003119022489297956
    ],
    [
      0.0000323846344785999,
      0.000008489779431583746,
      0.000008483425680119624
    ],
    [
      0.00003119022489297956,
      0.000008483425680119624,
      0.000008468795744001358
    ]
  ], numberOfSignificants)
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForMatrix(mixture.getBinaryDiffusion(), expected, numberOfSignificants);
  });
});

describe('GasMixture.getThermalConductivity()', function () {
  let numberOfSignificants = 5
  let expected = RoundFloat(0.043812946989620155, numberOfSignificants)
  it('should return ' + expected + ' when the test mixture is used', function () {
    RunAssertForFloat(mixture.getThermalConductivity(), expected, numberOfSignificants);
  });
});
