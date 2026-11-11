import {
  GasState,
  GasSpecie,
  GasMixture,
  AsaliError
} from "../src/jasali.js"
import { AsaliError as UtilsAsaliError } from "../src/utils.js"
import * as assert from 'assert'

let state = GasState({
  temperature: 393.15,
  pressure: 4e05
})

describe('AsaliError', function () {
  it('should be the same class exported by utils.js', function () {
    assert.equal(AsaliError, UtilsAsaliError);
  });

  it('should extend Error and keep the message', function () {
    let error = new AsaliError("test message");
    assert.ok(error instanceof Error);
    assert.equal(error.name, "AsaliError");
    assert.equal(error.message, "test message");
  });
});

describe('Unknown species name', function () {
  it('should throw an AsaliError instead of calling alert()', function () {
    assert.throws(function () {
      GasSpecie({
        name: "XYZ",
        gasState: state
      });
    }, function (error) {
      return error instanceof AsaliError && error.message === "Unknown species name: XYZ";
    });
  });
});

describe('Composition sum different from 1', function () {
  it('should throw an AsaliError instead of calling alert()', function () {
    assert.throws(function () {
      GasMixture({
        gasState: state,
        mixtureComposition: {
          "H2": 0.2,
          "O2": 0.3
        },
        compositionType: "mole"
      });
    }, function (error) {
      return error instanceof AsaliError && error.message === "Composition sum != 1";
    });
  });
});
