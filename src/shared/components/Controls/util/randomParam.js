import { RANGE } from "../../../geometry/renderHints/ValueTypes";
import { randomStep } from "davids-toolbox";

export default (control) => {

    switch (control.type) {
    case RANGE: {
        return randomStep(control.randMin, control.randMax, control.step);
    }
    default: return 0;
    }
}