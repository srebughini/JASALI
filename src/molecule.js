import { AsaliError } from "./utils.js"
import chemistryPkg from '@chemistry/elements';

let moleculesDict = {
    "AC3H4": {
        elementsSymbol: ["C", "H"],
        numberOfAtoms: [3, 4]
    }
}

export default function MoleculeComposition(gasSpecieName) {
    let _moleculeDict = _checkSpecieName(gasSpecieName);
    let _numberOfElements = _moleculeDict.elementsSymbol.length;

    function _checkSpecieName(gasSpecieName)
    {
        try
        {
            return moleculesDict[gasSpecieName];
        }
        catch (error) {
            console.log(error);
            AsaliError("Unknwon species name: " + gasSpecieName)
        }
    }

    function getElementsList() {
        return _moleculeDict.elementsSymbol.map(symbol => chemistryPkg.ChemElements.getBySymbol(symbol));
    }

    function getElementsSymbol()
    {
        return _moleculeDict.elementsSymbol;
    }

    function getNumberOfAtoms()
    {
        return _moleculeDict.numberOfAtoms;
    }

    function getElementCounterDict()
    {
        let _elementCounter = {}
        for (let i = 0; i < _numberOfElements; i++) {
            _elementCounter[_moleculeDict.elementsSymbol[i]] = _moleculeDict.numberOfAtoms[i]
        }
        return _elementCounter;
    }

    return { getElementsList, getElementsSymbol, getNumberOfAtoms,  getElementCounterDict}
}