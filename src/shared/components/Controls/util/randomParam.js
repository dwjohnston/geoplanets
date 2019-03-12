import { RANGE, RGBA, LFO } from "../../../geometry/renderHints/ValueTypes";
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

    case LFO: {
        return control.renderHint.reduce((acc, cur) => {
            acc[cur.id] = randomStep(cur.randMin, cur.randMax, cur.step);
            return acc;
        }, {});
    }
    default: return 0;
    }
}