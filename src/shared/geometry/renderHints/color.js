import { zeroToOne } from "./generic";
import { RANGE, RGBA } from "./ValueTypes";

export const singleColor = (id) => ({
    min: 0,
    max: 255,
    step: 1,
    randMin: 50,
    randMax: 255,
    id: id,
    label: id,
    type: RANGE,


});

export default (id = "color", alpha = singleColor("a")) => (
    {
        type: RGBA,
        id,
        renderHint: [
            singleColor("r"),
            singleColor("g"),
            singleColor("b"),
            //zeroToOne("a", "a"),
            alpha,
        ]
    }); 