import linkRate from "../renderHints/linkRate";
import pulseRate from "../renderHints/pulseRate";
import { zeroToOne } from "../renderHints/generic";
import color, { singleColor } from "../renderHints/color";

function getStandardLinkRate(id = "link", label = "link", icon = "invert_colors") {

    return {
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