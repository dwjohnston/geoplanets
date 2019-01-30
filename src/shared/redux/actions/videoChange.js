
export const VIDEO_UPDATE = 'VIDEO_UPDATE';
import { SLIDER_UPDATE } from "../actions/sliderChange";

const colorFn = (v) => {


    return Math.floor((v * 255) / 100);
}

const speedFn = (v) => {

    return (v - 50) * 2;
}

const distanceFn = (v) => {

    return v / 200;
}

const linkFn = (v) => {
    return Math.ceil(v);
}

const pulseFn = (v) => {

    return Math.ceil(v);
}

const map = {
    0: {
        id: ["link"],
        map: {
            0: {
                id: ["linkRate"],
                fn: linkFn
            },
            1: {
                id: ["pulseRate"],
                fn: pulseFn
            },
            2: {
                id: ["bgColor", "r"],
                fn: colorFn
            },
            3: {
                id: ["bgColor", "r"],

                fn: colorFn
            },
            4: {
                id: ["bgColor", "r"],
                fn: colorFn
            },
            5: {
                id: ["bgColor", "r"],
                fn: colorFn
            },
        }
    },
    1: {
        id: ["p1"],
        map: {
            0: {
                id: ["distance"],
                fn: distanceFn
            },
            1: {
                id: ["speed"],
                fn: speedFn
            },
            2: {
                id: ["color", "r"],
                fn: colorFn
            },
            3: {
                id: ["color", "g"],
                fn: colorFn
            },
            4: {
                id: ["color", "b"],
                fn: colorFn
            },
            5: {
                id: ["color", "a"],
                fn: colorFn
            },
        }
    },
    2: {
        id: ["p2"],
        map: {
            0: {
                id: ["distance"],
                fn: distanceFn
            },
            1: {
                id: ["speed"],
                fn: speedFn
            },
            2: {
                id: ["color", "r"],
                fn: colorFn
            },
            3: {
                id: ["color", "g"],
                fn: colorFn
            },
            4: {
                id: ["color", "b"],
                fn: colorFn
            },
            5: {
                id: ["color", "a"],
                fn: colorFn
            },
        }
    },
    3: {
        id: ["p3"],
        map: {
            0: {
                id: ["distance"],
                fn: distanceFn
            },
            1: {
                id: ["speed"],
                fn: speedFn
            },
            2: {
                id: ["color", "r"],
                fn: colorFn
            },
            3: {
                id: ["color", "g"],
                fn: colorFn
            },
            4: {
                id: ["color", "b"],
                fn: colorFn
            },
            5: {
                id: ["color", "a"],
                fn: colorFn
            },
        }
    },
}

/**return        console.log(map[x].map[y].fn(value));

 * This method is used to create the SLIDER_UPDATE action.
 * It is dispatched to the reducer and handled by it.
 *
 * @param name Name of the slider
 * @returns {{type: string, payload: {name: *, value: *}}} SLIDER_UPDATE action
 */
export const videoUpdate = ({ x, y, value }) => {

    if (x <= 3 && y <= 5) {
        const payload = {
            type: SLIDER_UPDATE,
            payload: {
                id: [...map[x].id, ...map[x].map[y].id],
                value: map[x].map[y].fn(value)
            }

        };

        return payload;
    }

    return {
        type: "BLANK"
    };

}