# Contributing to JASALI

Thank you for contributing to JASALI! This is largely a volunteer effort. You do not need to know the whole code base: small fixes to documentation, examples and tests are valuable contributions and a good way to make a first pull request.

JASALI is the JavaScript version of the ASALI property library (thermodynamic and transport properties of gases and gas mixtures). The ASALI ecosystem has three repositories:

- [ASALI](https://github.com/srebughini/ASALI): the desktop GUI and the property library in C, C++, Fortran, Java, Julia, Matlab, Octave, Python and Rust.
- [ASALIPY](https://github.com/srebughini/ASALIPY): chemical reactor models in Python.
- [JASALI](https://github.com/srebughini/JASALI) (this repository): the JavaScript/TypeScript version.

Contributions to the other repositories belong there; see their `CONTRIBUTING.md` files.

## Set up

You need [Node.js](https://nodejs.org/) and npm. The commands below were tested with Node v22.22.2; `package.json` does not state a supported Node version.

```bash
git clone https://github.com/<your-user>/JASALI.git     # your fork
cd JASALI
npm install                                              # about 20 seconds
```

## Run the tests

The tests use [mocha](https://mochajs.org/) and are in the `test/` folder.

```bash
npm test                          # all tests (80 at the time of writing)
npx mocha test/03-molecule.js     # one test file
```

Please note:

- Use `RunAssertForFloat` for single numbers only. For arrays use `RunAssertForArray`, and for matrices `RunAssertForMatrix` (`src/utils.js`). `RunAssertForFloat` given an array compares `NaN` with `NaN` and always passes.
- There is no continuous integration yet, so please run `npm test` before you open a pull request.
- Some files (`test/00-utils.js`, `test/01-gas-state.js`, `test/02-gas-specie.js`) use Windows (CRLF) line endings. Keep the line endings of the files you edit, so that the diff only shows your change.

## Build the browser bundle (optional)

Most changes do not need this. `npm run build` creates `jasali.js` in the repository root with `esbuild`. `dev/README.md` explains how to check the bundle in a browser with `dev/index.html` (the expected density is `5.453e-1`). Please do not include a regenerated `jasali.js` in a pull request unless the maintainers ask for it.

## Find something to work on

1. Browse the [open issues](https://github.com/srebughini/JASALI/issues) and look for the labels `good first issue` and `help wanted`.
2. Before you start, check that nobody else is working on it: read the comments of the issue and the [open pull requests](https://github.com/srebughini/JASALI/pulls).
3. Leave a short comment saying that you would like to work on the issue.

## Checking numerical results

The numbers of JASALI are expected to agree with the other ASALI implementations. If you change a formula or add a test with reference values, you can compare with the Python implementation in the ASALI repository (`API/Python`). Please say in the pull request what you compared and the tolerance you used.

## Reporting bugs and asking questions

Please check that the bug has not been reported already, then open a [GitHub issue](https://github.com/srebughini/JASALI/issues). The repository has templates for a bug report and for a general issue; please use the one that fits. Include:

* A clear and descriptive title.
* The exact steps (the code) that reproduce the problem.
* What you see, and what you expect to see.
* Your Node.js version (or browser) and operating system, and the JASALI version.

## Submitting changes

* Fork the repository, make your changes in a branch of your fork, and open a [pull request](https://github.com/srebughini/JASALI/pulls) against the `main` branch (the only branch of this repository).
* Keep each pull request focused on one issue, and include the issue number in the description.
* Describe the problem and the solution, and give the commands you ran and their results (for example `npm test`).
* Use the commit message conventions of the ASALI project: present tense and imperative mood ("Add feature", not "Added feature"), and reference issues liberally.

The project has not defined a code style, a formatter, a linter or a review process. Please follow the style of the file you are editing, and do not reformat code your change does not touch.

## Code of conduct

JASALI does not have its own code of conduct yet. Please follow the [ASALI Code of Conduct](https://github.com/srebughini/ASALI/blob/master/CODE_OF_CONDUCT.md).
