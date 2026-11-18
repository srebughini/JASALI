export const Fractions = Object.freeze({
    MOLE: "mole",
    MASS: "mass"
});
export const Parameters = Object.freeze({
    R: 8314.,
    pi: 3.14159265358979323846,
    k: 1.3806488,
    referencePressure: 1e05
});

export function UniqueArray(value, index, self) {
    return self.indexOf(value) === index;
}

export class AsaliError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AsaliError';
    }
}