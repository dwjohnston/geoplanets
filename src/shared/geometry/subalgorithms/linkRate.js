import linkRate from "../renderHints/linkRate";
import pulseRate from "../renderHints/pulseRate";
import { zeroToOne } from "../renderHints/generic";
import color, { singleColor } from "../renderHints/color";
import gradientLine from "../../draw/gradientLine";
import blankSlate from "../../draw/blankSlate";




function getStandardLinkRate(id = "link", label = "link", icon = "invert_colors") {

    return {

        /**
         * Presumably, we can extend this later, to allow us to other linking strategies, rather than just 'link all'. 
         */
        calc: (t, cp, items) => {

            const controls = cp[id];
            const { linkRate, pulseRate } = controls;
            const links = [];
            const isPulse = (Math.floor(t / pulseRate)) % 2 === 0;
            if (isPulse) {
                const isLink = (t % linkRate === 0);
                if (isLink) {
                    for (let a of items) {
                        for (let b of items) {
                            if (a !== b) {
                                links.push(gradientLine(a, b))
                            }
                        }
                    }
                }
            }

            return {
                perm: [blankSlate(controls.bgColor), ...links,],
                temp: [],
            }
        },
        renderHint: {
            id,
            label,
            icon,
            controls: [
                ...linkRate(),
                ...pulseRate(),
                color("bgColor", zeroToOne("a", "a", 50, 1)),

            ]
        }
    }
}

export default getStandardLinkRate; 