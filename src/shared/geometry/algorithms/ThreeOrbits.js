import getStandardPlanet from "../subalgorithms/standardPlanet";
import roundOrbit from "../functions/roundOrbit";
import circle from "../../draw/circle";
import xolor from "xolor";
import gradientLine from "../../draw/gradientLine";
import getStandardLinkRate from "../subalgorithms/linkRate";
import blankSlate from "../../draw/blankSlate";




const linkRatePack = getStandardLinkRate();
const p1Pack = getStandardPlanet("p1");
const p2Pack = getStandardPlanet("p2");
const p3Pack = getStandardPlanet("p3");

const standardPlanetCalc = p1Pack.calc;

const renderHint = {
    name: "Three Orbits",
    groups: [
        linkRatePack.renderHint,
        p1Pack.renderHint,
        p2Pack.renderHint,
        p3Pack.renderHint,
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
        const p1 = standardPlanetCalc(t, cp.p1);
        const p2 = standardPlanetCalc(t, cp.p2, p1.data);
        const p3 = standardPlanetCalc(t, cp.p3, p2.data);

        // Work out whether the lines should be drawn. 
        const links = linkRatePack.calc(t, cp, [p1.data, p2.data, p3.data]);

        return {
            temp: [
                ...p1.temp,
                ...p2.temp,
                ...p3.temp
            ],
            perm: [
                ...links.perm,

                ...p1.perm,
                ...p2.perm,
                ...p3.perm,
            ], 
            data: [], 
        }
    }


    return {
        temp: [], 
        perm: [], 
        data: [], 
    };




}


export default {
    renderHint,
    calc
}; 