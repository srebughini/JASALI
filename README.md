<p align="center">
  <a href="https://imgur.com/8OYkCIh"><img src="https://i.imgur.com/8OYkCIhm.png" title="source: imgur.com" /></a>
</p>
<p align="center">
  <a href="https://travis-ci.com/srebughini/JASALI"><img alt="Travis (.org)" src="https://img.shields.io/travis/com/srebughini/JASALI"></a>
  <a href="https://www.npmjs.com/package/jasali"><img alt="npm" src="https://img.shields.io/npm/dt/jasali"></a>
  <a href="https://www.npmjs.com/package/jasali"><img alt="npm" src="https://img.shields.io/npm/v/jasali?color=blue"></a>
  <a href="https://github.com/srebughini/JASALI/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/srebughini/JASALI"></a>
  <a href="https://www.codefactor.io/repository/github/srebughini/jasali"><img src="https://www.codefactor.io/repository/github/srebughini/jasali/badge" alt="CodeFactor" /></a>
</p>

## 1. Installation
**J**a**S**ali is part of the [ASALI](https://github.com/srebughini/JASALI) project and it is a **JavaScript** library to estimate **thermodynamic** and **transport** properties of **gas mixtures**.  
Its [npm package](https://www.npmjs.com/package/jasali) can be installed as follow:

```
npm i jasali
```
## 2. Examples - JaSali is based on [International System of Units](https://en.wikipedia.org/wiki/International_System_of_Units)
**J**a**S**ali allows the estimation of thermodynamic and trasport properties of **pure gas species** and **gas mixtures**, as shown in the following examples.  
### 2.1 Pure gas specie: O<sub>2</sub>

```javascript
import { GasSpecie, GasState } from "jasali"

//Generate gas state object
let state = GasState({ temperature: 393.15, pressure: 4e05 })

//Generate specie object
let specie = GasSpecie({ name: "O2", gasState: state })

//Extract properties from the specie object
let name = specie.getName()
let molecularWeight = specie.getMolecularWeight()
let viscosity = specie.getViscosity()
```
### 2.2 Gas mixture: AIR

```javascript
import { GasSpecie, GasState, GasMixtureComposition, GasMixture } from "jasali"

//Generate gas state object
let state = GasState({ temperature: 298.15, pressure: 101325 })

//Generate pure gas specie objects
let o2 = GasSpecie({ name: "O2", gasState: state })
let n2 = GasSpecie({ name: "N2", gasState: state })
let ar = GasSpecie({ name: "AR", gasState: state })

//Generate mixture list
let speciesList = [{ "specie": o2, "value": 0.21 }, { "specie": n2, "value": 0.78 }, { "specie": ar, "value": 0.01 }]

//Generate mixture composition object
let compositions = GasMixtureComposition(speciesList, "mole")

//Generate mixture object
let mixture = GasMixture({ gasState: state, mixtureComposition: compositions })

//Extract properties from the mixture object
let density = mixture.getDensity()
let molecularWeight = mixture.getMolecularWeight()
let viscosity = mixture.getViscosity()
```
## 3. Available thermodynamic and transport properties
Details on the properties estimated by **J**a**S**ali can be found [here](https://srebughini.github.io/ASALI/docs/api-javascript/).
## 4. Contacts
If you want to contribute, ask questions, report bugs or just say *hello* compile the form [here](https://srebughini.github.io/ASALI/pages/contacts/)

## Python version for chemical equilibrium
```python
import numpy as np

"""
Species:
0 CO 
1 CO2 
2 O2

Atoms:
0 O
1 C

"""


def get_atom_to_molecule_matrix():
    # ROW -> Species
    # COL -> Atomos
    # return np.asarray([[1, 2, 2],
    #                   [1, 1, 0]])
    return np.asarray([[1, 1],
                       [2, 1],
                       [2, 0]])


def gibbs_free_energy():
    gCO = - 33.578
    gCO2 = - 49.83
    gO2 = - 30.273
    return np.asarray([gCO, gCO2, gO2]).reshape(3, 1)


if __name__ == '__main__':
    x0 = np.asarray([0.25, 0.25, 0.5]).reshape(3, 1)
    P = 101325.
    T = 3000.
    R = 8314.
    V = 1.
    ntot = P * V / (R * T)

    n0 = x0 * ntot
    UL = get_atom_to_molecule_matrix()
    bL = np.matmul(UL.T, n0)

    NS, NA = UL.shape
    LR = np.transpose(UL.copy()) * ntot
    LL = np.zeros([NA, NA], dtype=np.float64)

    g = gibbs_free_energy()
    for i in range(0, 5):
        print("Iter", i)
        x = np.maximum(x0, 1e-16)
        # print(x)
        UR = np.diag(-1. / x.reshape(3, ))
        bU = np.log(x) + g - 1

        A = np.block([[UL, UR],
                      [LL, LR]])

        b = np.block([[bU], [bL]])

        sol = np.linalg.solve(A, b)

        x0 = sol[2:] / sum(sol[2:])

        print(np.linalg.norm(x0 - x))

    print(x0)
```