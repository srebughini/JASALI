import {
    AsaliError
} from "./utils.js"
import chemistryPkg from '@chemistry/elements';

let moleculesDict = {
    "AR": {
        elementsSymbol: ["Ar"],
        numberOfAtoms: [1]
    },
    "HE": {
        elementsSymbol: ["He"],
        numberOfAtoms: [1]
    },
    "CH4": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [4, 1]
    },
    "C3H8": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [8, 3]
    },
    "C3H6": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [6, 3]
    },
    "C2H4": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [4, 2]
    },
    "C2H2": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [2, 2]
    },
    "O2": {
        elementsSymbol: ["O"],
        numberOfAtoms: [2]
    },
    "N2": {
        elementsSymbol: ["N"],
        numberOfAtoms: [2]
    },
    "CO": {
        elementsSymbol: ["C", "O"],
        numberOfAtoms: [1, 1]
    },
    "CO2": {
        elementsSymbol: ["C", "O"],
        numberOfAtoms: [1, 2]
    },
    "H2O": {
        elementsSymbol: ["H", "O"],
        numberOfAtoms: [2, 1]
    },
    "H2O2": {
        elementsSymbol: ["H", "O"],
        numberOfAtoms: [2, 2]
    },
    "NO2": {
        elementsSymbol: ["O", "N"],
        numberOfAtoms: [2, 1]
    },
    "NO": {
        elementsSymbol: ["O", "N"],
        numberOfAtoms: [1, 1]
    },
    "N2O": {
        elementsSymbol: ["O", "N"],
        numberOfAtoms: [1, 2]
    },
    "NH3": {
        elementsSymbol: ["H", "N"],
        numberOfAtoms: [3, 1]
    },
    "CH2O": {
        elementsSymbol: ["H", "C", "O"],
        numberOfAtoms: [2, 1, 1]
    },
    "CH3OH": {
        elementsSymbol: ["H", "C", "O"],
        numberOfAtoms: [4, 1, 1]
    },
    "C6H6": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [6, 6]
    },
    "C7H8": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [8, 7]
    },
    "N2H4": {
        elementsSymbol: ["H", "N"],
        numberOfAtoms: [4, 2]
    },
    "CH3COOH": {
        elementsSymbol: ["H", "C", "O"],
        numberOfAtoms: [4, 2, 2]
    },
    "C2H5OH": {
        elementsSymbol: ["H", "C", "O"],
        numberOfAtoms: [6, 2, 1]
    },
    "CH3COCH3": {
        elementsSymbol: ["H", "C", "O"],
        numberOfAtoms: [6, 3, 1]
    },
    "MEK": {
        elementsSymbol: ["H", "C", "O"],
        numberOfAtoms: [8, 4, 1]
    },
    "NC4H8": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [8, 4]
    },
    "IC4H8": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [8, 4]
    },
    "IC4H10": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [10, 4]
    },
    "NC4H10": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [10, 4]
    },
    "N1C4H9OH": {
        elementsSymbol: ["H", "C", "O"],
        numberOfAtoms: [10, 4, 1]
    },
    "N2C4H9OH": {
        elementsSymbol: ["H", "C", "O"],
        numberOfAtoms: [10, 4, 1]
    },
    "TC4H9OH": {
        elementsSymbol: ["H", "C", "O"],
        numberOfAtoms: [10, 4, 1]
    },
    "IC4H9OH": {
        elementsSymbol: ["H", "C", "O"],
        numberOfAtoms: [10, 4, 1]
    },
    "CYC5H8": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [8, 5]
    },
    "C5H8": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [8, 5]
    },
    "C6H5OH": {
        elementsSymbol: ["H", "C", "O"],
        numberOfAtoms: [6, 6, 1]
    },
    "C6H5CHO": {
        elementsSymbol: ["H", "C", "O"],
        numberOfAtoms: [6, 7, 1]
    },
    "NC7H14": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [14, 7]
    },
    "NC7H16": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [16, 7]
    },
    "XYLENE": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [10, 8]
    },
    "C6H5C2H3": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [8, 8]
    },
    "IC8H18": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [18, 8]
    },
    "NC10H22": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [22, 10]
    },
    "BIPHENYL": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [10, 12]
    },
    "H2": {
        elementsSymbol: ["H"],
        numberOfAtoms: [2]
    },
    "C2H6": {
        elementsSymbol: ["H", "C"],
        numberOfAtoms: [6, 2]
    }
}

export function MoleculeComposition(gasSpecieName) {
    let _moleculeDict = undefined;
    let _numberOfElements = undefined;

    if (gasSpecieName != undefined) {
        _moleculeDict = _checkSpecieName(gasSpecieName);
        _numberOfElements = _moleculeDict.elementsSymbol.length;
    }

    function _checkSpecieName(gasSpecieName) {
        try {
            return moleculesDict[gasSpecieName];
        } catch (error) {
            console.log(error);
            AsaliError("Unknwon species name: " + gasSpecieName)
        }
    }

    function getElementsList() {
        if (_moleculeDict == undefined) {
            return [];
        }
        return _moleculeDict.elementsSymbol.map(symbol => chemistryPkg.ChemElements.getBySymbol(symbol));
    }

    function getElementsSymbol() {
        if (_moleculeDict == undefined) {
            return "";
        }
        return _moleculeDict.elementsSymbol;
    }

    function getNumberOfAtoms() {
        if (_moleculeDict == undefined) {
            return 0;
        }
        return _moleculeDict.numberOfAtoms;
    }

    function getElementCounterDict() {
        if (_moleculeDict == undefined) {
            return {};
        }

        let _elementCounter = {}
        for (let i = 0; i < _numberOfElements; i++) {
            _elementCounter[_moleculeDict.elementsSymbol[i]] = _moleculeDict.numberOfAtoms[i]
        }
        return _elementCounter;
    }

    function getAvailableSpecies() {
        return Object.keys(moleculesDict);
    }

    return {
        getElementsList,
        getElementsSymbol,
        getNumberOfAtoms,
        getElementCounterDict,
        getAvailableSpecies
    }
}