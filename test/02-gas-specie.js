import { GasState, GasSpecie } from "../src/jasali.js"
import { RoundFloat, RunAssertForFloat } from "../src/utils.js"
import * as assert from 'assert'

let state = GasState({ temperature: 393.15, pressure: 4e05 })
let specie = GasSpecie({ name: "H2", gasState: state })

describe('GasSpecie.getName()', function () {
  it('should return "H2" when the specie is hydrogen', function () {
    assert.equal(specie.getName(), "H2");
  });
});

describe('GasSpecie.getMolecularWeight()', function () {
  let expected = RoundFloat(2.01588)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getMolecularWeight(), expected);
  });
});

describe('GasSpecie.getDensity()', function () {
  let expected = RoundFloat(0.24669273)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getDensity(), expected);
  });
});

describe('GasSpecie.getMolarSpecificHeat()', function () {
  let expected = RoundFloat(29110.49945005)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getMolarSpecificHeat(), expected);
  });
});

describe('GasSpecie.getMassSpecificHeat()', function () {
  let expected = RoundFloat(14440.591429081)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getMassSpecificHeat(), expected);
  });
});

describe('GasSpecie.getMolarEnthalpy()', function () {
  let expected = RoundFloat(2766730.2764827106)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getMolarEnthalpy(), expected);
  });
});

describe('GasSpecie.getMassEnthalpy()', function () {
  let expected = RoundFloat(1372467.7443512066)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getMassEnthalpy(), expected);
  });
});

describe('GasSpecie.getMolarEntropy()', function () {
  let expected = RoundFloat(127098.55622805038)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getMolarEntropy(), expected);
  });
});

describe('GasSpecie.getMassEntropy()', function () {
  let expected = RoundFloat(63048.671661036555)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getMassEntropy(), expected);
  });
});

describe('GasSpecie.getViscosity()', function () {
  let numberOfSignificants = 8
  let expected = RoundFloat(0.000010743165870564187, numberOfSignificants)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getViscosity(), expected, numberOfSignificants);
  });
});

describe('GasSpecie.getArithmeticMeanGasVelocity()', function () {
  let expected = RoundFloat(2031.9914169068327)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getArithmeticMeanGasVelocity(), expected);
  });
});

describe('GasSpecie.getMeanFreePath()', function () {
  let numberOfSignificants = 12
  let expected = RoundFloat(1.1253841849542181e-7, numberOfSignificants)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getMeanFreePath(), expected, numberOfSignificants);
  });
});

describe('GasSpecie.getDiffusion()', function () {
  let numberOfSignificants = 8
  let expected = RoundFloat(0.00005806966679370405, numberOfSignificants)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getDiffusion(), expected, numberOfSignificants);
  });
});

describe('GasSpecie.getThermalConductivity()', function () {
  let expected = RoundFloat(0.22519720674188815)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getThermalConductivity(), expected);
  });
});

describe('GasSpecie.getGeometry()', function () {
  let expected = RoundFloat(1)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getGeometry(), expected);
  });
});

describe('GasSpecie.getLJpotential()', function () {
  let expected = RoundFloat(38)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getLJpotential(), expected);
  });
});

describe('GasSpecie.getLJdiameter()', function () {
  let expected = RoundFloat(2.92)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getLJdiameter(), expected);
  });
});

describe('GasSpecie.getDipole()', function () {
  let expected = RoundFloat(0)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getDipole(), expected);
  });
});

describe('GasSpecie.getPolar()', function () {
  let expected = RoundFloat(0.79)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getPolar(), expected);
  });
});

describe('GasSpecie.getCollision()', function () {
  let expected = RoundFloat(280)
  it('should return ' + expected + ' when the specie is hydrogen', function () {
    RunAssertForFloat(specie.getCollision(), expected);
  });
});