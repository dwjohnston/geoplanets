import linkRate from "../renderHints/linkRate";
import pulseRate from "../renderHints/pulseRate";
import { zeroToOne, minToMax } from "../renderHints/generic";
import color, { singleColor } from "../renderHints/color";
import gradientLine from "../../draw/gradientLine";
import blankSlate from "../../draw/blankSlate";
import line from "../../draw/line";
import lfoValue from "../functions/lfoValue";
import sine from "../functions/sine";

import xolor from "xolor";


function sineWave(id = "sine", label = "sine", icon = "invert_colors") {

    return {

        calc: (t, cp) => {

            const { amp, freq, fmAmount, fmFreq, color, grains } = cp[id];


            const lines = [];
            for (let i = 0; i < grains; i++) {
                lines.push(gradientLine({
                    x: i / grains,
                    y: 0.5 + Math.sin(i / grains * freq * Math.PI * 2) * amp,
                    color: "blue",
                },
                {
                    x: (i + 1) / grains,
                    y: 0.5 + Math.sin((i + 1) / grains * freq * Math.PI * 2) * amp,
                    color: "blue",

                }))
            }


            console.log(lines);
            return {
                perm: [blankSlate(), ...lines],
                temp: [],
            }
        },
        renderHint: {
            id,
            label,
            icon,
            controls: [
                zeroToOne("amp"),
                minToMax("freq", "freq", 1, 10, 0.01),
                zeroToOne("fmAmount"),
                minToMax("fmFreq", "fmFreq", 1, 10, 0.01),
                color("color", zeroToOne("a", "a", 50, 1)),
                minToMax("grains", "grains", 2, 100, 1),

            ]
        }
    }
}

export default sineWave; 