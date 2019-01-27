import getStandardPlanet from "../subalgorithms/standardPlanet";
import roundOrbit from "../functions/roundOrbit";
import circle from "../../draw/circle";
import xolor from "xolor";
import gradientLine from "../../draw/gradientLine";
import getStandardLinkRate from "../subalgorithms/linkRate";
import blankSlate from "../../draw/blankSlate";
const renderHint = {
    name: "Three Orbits",
    groups: [
        getStandardLinkRate().renderHint,
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
        cp1.color = xolor(Object.values(cp.p1.color)).css;
        const cp2 = roundOrbit(t, cp.p2.speed, cp.p2.distance, cp1);
        cp2.color = xolor(cp.p2.color).css;
        const cp3 = roundOrbit(t, cp.p3.speed, cp.p3.distance, cp2);
        cp3.color = xolor(cp.p3.color).toString();

        // Work out whether the lines should be drawn. 
        const { linkRate, pulseRate } = cp.link;
        const links = [];
        const isPulse = (Math.floor(t / pulseRate)) % 2 === 0;
        if (isPulse) {
            const isLink = (t % linkRate === 0);
            if (isLink) {
                links.push(
                    gradientLine(cp1, cp2),
                    gradientLine(cp2, cp3),
                    gradientLine(cp1, cp3)
                );
            }
        }

        // Create the degrade layer
        const degrade = blankSlate(cp.link.bgColor);

        return {
            temp: [
                circle(cp1, 0.05),
                circle(cp2, 0.05),
                circle(cp3, 0.05),
            ],
            perm: [
                degrade,
                circle(cp1, 0.025),
                circle(cp2, 0.025),
                circle(cp3, 0.025),
                ...links,
            ]
        }
    }


    return [];




}


export default {
    renderHint,
    calc
}; 