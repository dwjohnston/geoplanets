import { RANGE } from "./ValueTypes";

export const zeroToOne = (id, label, step = 0.01) => ({
    min: 0,
    max: 1,
    step: step,
    id: id,
    randMin: 0.1,
    randMax: 0.9,
    label,
    type: RANGE,

}); 