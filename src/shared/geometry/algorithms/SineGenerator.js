import sineWave from "../subalgorithms/sineWave";
const sineWavePackage = sineWave("sine1");

const renderHint = {
    name: "Sine Generator",
    groups: [
        sineWavePackage.renderHint,
    ]
}

const calc = (t, cp, sp) => {

    return sineWavePackage.calc(t, cp);
}


export default { renderHint, calc }; 