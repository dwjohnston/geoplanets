import speed from "../renderHints/speed";
import color from "../renderHints/color";
import { zeroToOne } from "../renderHints/generic";
import getLfo from "../renderHints/lfo";
import standardPlanet from "./standardPlanet";
import lfoValue from "../functions/lfoValue";


export default (id = "doublelfoplanet", label = "planet", icon = "all_out") => {
    const standardPlanetCalc = standardPlanet().calc; //Creating a closure for calc() to use. 
    return {
        calc: (t, cp, center) => {

            return standardPlanetCalc(t, {
                ...cp,
                distance: lfoValue(t, cp.lfo.distance, cp.lfo.speed, cp.lfo.amount)
            }, center);
        },

        renderHint: {
            id,
            icon,
            label,

            controls: [
                speed(),

                getLfo("lfo", "lfo", zeroToOne("distance", "Distance", 0.5)),
                color(),
            ]
        }

    }
}; 