
import lfoPlanet from "../subalgorithms/lfoPlanet";

import linkRate from "../subalgorithms/linkRate";

const p1Pack = lfoPlanet("p1");
const p2Pack = lfoPlanet("p2");
const linkPack = linkRate();

const planetCalc = p1Pack.calc;


const calc = (t, cp, sp) => {
    if (cp.p1) {
        const p1 = planetCalc(t, cp.p1);
        const p2 = planetCalc(t, cp.p2, p1.data);

        // Work out whether the lines should be drawn. 
        const links = linkPack.calc(t, cp, [p1.data, p2.data]);

        return {
            temp: [
                ...p1.temp,
                ...p2.temp,
            ],
            perm: [
                ...links.perm,

                ...p1.perm,
                ...p2.perm,
            ], 
            data: [], 
        }
    }


    return {
        temp: [],
        perm: [],
    };
}

const renderHint = {
    name: "LFO Planets",
    groups: [
        linkPack.renderHint,
        p1Pack.renderHint,
        p2Pack.renderHint,
    ],
}

export default { renderHint, calc }; 