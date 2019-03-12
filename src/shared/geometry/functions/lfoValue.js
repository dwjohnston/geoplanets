import sine from "./sine";

export default (t, baseValue, speed, amount, lfoFunction = sine) => {
    return baseValue + lfoFunction(t, speed, amount);
}