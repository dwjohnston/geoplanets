export default (color = { r: 255, b: 255, g: 255, a: 255 }) => (p5) => {
    p5.fill(p5.color(Object.values(color)));
    p5.rect(0, 0, p5.width, p5.height);
}