import {GasState} from "../src/jasali.js"
import * as assert from 'assert'

let state = GasState({ temperature: 393.15, pressure: 4e05})


describe('GasState.getTemperature()', function() {
    it('should return 393.15 when the value is 393.15', function() {
      assert.equal(state.getTemperature(), 393.15);
    });
  });

  describe('GasState.getPressure()', function() {
    it('should return 4e05 when the value is 4e05', function() {
      assert.equal(state.getPressure(), 4e05);
    });
  });
