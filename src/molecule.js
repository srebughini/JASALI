import {
    AsaliError
} from "./utils.js"
import chemistryPkg from '@chemistry/elements';

let moleculesDict = {
    "AC3H4": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        4,
        3
      ],
      formula: "C3H4",
      name: "Allene"
    },
    "CH3COOH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        4,
        2,
        2
      ],
      formula: "C2H4O2",
      name: "Acetic acid"
    },
    "CH3COCH3": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        6,
        3,
        1
      ],
      formula: "C3H6O1",
      name: "Acetone"
    },
    "C2H3CHO": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        4,
        3,
        1
      ],
      formula: "C3H4O1",
      name: "Acrolein"
    },
    "C2H5CHO": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        6,
        3,
        1
      ],
      formula: "C3H6O1",
      name: "Propionaldehyde"
    },
    "C4H9CHO": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        10,
        5,
        1
      ],
      formula: "C5H10O1",
      name: "3-Methylbutanal"
    },
    "AR": {
      elementsSymbol: [
        "Ar"
      ],
      numberOfAtoms: [
        1
      ],
      formula: "AR1",
      name: "Argon"
    },
    "C6H5CH2OH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        8,
        7,
        1
      ],
      formula: "C7H8O1",
      name: "Benzyl alcohol"
    },
    "C6H4O2": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        4,
        6,
        2
      ],
      formula: "C6H4O2",
      name: "1,4-Benzoquinone"
    },
    "C6H6": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        6,
        6
      ],
      formula: "C6H6",
      name: "Benzene"
    },
    "C6H5CHO": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        6,
        7,
        1
      ],
      formula: "C7H6O1",
      name: "Benzaldehyde"
    },
    "C6H5C2H4C6H5": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        14,
        14
      ],
      formula: "C14H14",
      name: "2-Methyldiphenylmethane"
    },
    "NC4H8": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        8,
        4
      ],
      formula: "C4H8",
      name: "Butene"
    },
    "C4H6": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        6,
        4
      ],
      formula: "C4H6",
      name: "Butyne"
    },
    "C12H8": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        8,
        12
      ],
      formula: "C12H8",
      name: "Acenaphthylene"
    },
    "C2H2": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        2,
        2
      ],
      formula: "C2H2",
      name: "Acetylene"
    },
    "C2H4": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        4,
        2
      ],
      formula: "C2H4",
      name: "Ethylene"
    },
    "C2H6": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        6,
        2
      ],
      formula: "C2H6",
      name: "Ethane"
    },
    "C3H6": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        6,
        3
      ],
      formula: "C3H6",
      name: "Propylene"
    },
    "C3H8": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        8,
        3
      ],
      formula: "C3H8",
      name: "Propane"
    },
    "C4H2": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        2,
        4
      ],
      formula: "C4H2",
      name: "Diacetylene"
    },
    "C4H4": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        4,
        4
      ],
      formula: "C4H4",
      name: "Vinylacetylene"
    },
    "CYC5H4O": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        4,
        5,
        1
      ],
      formula: "C5H4O1",
      name: "Cyclopentadienone"
    },
    "C6H5O": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        5,
        6,
        1
      ],
      formula: "C6H5O1",
      name: "Phenoxy"
    },
    "CYC6H10-ONE": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        10,
        6,
        1
      ],
      formula: "C6H10O1",
      name: "Cyclohexanone"
    },
    "CYC5H8": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        8,
        5
      ],
      formula: "C5H8",
      name: "Cyclopentene"
    },
    "CYC6H8": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        8,
        6
      ],
      formula: "C6H8",
      name: "Cyclohexadiene"
    },
    "CYC6H12": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        12,
        6
      ],
      formula: "C6H12",
      name: "Cyclohexane"
    },
    "CYC6H10": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        10,
        6
      ],
      formula: "C6H10",
      name: "Cyclohexene"
    },
    "CH2CO": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        2,
        2,
        1
      ],
      formula: "C2H2O1",
      name: "Ketene"
    },
    "CH2O": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        2,
        1,
        1
      ],
      formula: "C1H2O1",
      name: "Formaldehyde"
    },
    "CH3OH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        4,
        1,
        1
      ],
      formula: "C1H4O1",
      name: "Methanol"
    },
    "CH4": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        4,
        1
      ],
      formula: "C1H4",
      name: "Methane"
    },
    "CO": {
      elementsSymbol: [
        "C",
        "O"
      ],
      numberOfAtoms: [
        1,
        1
      ],
      formula: "C1O1",
      name: "Carbon monoxide"
    },
    "CO2": {
      elementsSymbol: [
        "C",
        "O"
      ],
      numberOfAtoms: [
        1,
        2
      ],
      formula: "C1O2",
      name: "Carbon dioxide"
    },
    "CYC5H6": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        6,
        5
      ],
      formula: "C5H6",
      name: "Cyclopentadiene"
    },
    "MCPTD": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        8,
        6
      ],
      formula: "C6H8",
      name: "Methyl cyclopentadiene"
    },
    "CRESOL": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        8,
        7,
        1
      ],
      formula: "C7H8O1",
      name: "Cresol"
    },
    "NC10H20": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        20,
        10
      ],
      formula: "C10H20",
      name: "Normal decenes"
    },
    "C6H5CH2C6H5": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        12,
        13
      ],
      formula: "C13H12",
      name: "Diphenilmethane"
    },
    "DIPE": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        14,
        6,
        1
      ],
      formula: "C6H14O1",
      name: "Diisopropyl ether"
    },
    "CH3OCH3": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        6,
        2,
        1
      ],
      formula: "C2H6O1",
      name: "Dimethyl ether"
    },
    "CH3CH3-C5H6": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        12,
        7
      ],
      formula: "C7H12",
      name: "Dimethyl pentadienes"
    },
    "C6H5C2H5": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        10,
        8
      ],
      formula: "C8H10",
      name: "Ethylbenzene"
    },
    "NC7H14": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        14,
        7
      ],
      formula: "C7H14",
      name: "Normal heptenes"
    },
    "NC6H12": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        12,
        6
      ],
      formula: "C6H12",
      name: "1-hexene"
    },
    "C5H9CHO": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        10,
        6,
        1
      ],
      formula: "C6H10O1",
      name: "2-Hexenal"
    },
    "ETBE": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        14,
        6,
        1
      ],
      formula: "C6H14O1",
      name: "Ethyl tertiary butyl ether"
    },
    "C2H5OH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        6,
        2,
        1
      ],
      formula: "C2H6O1",
      name: "Ethanol"
    },
    "C2H5OOH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        6,
        2,
        2
      ],
      formula: "C2H6O2",
      name: "Ethyl hydroperoxide"
    },
    "C2H4O": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        4,
        2,
        1
      ],
      formula: "C2H4O1",
      name: "Ethylene oxide"
    },
    "C6H5C2H": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        6,
        8
      ],
      formula: "C8H6",
      name: "Phenylacetylene"
    },
    "BIPHENYL": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        10,
        12
      ],
      formula: "C12H10",
      name: "Biphenyl"
    },
    "C14H10": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        10,
        14
      ],
      formula: "C14H10",
      name: "Anthracene"
    },
    "C6H5OH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        6,
        6,
        1
      ],
      formula: "C6H6O1",
      name: "Phenol"
    },
    "FLUORENE": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        10,
        13
      ],
      formula: "C13H10",
      name: "Fluorene"
    },
    "C10H8": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        8,
        10
      ],
      formula: "C10H8",
      name: "Naphthalene"
    },
    "H2": {
      elementsSymbol: [
        "H"
      ],
      numberOfAtoms: [
        2
      ],
      formula: "H2",
      name: "Hydrogen"
    },
    "H2O": {
      elementsSymbol: [
        "H",
        "O"
      ],
      numberOfAtoms: [
        2,
        1
      ],
      formula: "H2O1",
      name: "Water"
    },
    "H2O2": {
      elementsSymbol: [
        "H",
        "O"
      ],
      numberOfAtoms: [
        2,
        2
      ],
      formula: "H2O2",
      name: "Hydrogen peroxide"
    },
    "HE": {
      elementsSymbol: [
        "He"
      ],
      numberOfAtoms: [
        1
      ],
      formula: "HE1",
      name: "Helium"
    },
    "IC4H8": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        8,
        4
      ],
      formula: "C4H8",
      name: "Isobutene"
    },
    "IC3H7CHO": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        8,
        4,
        1
      ],
      formula: "C4H8O1",
      name: "Isobutyrraldehyde"
    },
    "IC4H10": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        10,
        4
      ],
      formula: "C4H10",
      name: "Isobutane"
    },
    "IC8H18": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        18,
        8
      ],
      formula: "C8H18",
      name: "Isooctane"
    },
    "INDENE": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        8,
        9
      ],
      formula: "C9H8",
      name: "Indene"
    },
    "IC3H7OH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        8,
        3,
        1
      ],
      formula: "C3H8O1",
      name: "2-propanol"
    },
    "IC5H10": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        10,
        5
      ],
      formula: "C5H10",
      name: "Isoamilene"
    },
    "IC3H5CHO": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        6,
        4,
        1
      ],
      formula: "C4H6O1",
      name: "Methacrolein"
    },
    "MCYC6": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        14,
        7
      ],
      formula: "C7H14",
      name: "Methylcyclohexane"
    },
    "CH3CHO": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        4,
        2,
        1
      ],
      formula: "C2H4O1",
      name: "Acetaldehyde"
    },
    "C10H7CH3": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        10,
        11
      ],
      formula: "C11H10",
      name: "Methylnaphthalene"
    },
    "CH3OOH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        4,
        1,
        2
      ],
      formula: "C1H4O2",
      name: "Methyl hydroperoxide"
    },
    "MTBE": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        12,
        5,
        1
      ],
      formula: "C5H12O1",
      name: "Methyl Tertiary Butyl Ether"
    },
    "N2": {
      elementsSymbol: [
        "N"
      ],
      numberOfAtoms: [
        2
      ],
      formula: "N2",
      name: "Nitrogen"
    },
    "C10H7OH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        8,
        10,
        1
      ],
      formula: "C10H8O1",
      name: "Naphthol"
    },
    "C10H7CHO": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        8,
        11,
        1
      ],
      formula: "C11H8O1",
      name: "Naphthaldehyde"
    },
    "NC4H10": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        10,
        4
      ],
      formula: "C4H10",
      name: "Normal butane"
    },
    "NC10H22": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        22,
        10
      ],
      formula: "C10H22",
      name: "Normal decane"
    },
    "NC12H26": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        26,
        12
      ],
      formula: "C12H26",
      name: "Normal dodecane"
    },
    "NC5H12": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        12,
        5
      ],
      formula: "C5H12",
      name: "Normal pentane"
    },
    "NC7H16": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        16,
        7
      ],
      formula: "C7H16",
      name: "Normal heptane"
    },
    "NEOC5H12": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        12,
        5
      ],
      formula: "C5H12",
      name: "Neopentane"
    },
    "O2": {
      elementsSymbol: [
        "O"
      ],
      numberOfAtoms: [
        2
      ],
      formula: "O2",
      name: "Oxygen"
    },
    "IC8H16": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        16,
        8
      ],
      formula: "C8H16",
      name: "Isooctenes"
    },
    "NC5H10": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        10,
        5
      ],
      formula: "C5H10",
      name: "Pentenee"
    },
    "PC3H4": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        4,
        3
      ],
      formula: "C3H4",
      name: "Propyne"
    },
    "CH3CO3H": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        4,
        2,
        3
      ],
      formula: "C2H4O3",
      name: "Peracetic acid"
    },
    "HCO3H": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        2,
        1,
        3
      ],
      formula: "C1H2O3",
      name: "Performic acid"
    },
    "C3H6O": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        6,
        3,
        1
      ],
      formula: "C3H6O1",
      name: "Propylene oxide"
    },
    "C5H8": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        8,
        5
      ],
      formula: "C5H8",
      name: "Isoprene"
    },
    "C16H10": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        10,
        16
      ],
      formula: "C16H10",
      name: "Pyrene"
    },
    "C6H5C2H3": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        8,
        8
      ],
      formula: "C8H8",
      name: "Styrene"
    },
    "TAME": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        14,
        6,
        1
      ],
      formula: "C6H14O1",
      name: "Tertiary Amyl Methyl Ether"
    },
    "TETRALIN": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        12,
        10
      ],
      formula: "C10H12",
      name: "Tetrahydronaphthalene"
    },
    "DECALIN": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        18,
        10
      ],
      formula: "C10H18",
      name: "Decahydronaphthalene"
    },
    "C7H8": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        8,
        7
      ],
      formula: "C7H8",
      name: "Toluene"
    },
    "XYLENE": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        10,
        8
      ],
      formula: "C8H10",
      name: "Xylenes"
    },
    "NC16H34": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        34,
        16
      ],
      formula: "C16H34",
      name: "Normal hexadecane"
    },
    "N2H4": {
      elementsSymbol: [
        "H",
        "N"
      ],
      numberOfAtoms: [
        4,
        2
      ],
      formula: "H4N2",
      name: "Hydrazine"
    },
    "N2O": {
      elementsSymbol: [
        "O",
        "N"
      ],
      numberOfAtoms: [
        1,
        2
      ],
      formula: "O1N2",
      name: "Dinitrogen monoxide"
    },
    "NH3": {
      elementsSymbol: [
        "H",
        "N"
      ],
      numberOfAtoms: [
        3,
        1
      ],
      formula: "H3N1",
      name: "Ammonia"
    },
    "NO": {
      elementsSymbol: [
        "O",
        "N"
      ],
      numberOfAtoms: [
        1,
        1
      ],
      formula: "O1N1",
      name: "Nitric oxide"
    },
    "NO2": {
      elementsSymbol: [
        "O",
        "N"
      ],
      numberOfAtoms: [
        2,
        1
      ],
      formula: "O2N1",
      name: "Nitric dioxide"
    },
    "C3H5OOH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        6,
        3,
        2
      ],
      formula: "C3H6O2",
      name: "Allyl hydroperoxide"
    },
    "NC3H7OH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        8,
        3,
        1
      ],
      formula: "C3H8O1",
      name: "Propanol"
    },
    "N1C4H9OH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        10,
        4,
        1
      ],
      formula: "C4H10O1",
      name: "1-Butanol"
    },
    "N2C4H9OH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        10,
        4,
        1
      ],
      formula: "C4H10O1",
      name: "2-Butanol"
    },
    "MEK": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        8,
        4,
        1
      ],
      formula: "C4H8O1",
      name: "Methyl Ethyl Keton"
    },
    "TC4H9OH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        10,
        4,
        1
      ],
      formula: "C4H10O1",
      name: "Tert Butanol"
    },
    "IC4H9OH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        10,
        4,
        1
      ],
      formula: "C4H10O1",
      name: "Iso butanol"
    },
    "C4H7OH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        8,
        4,
        1
      ],
      formula: "C4H8O1",
      name: "Butenol"
    },
    "C3H5OH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        6,
        3,
        1
      ],
      formula: "C3H6O1",
      name: "Allyl alcohol"
    },
    "C10H10": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        10,
        10
      ],
      formula: "C10H10",
      name: "Dialin"
    },
    "BZFUR": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        6,
        8,
        1
      ],
      formula: "C8H6O1",
      name: "Benzofuran"
    },
    "TMBENZ": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        12,
        9
      ],
      formula: "C9H12",
      name: "1,2,4 Tri methyl benzene"
    },
    "NPBENZ": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        12,
        9
      ],
      formula: "C9H12",
      name: "Normal propylbenzene"
    },
    "C6H5OCH3": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        8,
        7,
        1
      ],
      formula: "C7H8O1",
      name: "Anisole"
    },
    "MB": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        10,
        5,
        2
      ],
      formula: "C5H10O2",
      name: "Methyl butanoate"
    },
    "MCROT": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        8,
        5,
        2
      ],
      formula: "C5H8O2",
      name: "Methyl crotonate"
    },
    "MACRIL": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        6,
        4,
        2
      ],
      formula: "C4H6O2",
      name: "Methyl acrylate"
    },
    "DIBZFUR": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        8,
        12,
        1
      ],
      formula: "C12H8O1",
      name: "Dibenzofuran"
    },
    "DIFENET": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        10,
        12,
        1
      ],
      formula: "C12H10O1",
      name: "Diphenyl ether"
    },
    "C12H22": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        22,
        12
      ],
      formula: "C12H22",
      name: "Dodecadiene"
    },
    "BENZYNE": {
      elementsSymbol: [
        "H",
        "C"
      ],
      numberOfAtoms: [
        4,
        6
      ],
      formula: "C6H4",
      name: "Benzyne"
    },
    "C2H2O2": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        2,
        2,
        2
      ],
      formula: "C2H2O2",
      name: "Glyoxal"
    },
    "C4H6O2": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        6,
        4,
        2
      ],
      formula: "C4H6O2",
      name: "Butanedione"
    },
    "C5H4O2": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        4,
        5,
        2
      ],
      formula: "C5H4O2",
      name: "Furfural"
    },
    "C5H8O4": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        8,
        5,
        4
      ],
      formula: "C5H8O4",
      name: "Xylofuranose"
    },
    "C6H10O5": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        10,
        6,
        5
      ],
      formula: "C6H10O5",
      name: "Levoglucosan"
    },
    "C8H10O3": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        10,
        8,
        3
      ],
      formula: "C8H10O3",
      name: "2,6-Dimethoxyphenol"
    },
    "HCOOH": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        2,
        1,
        2
      ],
      formula: "C1H2O2",
      name: "Formic acid"
    },
    "GLYCEROL": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        8,
        3,
        3
      ],
      formula: "C3H8O3",
      name: "Glycerol"
    },
    "C4H4O": {
      elementsSymbol: [
        "H",
        "C",
        "O"
      ],
      numberOfAtoms: [
        4,
        4,
        1
      ],
      formula: "C4H4O1",
      name: "Furan"
    }
  }

let chemicalNameToName = Object.fromEntries(Object.entries(moleculesDict).map(([k, v]) => [v.name, k]));

export function Molecule(gasSpecieName) {
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

    function getFormula(){
        if (_moleculeDict == undefined) {
            return "";
        }
        return _moleculeDict.formula
    }

    function getChemicalName(){
        if (_moleculeDict == undefined){
            return "";
        }
        return _moleculeDict.name
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

    function getNameFromChemicalName(chemicalName)
    {
        return chemicalNameToName[chemicalName]
    }

    function getAvailableSpecies() {
        return Object.keys(moleculesDict);
    }

    function getAvailableSpeciesFormula() {
        return Object.entries(moleculesDict).map(([k, v]) => v.formula);
    }

    function getAvailableSpeciesChemicalName() {
        return Object.entries(moleculesDict).map(([k, v]) => v.name);
    }

    return {
        getElementsList,
        getElementsSymbol,
        getNumberOfAtoms,
        getFormula,
        getChemicalName,
        getElementCounterDict,
        getNameFromChemicalName,
        getAvailableSpecies,
        getAvailableSpeciesFormula,
        getAvailableSpeciesChemicalName
    }
}