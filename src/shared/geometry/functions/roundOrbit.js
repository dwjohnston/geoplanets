import { SPEED_ADJUST } from "../MagicNumbers";

export default (
    t,
    speed,
    size,
    center = { x: 0.5, y: 0.5 },
    phase = 0,
    xSkew = 1,
    ySkew = 1
) => {

    return {
        x: Math.sin(t * SPEED_ADJUST * speed + phase) * xSkew * size + center.x,
        y: Math.cos(t * SPEED_ADJUST * speed + phase) * ySkew * size + center.y
    };
}