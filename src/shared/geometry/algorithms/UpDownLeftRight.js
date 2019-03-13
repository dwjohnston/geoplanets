
import linkRate from "../subalgorithms/linkRate";
import updown from "../subalgorithms/updown";

const linkRatePackage = linkRate();
const updownPackage = updown("updown", "Up Down", true);
const leftRightPackage = updown("leftRight", "Left Right", false);
const renderHint = {
    name: "Up Down Left Right",
    groups: [
        linkRatePackage.renderHint,
        updownPackage.renderHint,
        leftRightPackage.renderHint,
    ],
}

const calc = (t, cp) => {

    const p1 = updownPackage.calc(t, cp);
    const p2 = leftRightPackage.calc(t, cp);

    const links = linkRatePackage.calc(t, cp, [...p1.data, ...p2.data]);
    return {
        temp: [...p1.temp, ...p2.temp],
        perm: [...links.perm]
    }
}


export default { renderHint, calc }; 