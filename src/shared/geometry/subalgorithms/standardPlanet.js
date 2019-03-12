import speed from "../renderHints/speed";
import color from "../renderHints/color";
import { zeroToOne } from "../renderHints/generic";
import roundOrbit from "../functions/roundOrbit";
import xolor from "xolor";
import circle from "../../draw/circle";
import { PLANET_PREVIEW_SIZE, PLANET_PERM_SIZE } from "../MagicNumbers";
export default (id = "planet", label = "planet", icon = "all_out") => ({
    calc: (t, cp, center) => {


        const colorPoint = roundOrbit(t, cp.speed, cp.distance, center);
        colorPoint.color = xolor(Object.values(cp.color)).css;

        return {
            data: colorPoint,
            temp: [circle(colorPoint, PLANET_PREVIEW_SIZE)],
            perm: [circle(colorPoint, PLANET_PERM_SIZE)],
        }
    },

    renderHint: {

        id,
        icon,
        label,

        controls: [
            speed(),
            zeroToOne("distance", "Distance", 0.5),
            color(),
        ]
    }

})