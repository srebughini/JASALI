interface IGasState {
  getTemperature(): number;

  getPressure(): number;
}

interface IGasSpecie {
  /**
   * Update gas state
   */
  updateGasState(gasState: IGasState): this;

  /**
   * Mixture molecular weight and density
   */
  getDensity(): number;

  getMolecularWeight(): number;

  getMolarSpecificHeat(): number;

  getMassSpecificHeat(): number;

  getMolarEnthalpy(): number;

  getMassEnthalpy(): number;

  getMolarEntropy(): number;

  getMassEntropy(): number;

  getMolarInternalEnergy(): number;

  getMassInternalEnergy(): number;

  getMolarGibbsFreeEnergy(): number;

  getMassGibbsFreeEnergy(): number;

  getViscosity(): number;

  getArithmeticMeanGasVelocity(): number;

  getMeanFreePath(): number;

  getDiffusion(): number;

  getThermalConductivity(): number;

  getName(): string;

  getGeometry(): number;

  getLJpotential(): number;

  getLJdiameter(): number;

  getDipole(): number;

  getPolar(): number;

  getCollision(): number;
}

interface IGasMixtureComposition {
  getCompositionType(): string;

  getMassFraction(): number[];

  getMoleFraction(): number[];

  getNumberOfSpecies(): number;

  getSpecies(): IGasSpecie[];

  getMolecularWeight(): number;
}

interface IGasMixture {
  getSpecies(): IGasSpecie[];

  getMassFraction(): number[];

  getMoleFraction(): number[];

  getMolecularWeight(): number;

  getDensity(): number;

  getMolarSpecificHeat(): number;

  getMassSpecificHeat(): number;

  getMolarEnthalpy(): number;

  getMassEnthalpy(): number;

  getMolarEntropy(): number;

  getMassEntropy(): number;

  getMolarInternalEnergy(): number;

  getMassInternalEnergy(): number;

  getMolarGibbsFreeEnergy(): number;

  getMassGibbsFreeEnergy(): number;

  getViscosity(): number;

  getBinaryDiffusion(): number[][];

  getMixtureDiffusion(): number[];

  getThermalConductivity(): number;
}

export function GasState(values: {
  temperature: number;
  pressure: number;
}): IGasState;

export function GasSpecie(values: {
  name: string;
  gasState: IGasState;
}): IGasSpecie;

export function GasMixtureComposition(compositionArray: {
  specie: IGasSpecie;
  value: number;
}[], compositionType: string): IGasMixtureComposition;

export function GasMixture(values: {
  gasState: IGasState;
  mixtureComposition: IGasMixtureComposition;
}): IGasMixture;
