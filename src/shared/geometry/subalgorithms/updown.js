import linkRate from "../renderHints/linkRate";
import pulseRate from "../renderHints/pulseRate";
import { zeroToOne } from "../renderHints/generic";
import color, { singleColor } from "../renderHints/color";
import gradientLine from "../../draw/gradientLine";
import blankSlate from "../../draw/blankSlate";
import speed from "../renderHints/speed";
import sine from "../functions/sine";
import circle from "../../draw/circle";


function getColorPoint(t, speed, isVertical) {
    if (isVertical) {
        return {
            x: 0,
            y: 0.5 + sine(t, speed, 0.5),
            color: "blue",
        }
    } else {
        return {
            y: 0,
            x: 0.5 + sine(t, speed, 0.5),
            color: "blue",
        }
    }
}

function updown(id = "updown", label, isVertical) {

    return {
        calc: (t, cp) => {

            const { speed } = cp[id];
            const colorPoint = getColorPoint(t, speed, isVertical);

            console.log(colorPoint);
            return {
                data: [colorPoint],
                perm: [],
                temp: [circle(colorPoint, 0.05)],
            }
        },
        renderHint: {
            id,
            label,
            controls: [
                speed(),
            ]
        }
    }
}

export default updown; 