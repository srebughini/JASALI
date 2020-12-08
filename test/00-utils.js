import { RoundFloat, RoundArray, Fractions, Parameters, RunAssertForFloat } from "../src/utils.js"
import * as assert from 'assert'

describe('RoundFloat', function () {
  it('should return 1.0 to round 0.9995 with 3 number of significants', function () {
    assert.equal(RoundFloat(0.9995, 3), 1.0);
  });
});

describe('RunAssertForFloat', function () {
  it('should return true when 0.9995 and 1.0 are compared', function () {
    RunAssertForFloat(0.9995, 1.0);
  });
});

describe('RoundArray', function () {
  it('should return [1.0, 0.999] to round [0.9995, 0.9994] with 3 number of significants', function () {
    assert.deepEqual(RoundArray([0.9995, 0.9994], 3), [1.0, 0.999]);
  });
});

describe('Parameters.R', function () {
  let expected = RoundFloat(8314.)
  it('should return ' + expected, function () {
    RunAssertForFloat(Parameters.R, 8314);
  });
});

describe('Parameters.pi', function () {
  let expected = RoundFloat(3.14159265358979323846)
  it('should return ' + expected, function () {
    RunAssertForFloat(Parameters.pi, expected);
  });
});

describe('Parameters.k', function () {
  let expected = RoundFloat(1.3806488)
  it('should return ' + expected, function () {
    RunAssertForFloat(Parameters.k, expected);
  });
});

describe('Fractions.MOLE', function () {
  it('should return "mole"', function () {
    assert.equal(Fractions.MOLE, "mole");
  });
});

describe('Fractions.MASS', function () {
  it('should return "mass"', function () {
    assert.equal(Fractions.MASS, "mass");
  });
});