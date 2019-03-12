import { LFO } from "./ValueTypes";
import { zeroToOne } from "./generic";
import speed from "./speed";

export default (label = "LFO", id = "lfo", baseValue = zeroToOne("baseValue")) => ({
    id: id,
    label: label,
    type: LFO,
    renderHint: [
        baseValue,
        speed(),
        zeroToOne("amount", "amount"),
    ]
})