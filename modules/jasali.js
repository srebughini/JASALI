import ThermoParameters from "./thermo.js"
import TransportParameters from "./transport.js"
import { CollisionIntegral11, CollisionIntegral22 } from "./omega.js"
import { Fractions, Parameters, AsaliError } from "./utils.js"

export function GasState({ temperature, pressure }) {
    let _temperature = temperature;
    let _pressure = pressure;

    function getTemperature() {
        return _temperature;
    }

    function getPressure() {
        return _pressure;
    }

    return { getTemperature, getPressure }
}

export function GasSpecie({ name, gasState }) {
    let _thermo = ThermoParameters();
    let _transport = TransportParameters();
    let _name = name;
    let _temperature = gasState.getTemperature();
    let _pressure = gasState.getPressure();
    let _highTemperatureCoefficients = _thermo.getHighTemperatureCoefficients(_name);
    let _lowTemperatureCoefficients = _thermo.getLowTemperatureCoefficients(_name);
    let _geometry = _transport.getGeometry(_name);
    let _LJpotential = _transport.getLJpotential(_name);
    let _LJdiameter = _transport.getLJdiameter(_name);
    let _dipole = _transport.getDipole(_name);
    let _polar = _transport.getPolar(_name);
    let _collision = _transport.getCollision(_name);
    let _molecularWeight = _transport.getMolecularWeight(_name);

    //Bools for speed up
    let _cp_update = true;
    let _h_update = true;
    let _s_update = true;
    let _mu_update = true;
    let _v_update = true;
    let _l_update = true;
    let _diff_update = true;
    let _cond_update = true;

    //Reset bools
    function _resetBools() {
        _cp_update = true;
        _h_update = true;
        _s_update = true;
        _mu_update = true;
        _v_update = true;
        _l_update = true;
        _diff_update = true;
        _cond_update = true;
    }

    //Update gas state
    function updateGasState(gasState) {
        _temperature = gasState.getTemperature();
        _pressure = gasState.getPressure();
        _resetBools();
        return this;
    }

    //Mixture molecular weight and density
    function getDensity() {
        return _molecularWeight * _pressure / (Parameters.R * _temperature)
    }

    function getMolecularWeight() {
        return _molecularWeight;
    }

    //Specific heat
    let _cpMole = 0.;
    let _cpMass = 0.;
    function _calculateSpecificHeat() {
        if (_cp_update) {
            let _coefficients = _highTemperatureCoefficients;

            if (_temperature < 1000) {
                _coefficients = _lowTemperatureCoefficients;
            }

            _cpMole = _coefficients[0]
                + _coefficients[1] * _temperature
                + _coefficients[2] * Math.pow(_temperature, 2.)
                + _coefficients[3] * Math.pow(_temperature, 3.)
                + _coefficients[4] * Math.pow(_temperature, 4.);

            _cpMole = _cpMole * Parameters.R;
            _cpMass = _cpMole / _molecularWeight; //J/Kg/K

            _cp_update = false;
        }
    }

    function getMolarSpecificHeat() {
        _calculateSpecificHeat();
        return _cpMole;
    }

    function getMassSpecificHeat() {
        _calculateSpecificHeat();
        return _cpMass;
    }

    //Enthalpy
    let _hMole = 0.;
    let _hMass = 0.;
    function _calculateEnthalpy() {
        if (_h_update) {
            let _coefficients = _highTemperatureCoefficients;

            if (_temperature < 1000) {
                _coefficients = _lowTemperatureCoefficients;
            }

            _hMole = _coefficients[0]
                + _coefficients[1] * _temperature / 2.
                + _coefficients[2] * Math.pow(_temperature, 2.) / 3.
                + _coefficients[3] * Math.pow(_temperature, 3.) / 4.
                + _coefficients[4] * Math.pow(_temperature, 4.) / 5.
                + _coefficients[5] / _temperature;

            _hMole = _hMole * Parameters.R * _temperature;
            _hMass = _hMole / _molecularWeight; //J/Kg

            _h_update = false;
        }
    }

    function getMolarEnthalpy() {
        _calculateEnthalpy();
        return _hMole;
    }

    function getMassEnthalpy() {
        _calculateEnthalpy();
        return _hMass;
    }

    //Entropy
    let _sMole = 0.;
    let _sMass = 0.;
    function _calculateEntropy() {
        if (_s_update) {
            let _coefficients = _highTemperatureCoefficients;

            if (_temperature < 1000) {
                _coefficients = _lowTemperatureCoefficients;
            }

            _sMole = _coefficients[0] * Math.log(_temperature)
                + _coefficients[1] * _temperature
                + _coefficients[2] * Math.pow(_temperature, 2.) / 2.
                + _coefficients[3] * Math.pow(_temperature, 3.) / 3.
                + _coefficients[4] * Math.pow(_temperature, 4.) / 4.
                + _coefficients[6];

            _sMole = _sMole * Parameters.R;
            _sMass = _sMole / _molecularWeight; //J/Kg/K

            _s_update = false;
        }
    }

    function getMolarEntropy() {
        _calculateEntropy();
        return _sMole;
    }

    function getMassEntropy() {
        _calculateEntropy();
        return _sMass;
    }

    //Viscosity
    let _mu = 0.;

    function _calculateViscosity() {
        if (_mu_update) {
            let tr = _temperature / _LJpotential;
            let dr = 1.e06 * 0.5 * Math.pow(_dipole, 2.) / (_LJpotential * Parameters.k * Math.pow(_LJdiameter, 3.));
            let sigma = CollisionIntegral22(tr, dr);
            _mu = 1e-05 * (5 / 16) * Math.sqrt(Parameters.pi * Parameters.k * _temperature * _molecularWeight * 1.66054) / (Parameters.pi * sigma * Math.pow(_LJdiameter, 2));
            _mu_update = false;
        }
    }

    function getViscosity() {
        _calculateViscosity();
        return _mu;
    }

    //Gas velocity
    let _v = 0.;

    function _calculateArithmeticMeanGasVelocity() {
        if (_v_update) {
            _v = Math.sqrt(8 * Parameters.R * _temperature / (Parameters.pi * _molecularWeight));
            _v_update = false;
        }
    }

    function getArithmeticMeanGasVelocity() {
        _calculateArithmeticMeanGasVelocity();
        return _v;
    }

    //Mean free path
    let _l = 0.;

    function _calculateMeanFreePath() {
        if (_l_update) {
            _l = Parameters.k * 1e-03 * _temperature / (Math.sqrt(2) * _pressure * Math.pow(_LJdiameter, 2.));
            _l_update = false;
        }

    }

    function getMeanFreePath() {
        _calculateMeanFreePath();
        return _v;
    }

    //Diffusion
    let _diff = 0.;

    function _calculateDiffusion() {
        if (_diff_update) {
            let MWmix = _molecularWeight / 2.;
            let tr = _temperature / _LJpotential;
            let dr = 1e06 * 0.5 * Math.pow(_dipole, 2.) / (_LJpotential * Parameters.k * Math.pow(_LJdiameter, 3.));
            let sigma = CollisionIntegral11(tr, dr);
            _diff = (3 / 16) * Math.sqrt(2. * Parameters.pi * Math.pow(Parameters.k * _temperature, 3.) / (MWmix * 1.66054)) / (_pressure * Parameters.pi * Math.pow(_LJdiameter, 2.) * sigma);
            _diff = _diff * 0.1;
            _diff_update = false;
        }
    }

    function getDiffusion()
    {
        _calculateDiffusion()
        return _diff;
    }

    //Thermal conductivity
    let _cond = 0.;

    function _calculateThermalConductivity()
    {
        if (_cond_update)
        {
            _calculateViscosity();
            _calculateDiffusion();
            _calculateSpecificHeat();

            let cvtrans = 0.;
            let cvrot = 0.;
            let cvvib = 0.;

            if (_geometry == 0) //single atom
            {
                cvtrans = 3. * Parameters.R * 0.5;
                cvrot = 0.;
                cvvib = 0.;
            }
            else if (_geometry == 1) //linear
            {
                cvtrans = 3. * Parameters.R * 0.5;
                cvrot = Parameters.R;
                cvvib = _cpMole - Parameters.R - 5. * Parameters.R * 0.5;
            }
            else //non linear
            {
                cvtrans = 3. * Parameters.R * 0.5;
                cvrot = 3. * Parameters.R * 0.5;
                cvvib = _cpMole - Parameters.R - 3. * Parameters.R;
            }

            let rho =  getDensity()
            let A = (5. / 2.) - rho * _diff / _mu;

            let F_T = 1. + 0.5 * Math.sqrt(Math.pow(Parameters.pi, 3.) * _LJpotential / _temperature)
                + (0.25 * Math.pow(Parameters.pi, 2.) + 2.) * (_LJpotential / _temperature)
                + Math.sqrt(Math.pow(Parameters.pi * _LJpotential / _temperature, 3.));
            let F_298 = 1. + 0.5 * Math.sqrt(Math.pow(Parameters.pi, 3.) * _LJpotential / 298.)
                + (0.25 * Math.pow(Parameters.pi, 2.) + 2.) * (_LJpotential / 298.)
                + Math.sqrt(Math.pow(Parameters.pi * _LJpotential / 298., 3.));

            let Zrot = _collision * F_298 / F_T;
            let B = Zrot + (2 / Parameters.pi) * ((5 / 3) * (cvrot / Parameters.R) + rho * _diff / _mu);

            let ftrans = (5 / 2) * (1 - 2 * cvrot * A / (Parameters.pi * cvtrans * B));
            let frot = (rho * _diff / _mu) * (1. + 2. * A / (Parameters.pi * B));
            let fvib = rho * _diff / _mu;

            _cond = _mu * (ftrans * cvtrans + frot * cvrot + fvib * cvvib) / _molecularWeight;

            _cond_update = false;
        }
    }

    function getThermalConductivity()
    {
        _calculateThermalConductivity();
        return _cond;
    }

    function getName() {
        return _name;
    }

    function getGeometry() {
        return _geometry;
    }

    function getLJpotential() {
        return _LJpotential;
    }

    function getLJdiameter() {
        return _LJdiameter;
    }

    function getDipole() {
        return _dipole;
    }

    function getPolar() {
        return _polar;
    }

    function getCollision() {
        return _collision;
    }

    return {
        updateGasState,
        getName,
        getMolecularWeight,
        getDensity,
        getMolarSpecificHeat,
        getMassSpecificHeat,
        getMolarEnthalpy,
        getMassEnthalpy,
        getMolarEntropy,
        getMassEntropy,
        getViscosity,
        getArithmeticMeanGasVelocity,
        getMeanFreePath,
        getDiffusion,
        getThermalConductivity,
        getGeometry,
        getLJpotential,
        getLJdiameter,
        getDipole,
        getPolar,
        getCollision
    }
}

