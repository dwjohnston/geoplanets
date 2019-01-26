export function randomParam(obj) {
    return obj.randMin + (Math.random * (obj.randMax - obj.randMin));
}