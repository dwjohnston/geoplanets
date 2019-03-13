import { RANGE } from "./ValueTypes";

export const zeroToOne = (id, label, max = 1, step = 0.01, randMin, randMax) => ({
    min: 0,
    max: max,
    step: step,
    id: id,
    randMin: randMin || 0.1 * max,
    randMax: randMax || 0.9 * max,
    label: label || id,
    type: RANGE,

});

export const minToMax = (id, label, min = 0, max = 1, step = 0.01, randMin, randMax) => (
    {
        min: min,
        max: max,
        step: step,
        id: id,
        randMin: randMin || 0.1 * max,
        randMax: randMax || 0.9 * max,
        label,
        type: RANGE,

    }
);

export const negativeToPositive = (id, label, max, step, randMin, randMax) => ({
    min: -1 * max,
    max: max,
    step: step || max / 50,
    id: id,
    randMin: randMin || -0.9 * max,
    randMax: randMax || 0.9 * max,
    label,
    type: RANGE,
}); 