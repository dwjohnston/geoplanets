import linkRate from "../renderHints/linkRate";
import pulseRate from "../renderHints/pulseRate";

function __getStandardColor(id = "color", label = "color", icon = "invert_colors") {
    return {

        renderHint: {
            id,
            label,
            icon,
            controls: [
                ...linkRate(),
                ...pulseRate(),
            ]
        }
    }
}

export default __getStandardColor; 