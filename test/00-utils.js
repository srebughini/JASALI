import {
  RoundFloat,
  RunAssertForFloat,
  RoundArray,
  RunAssertForArray,
  RoundMatrix,
  RunAssertForMatrix,
  RunAssertForDictionary,
  Fractions,
  Parameters
} from "../src/utils.js"
import * as assert from 'assert'

describe('RoundFloat', function () {
  it('should return 1.0 to round 0.9995 with 3 number of significants', function () {
    assert.equal(RoundFloat(0.9995, 3), 1.0);
  });
});

describe('RunAssertForFloat', function () {
  it('should return true when 0.9995 and 1.0 are compared with 3 number of significants', function () {
    RunAssertForFloat(0.9995, 1.0, 3);
  });
});

describe('RoundArray', function () {
  it('should return [1.0, 0.999] to round [0.9995, 0.9994] with 3 number of significants', function () {
    assert.deepEqual(RoundArray([0.9995, 0.9994], 3), [1.0, 0.999]);
  });
});

describe('RunAssertForArray', function () {
  it('should return true when [0.9995, 0.9994] and [1.0, 0.999] are compared with 3 number of significants', function () {
    RunAssertForArray([0.9995, 0.9994], [1.0, 0.999], 3);
  });
});

describe('RoundMatrix', function () {
  it('should return [[1.0, 0.999], [0.999, 1.0]] to round [[0.9995, 0.9994], [0.9993, 0.9999]] with 3 number of significants', function () {
    assert.deepEqual(RoundMatrix([
      [0.9995, 0.9994],
      [0.9993, 0.9999]
    ], 3), [
      [1.0, 0.999],
      [0.999, 1.0]
    ]);
  });
});

describe('RunAssertForMatrix', function () {
  it('should return true when [[1.0, 0.999], [0.999, 1.0]] and [[0.9995, 0.9994], [0.9993, 0.9999]] are compared with 3 number of significants', function () {
    RunAssertForMatrix([
      [0.9995, 0.9994],
      [0.9993, 0.9999]
    ], [
      [1.0, 0.999],
      [0.999, 1.0]
    ], 3);
  });
});

describe('RunAssertForDictionary', function () {
  it('should return true when {"H2": 0.5, "O2": 0.5} and {"H2": 0.5, "O2": 0.5} are compared', function () {
    RunAssertForDictionary({
      "H2": 0.5,
      "O2": 0.5
    }, {
      "H2": 0.5,
      "O2": 0.5
    });
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

describe('Parameters.referencePressure', function () {
  let expected = RoundFloat(1e05)
  it('should return ' + expected, function () {
    RunAssertForFloat(Parameters.referencePressure, expected);
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