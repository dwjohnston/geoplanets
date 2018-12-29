import getStandardColor from "../subalgorithms/standardColor";
import getStandardPlanet from "../subalgorithms/standardPlanet";

const renderHint = {
    name: "Three Orbits",
    groups: [
        getStandardColor().renderHint,
        getStandardPlanet("p1").renderHint,
        getStandardPlanet("p2").renderHint,
        getStandardPlanet("p3").renderHint,
    ]
}

function calc(t, controlsPackage, statePackage) {

}


export default {
    renderHint,
    calc
}; 