import {
  GasState
} from "../src/jasali.js"
import {
  RoundFloat,
  RunAssertForFloat
} from "../src/utils.js"

let state = GasState({
  temperature: 393.15,
  pressure: 4e05
})

describe('GasState.getTemperature()', function () {
  let expected = RoundFloat(393.15)
  it('should return ' + expected + ' when the value is 393.15', function () {
    RunAssertForFloat(state.getTemperature(), expected);
  });
});

describe('GasState.getPressure()', function () {
  let expected = RoundFloat(4e05)
  it('should return ' + expected + ' when the value is 4e05', function () {
    RunAssertForFloat(state.getPressure(), expected);
  });
});