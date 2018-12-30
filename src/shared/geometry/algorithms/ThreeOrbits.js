import getStandardColor from "../subalgorithms/standardColor";
import getStandardPlanet from "../subalgorithms/standardPlanet";
import roundOrbit from "../functions/roundOrbit";
import circle from "../../draw/circle";

const renderHint = {
    name: "Three Orbits",
    groups: [
        getStandardColor().renderHint,
        getStandardPlanet("p1").renderHint,
        getStandardPlanet("p2").renderHint,
        getStandardPlanet("p3").renderHint,
    ]
}

/**
 * 
 * @param {*} t - Time
 * @param {*} cp  - Controls Package
 * @param {*} sp - State Package
 */
function calc(t, cp, sp) {

    if (cp.p1) {
        const cp1 = roundOrbit(t, cp.p1.speed, cp.p1.distance);
        cp1.color = "rgba(255,0,255,1)";
        const cp2 = roundOrbit(t, cp.p2.speed, cp.p2.distance, cp1);
        cp2.color = "rgba(255,0,255,1)";

        const cp3 = roundOrbit(t, cp.p3.speed, cp.p3.distance, cp2);
        cp3.color = "rgba(255,0,255,1)";

        return {
            temp: [
                circle(cp1, 0.05),
                circle(cp2, 0.05),
                circle(cp3, 0.05),
            ],
            perm: [
                circle(cp1, 0.025),
                circle(cp2, 0.025),
                circle(cp3, 0.025),
            ]
        }
    }


    return [];




}


export default {
    renderHint,
    calc
}; 