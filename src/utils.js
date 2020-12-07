export const Fractions = Object.freeze({ MOLE: "mole", MASS: "mass" });
export const Parameters = Object.freeze({ R: 8314., pi: 3.14159265358979323846, k: 1.3806488 });

export function AsaliError(message)
{
    console.log(message);
    alert(message);
    exit();
}