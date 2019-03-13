export function randomParam(obj) {
    return obj.randMin + (Math.random * (obj.randMax - obj.randMin));
}

export function random(max = 1, min = 0) {
    return min + Math.random() * (max - min);
}