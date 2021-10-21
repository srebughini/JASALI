import { GasState, GasSpecie, GasMixtureComposition, GasMixture }  from "./src/jasali.js"
import { multiply, transpose, zeros, diag, log, add, matrix, subset, index, range, concat, lusolve, divide, sum } from 'mathjs'

let state = GasState({ temperature: 393.15, pressure: 4e05 })
let specieCO = GasSpecie({ name: "CO", gasState: state });
let specieCO2 = GasSpecie({ name: "O2", gasState: state });
let specieO2 = GasSpecie({ name: "CO2", gasState: state });
let compositions = GasMixtureComposition([{ "specie": specieCO, "value": 0.1 },
{ "specie": specieCO2, "value": 0.2 },
{ "specie": specieO2, "value": 0.7 }], "mole")

let speciesToElementMatrix = compositions.getSpeciesToElementsMatrix()
//let freeGibbsEnergyVector = compositions.getSpeciesMolarGibbsFreeEnergy()
let x0 = compositions.getMoleFraction()
let NS = x0.length
let NA = compositions.getNumberOfElements()

let gCO = - 33.578
let gCO2 = - 49.83
let gO2 = - 30.273

let freeGibbsEnergyVector = [gCO, gO2, gCO2]

console.log(compositions.getSpeciesMassGibbsFreeEnergy())
console.log(freeGibbsEnergyVector)

/*
let P = 101325.
let T = 3000.
let R = 8314.
let V = 1.
let ntot = P * V / (R * T)

let n0 = multiply(x0, ntot)
let UL = matrix(compositions.getSpeciesToElementsMatrix())
let bL = multiply(transpose(UL), n0)
let LR = multiply(transpose(UL), ntot)

console.log(ntot)
console.log(LR)

for (let i=0;i<1;i++){
  console.log("Iter " + i)
  let x = new Array(NS)
  let x_inv = new Array(NS)
  for ( let j=0;j<NS;j++)
  {
    x_inv[j] = -1.0/Math.max(x0[j],1.e-16);
    x[j] = Math.max(x0[j],1.e-16);
  }

  let UR = diag(x_inv)
  console.log(UR)
  let bU = add(add(log(x),freeGibbsEnergyVector),-1.0)
  console.log(bU)

  let A = zeros((NS + NA), (NS + NA))
  A = subset(A, index(range(0, NS), range(0,NA)), UL)
  A = subset(A, index(range(0, NS), range(NA,NA+NS)), UR)
  A = subset(A, index(range(NS, NS+NA), range(NA,NA+NS)), LR)
  let b = concat(bU, bL)
  let sol = lusolve(A, b)

  console.log(sol)

  x = subset(sol, index(range(NA, NS+NA), 0))
  x = divide(x,sum(x))
  console.log(x)
  console.log(sum(x))
}
*/