import { SPEED_ADJUST } from "../MagicNumbers";

export default (t, speed, amount, phase =0) => {
    return Math.sin(t * SPEED_ADJUST * speed + phase) * amount; 
}