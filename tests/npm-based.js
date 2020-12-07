import {GasSpecie, GasState, GasMixtureComposition, GasMixture} from 'jasali'

let state = GasState({ temperature: 393.15, pressure: 4e05})

let speciesList = [{"specie": GasSpecie({name: "H2", gasState: state}),"value": 0.1},
                    {"specie": GasSpecie({name: "O2", gasState: state}),"value": 0.2},
                    {"specie": GasSpecie({name: "N2", gasState: state}),"value": 0.7}]


let compositions = GasMixtureComposition(speciesList, "mole")
let mixture = GasMixture({ gasState: state, mixtureComposition: compositions })

console.log(["Molecular weigth     ", mixture.getMolecularWeight(), "g/mol"])
console.log(["Density              ", mixture.getDensity(), "kg/m3"])
console.log(["Viscosity            ", mixture.getViscosity(), "Pas"])
console.log(["Thermal conductivity ", mixture.getThermalConductivity(), "W/m/K"])
console.log(["Specific heat        ", mixture.getMolarSpecificHeat(), "J/kmol/K"])
console.log(["Specific heat        ", mixture.getMassSpecificHeat(), "J/kg/K"])
console.log(["Enthalpy             ", mixture.getMolarEnthalpy(), "J/kmol"])
console.log(["Enthalpy             ", mixture.getMassEnthalpy(), "J/kg"])
console.log(["Entropy              ", mixture.getMolarEntropy(), "J/kmol/K"])
console.log(["Entropy              ", mixture.getMassEntropy(), "J/kg/K"])

let species = mixture.getSpecies();
console.log("Molecular weight [g/mol]")
for (let i=0;i<species.length;i++)
{
    let specie = species[i];

    console.log([specie.getName(),specie.getMolecularWeight()]);
}

console.log("Viscosity [Pas]")
for (let i=0;i<species.length;i++)
{
    let specie = species[i];

    console.log([specie.getName(),specie.getViscosity()]);
}

console.log("Thermal conductivity [W/m/K]")
for (let i=0;i<species.length;i++)
{
    let specie = species[i];

    console.log([specie.getName(),specie.getThermalConductivity()]);
}

let diff = mixture.getBinaryDiffusion()
console.log("Binary diffusion [m2/s]")
for (let i=0;i<species.length;i++)
{
    let name_i = species[i].getName();
    for (let j=0;j<species.length;j++)
    {
        let name_j = species[j].getName();
        console.log([name_i, name_j, diff[i][j]]);
    }
}

console.log("Diffusion [m2/s]")
for (let i=0;i<species.length;i++)
{
    let specie = species[i];

    console.log([specie.getName(),specie.getDiffusion()]);
}

let diffMix = mixture.getMixtureDiffusion()
console.log("Mixture diffusion [m2/s]")
for (let i=0;i<species.length;i++)
{
    console.log([species[i].getName(), diffMix[i]]);
}

console.log("Specific heat [J/kg/K]")
for (let i=0;i<species.length;i++)
{
    let specie = species[i];

    console.log([specie.getName(),specie.getMassSpecificHeat()]);
}

console.log("Enthalpy [J/kg]")
for (let i=0;i<species.length;i++)
{
    let specie = species[i];

    console.log([specie.getName(),specie.getMassEnthalpy()]);
}

console.log("Entropy [J/kg/K]")
for (let i=0;i<species.length;i++)
{
    let specie = species[i];

    console.log([specie.getName(),specie.getMassEntropy()]);
}


console.log("Gas velocity [m/s]")
for (let i=0;i<species.length;i++)
{
    let specie = species[i];

    console.log([specie.getName(),specie.getArithmeticMeanGasVelocity()]);
}

console.log("Mean free path [m]")
for (let i=0;i<species.length;i++)
{
    let specie = species[i];

    console.log([specie.getName(),specie.getMeanFreePath()]);
}