export function GasMixtureComposition(compositionArray, compositionType) {
    let _compositionType = compositionType;
    let _numberOfSpecies = compositionArray.length;
    let _species = compositionArray.map(compositionDictionary => compositionDictionary.specie);
    let _moleFraction = new Array(_numberOfSpecies);
    let _massFraction = new Array(_numberOfSpecies);
    let _molecularWeight = 0.

    if (_compositionType == Fractions.MOLE) {
        _moleFraction = compositionArray.map(compositionDictionary => compositionDictionary.value);
        _molecularWeight = compositionArray.map(compositionDictionary => compositionDictionary.value * compositionDictionary.specie.getMolecularWeight()).reduce((a, b) => a + b, 0);
        _massFraction = compositionArray.map(compositionDictionary => compositionDictionary.value * compositionDictionary.specie.getMolecularWeight() / _molecularWeight);
    }
    else if (_compositionType == Fractions.MASS) {
        _massFraction = compositionArray.map(compositionDictionary => compositionDictionary.value);
        _molecularWeight = compositionArray.map(compositionDictionary => compositionDictionary.value / compositionDictionary.specie.getMolecularWeight()).reduce((a, b) => a + b, 0);
        _moleFraction = compositionArray.map(compositionDictionary => compositionDictionary.value / compositionDictionary.specie.getMolecularWeight() / _mixtureMolecularWeight);
    }

    if (Math.abs(_moleFraction.reduce((a, b) => a + b, 0) - 1.) > 1e-16) {
        AsaliError("Composition sum != 1");
    }

    function getCompositionType() {
        return _compositionType;
    }

    function getCompositionDictionary() {
        return _compositionDictionary;
    }

    function getMassFraction() {
        return _massFraction;
    }

    function getMoleFraction() {
        return _moleFraction;
    }

    function getNumberOfSpecies() {
        return _numberOfSpecies;
    }

    function getSpecies() {
        return _species;
    }

    function getMolecularWeight() {
        return _molecularWeight;
    }

    return { getCompositionDictionary, getCompositionType, getMassFraction, getMoleFraction, getNumberOfSpecies, getSpecies, getMolecularWeight }
}

