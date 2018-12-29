import speed from "../renderHints/speed";
import color from "../renderHints/color";
import { zeroToOne } from "../renderHints/generic";

export default (id = "planet", label = "planet", icon = "all_out") => ({


    calc: (t, controlsPackage, statePackage) => {

    },

    renderHint: {

        id,
        icon,
        label,

        controls: [
            ...speed(),
            zeroToOne("distance", "Distance"),
            ...color(),
        ]
    }

})