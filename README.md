<p align="center">
  <a href="https://imgur.com/8OYkCIh"><img src="https://i.imgur.com/8OYkCIhm.png" title="source: imgur.com" /></a>
</p>
<p align="center">
  <a href="https://travis-ci.org/srebughini/JASALI"><img alt="Travis (.org)" src="https://img.shields.io/travis/srebughini/JASALI"></a>
  <a href="https://www.npmjs.com/package/jasali"><img alt="npm" src="https://img.shields.io/npm/dt/jasali"></a>
  <a href="https://www.npmjs.com/package/jasali"><img alt="npm" src="https://img.shields.io/npm/v/jasali?color=blue"></a>
  <a href="https://github.com/srebughini/JASALI/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/srebughini/JASALI"></a>
  <a href="https://www.codefactor.io/repository/github/srebughini/jasali"><img src="https://www.codefactor.io/repository/github/srebughini/jasali/badge" alt="CodeFactor" /></a>
</p>

## 1. Installation
**J**a**S**ali is part of the [**ASALI**](https://github.com/srebughini/JASALI) project and it is a **JavaScript** library to estimate **thermodynamic** and **transport** properties of **gas mixtures**.  
Its [**npm package**](https://www.npmjs.com/package/jasali) can be installed as follow:

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