export function GasMixture({ gasState, mixtureComposition }) {
    //Bools for speed up
    let _cp_update = true;
    let _h_update = true;
    let _s_update = true;
    let _mu_update = true;
    let _diff_update = true;
    let _diffMix_update = true;
    let _cond_update = true;

    //Species gas state
    let _species = mixtureComposition.getSpecies();
    let _numberOfSpecies = mixtureComposition.getNumberOfSpecies();
    _species.map(specie => specie.updateGasState(gasState))

    function getSpecies() {
        return _species;
    }

    //Composition
    let _speciesMolecularWeight = _species.map(specie => specie.getMolecularWeight())
    let _moleFraction = mixtureComposition.getMoleFraction();
    let _massFraction = mixtureComposition.getMassFraction();

    function getMassFraction() {
        return _massFraction;
    }

    function getMoleFraction() {
        return _moleFraction;
    }

    //Mixture molecular weight and density
    let _molecularWeight = mixtureComposition.getMolecularWeight();
    let _temperature = gasState.getTemperature();
    let _pressure = gasState.getPressure();

    function getMolecularWeight() {
        return _molecularWeight;
    }

    function getDensity() {
        return _molecularWeight * _pressure / (Parameters.R * _temperature)
    }

    //Specific heat
    let _cpMole = _species.map(specie => specie.getMolarSpecificHeat())
    let _cpMass = _species.map(specie => specie.getMassSpecificHeat())
    let _cpMixMole = 0.;
    let _cpMixMass = 0.;

    function _calculateSpecificHeat() {
        if (_cp_update) {
            _cpMixMole = 0.;
            _cpMixMass = 0.;
            for (let i = 0; i < _numberOfSpecies; i++) {
                _cpMixMole = _cpMixMole + _cpMole[i] * _moleFraction[i];
                _cpMixMass = _cpMixMass + _cpMass[i] * _massFraction[i];
            }
            _cp_update = false;
        }
    }

    function getMolarSpecificHeat() {
        _calculateSpecificHeat();
        return _cpMixMole;
    }

    function getMassSpecificHeat() {
        _calculateSpecificHeat();
        return _cpMixMass;
    }

    //Enthalpy
    let _hMole = _species.map(specie => specie.getMolarEnthalpy())
    let _hMass = _species.map(specie => specie.getMassEnthalpy())
    let _hMixMole = 0.;
    let _hMixMass = 0.;

    function _calculateEnthalpy() {
        if (_h_update) {
            _hMixMole = 0.;
            _hMixMass = 0.;
            for (let i = 0; i < _numberOfSpecies; i++) {
                _hMixMole = _hMixMole + _hMole[i] * _moleFraction[i];
                _hMixMass = _hMixMass + _hMass[i] * _massFraction[i];
            }
            _h_update = false;
        }
    }

    function getMolarEnthalpy() {
        _calculateEnthalpy();
        return _hMixMole;
    }

    function getMassEnthalpy() {
        _calculateEnthalpy();
        return _hMixMass;
    }

    //Entropy
    let _sMole = _species.map(specie => specie.getMolarEntropy())
    let _sMass = _species.map(specie => specie.getMassEntropy())
    let _sMixMole = 0.;
    let _sMixMass = 0.;

    function _calculateEntropy() {
        if (_s_update) {
            _sMixMole = 0.;
            _sMixMass = 0.;
            for (let i = 0; i < _numberOfSpecies; i++) {
                _sMixMole = _sMixMole + _sMole[i] * _moleFraction[i];
                _sMixMass = _sMixMass + _sMass[i] * _massFraction[i];
            }
            _s_update = false;
        }
    }

    function getMolarEntropy() {
        _calculateEntropy();
        return _sMixMole;
    }

    function getMassEntropy() {
        _calculateEntropy();
        return _sMixMass;
    }

    //Viscosity
    let _mu = _species.map(specie => specie.getViscosity());
    let _muMix = 0.;

    function _calculateViscosity() {
        if (_mu_update) {
            _muMix = 0.;
            let sum = 0.;
            let phi = 0.;
            for (let k = 0; k < _numberOfSpecies; k++) {
                sum = 0.;
                for (let j = 0; j < _numberOfSpecies; j++) {
                    phi = (1. / Math.sqrt(8.)) * (1. / Math.sqrt(1. + _speciesMolecularWeight[k] / _speciesMolecularWeight[j])) * Math.pow((1. + Math.sqrt(_mu[k] / _mu[j]) * Math.pow(_speciesMolecularWeight[j] / _speciesMolecularWeight[k], (1. / 4.))), 2.);
                    sum = sum + _moleFraction[j] * phi;
                }
                _muMix = _muMix + _moleFraction[k] * _mu[k] / sum;
            }
            _mu_update = false;
        }
    }

    function getViscosity() {
        _calculateViscosity();
        return _muMix;
    }

    //Binary diffusivity and mixture diffusivity
    let _diff = new Array(_numberOfSpecies);
    let _diffMix = new Array(_numberOfSpecies);
    let _polar = _species.map(specie => specie.getPolar());
    let _LJpotential = _species.map(specie => specie.getLJpotential());
    let _LJdiameter = _species.map(specie => specie.getLJdiameter());
    let _dipole = _species.map(specie => specie.getDipole());

    function _calculateBinaryDiffusion() {
        if (_diff_update) {
            for (let i = 0; i < _numberOfSpecies; i++) {
                _diff[i] = new Array(_numberOfSpecies);
            }

            for (let i = 0; i < _numberOfSpecies; i++) {
                for (let j = 0; j < i; j++) {
                    _diff[i][j] = _diff[j][i];
                }

                for (let j = i; j < _numberOfSpecies; j++) {
                    let MWmix = _speciesMolecularWeight[i] * _speciesMolecularWeight[j] / (_speciesMolecularWeight[i] + _speciesMolecularWeight[j]);
                    let LJpotentialmix = 0.;
                    let LJdiametermix = 0.;
                    let dipolemix = 0.;
                    if (_polar[i] == 0 && _polar[j] == 0) {
                        LJpotentialmix = Math.sqrt(_LJpotential[i] * _LJpotential[j]);
                        LJdiametermix = 0.5 * (_LJdiameter[i] + _LJdiameter[j]);
                        dipolemix = Math.sqrt(_dipole[i] * _dipole[j]);
                    }
                    else if (_polar[i] > 0 && _polar[j] > 0) {
                        LJpotentialmix = Math.sqrt(_LJpotential[i] * _LJpotential[j]);
                        LJdiametermix = 0.5 * (_LJdiameter[i] + _LJdiameter[j]);
                        dipolemix = Math.sqrt(_dipole[i] * _dipole[j]);
                    }
                    else {
                        let polarn = 0.;
                        let dipolep = 0.;
                        let chi = 0.;
                        if (_polar[i] == 0) {
                            polarn = _polar[i] / Math.pow(_LJdiameter[i], 3.);
                            dipolep = 1e02 * _dipole[j] / Math.sqrt(_LJpotential[j] * 1.3806488 * Math.pow(_LJdiameter[j], 3.));
                            chi = 1. + 0.25 * polarn * dipolep * Math.sqrt(_LJpotential[j] / _LJpotential[i]);
                        }
                        else {
                            polarn = _polar[j] / Math.pow(_LJdiameter[j], 3.);
                            dipolep = 1e02 * _dipole[i] / Math.sqrt(_LJpotential[i] * 1.3806488 * Math.pow(_LJdiameter[innerWidth], 3.));
                            chi = 1. + 0.25 * polarn * dipolep * Math.sqrt(_LJpotential[i] / _LJpotential[j]);

                        }
                        LJpotentialmix = Math.pow(chi, 2.) * Math.sqrt(_LJpotential[i] * _LJpotential[j]);
                        LJdiametermix = 0.5 * (_LJdiameter[i] + _LJdiameter[j]) * Math.pow(chi, -1. / 6.);
                        dipolemix = 0.;
                    }

                    let tr = _temperature / LJpotentialmix;
                    let dr = 1e06 * 0.5 * Math.pow(dipolemix, 2.) / (LJpotentialmix * Parameters.k * Math.pow(LJdiametermix, 3.));
                    let sigma = CollisionIntegral11(tr, dr);
                    _diff[i][j] = (3 / 16) * Math.sqrt(2. * Parameters.pi * Math.pow(Parameters.k * _temperature, 3.) / (MWmix * 1.66054)) / (_pressure * Parameters.pi * Math.pow(LJdiametermix, 2.) * sigma);
                    _diff[i][j] = _diff[i][j] * 0.1;
                }
            }
            _diff_update = false;
        }
    }

    function _calculateMixtureDiffusion() {
        if (_diffMix_update) {
            _calculateBinaryDiffusion();
            for (let i = 0; i < _numberOfSpecies; i++) {
                let A = 0.;
                let B = 0.;
                for (let j = 0; j < _numberOfSpecies; j++) {
                    if (j != i) {
                        A = A + _moleFraction[j] * _speciesMolecularWeight[j];
                        B = B + _moleFraction[j] / _diff[j][i];
                    }

                }
                _diffMix[i] = A / (_molecularWeight * B)
            }
            _diffMix_update = false;
        }
    }

    function getBinaryDiffusion() {
        _calculateBinaryDiffusion();
        return _diff;
    }

    function getMixtureDiffusion() {
        _calculateMixtureDiffusion();
        return _diffMix;
    }

    //Thermal conductivity
    let _cond = _species.map(specie => specie.getThermalConductivity());
    let _condMix = 0.;

    function _calculateThermalConductivity()
    {
        if (_cond_update)
        {
            let A = 0.;
            let B = 0.;
            for (let i = 0; i < _numberOfSpecies; i++) {
                A = A + _moleFraction[i] * _cond[i];
                B = B + _moleFraction[i] / _cond[i];
            }

            _condMix = 0.5 * (A + 1. / B);
            _cond_update = false;
        }
    }

    function getThermalConductivity() {
        _calculateThermalConductivity();
        return _condMix;
    }

    return {
        getSpecies,
        getMassFraction,
        getMoleFraction,
        getMolecularWeight,
        getDensity,
        getMolarSpecificHeat,
        getMassSpecificHeat,
        getMolarEnthalpy,
        getMassEnthalpy,
        getMolarEntropy,
        getMassEntropy,
        getViscosity,
        getBinaryDiffusion,
        getMixtureDiffusion,
        getThermalConductivity
    }
}