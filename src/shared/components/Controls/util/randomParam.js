import { RANGE, RGBA } from "../../../geometry/renderHints/ValueTypes";
import { randomStep } from "davids-toolbox";

export default (control) => {

    switch (control.type) {
    case RANGE: {
        return randomStep(control.randMin, control.randMax, control.step);
    }
    case RGBA: {
        const color = control.renderHint.reduce((acc, cur) => {
            acc[cur.id] = randomStep(cur.randMin, cur.randMax, cur.step);
            return acc;
        }, {});
        return color;

    }
    default: return 0;
    }
}