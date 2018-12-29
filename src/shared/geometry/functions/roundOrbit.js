import SPEED_ADJUST from "../MagicNumbers";

export default (t, speed, size, phase = 0, xSkew = 1, ySkew = 1) => {

    return {
        x: Math.sin(t * SPEED_ADJUST * speed + phase) * xSkew * size,
        y: Math.cos(t * SPEED_ADJUST * speed + phase) * ySkew * size
    };
}