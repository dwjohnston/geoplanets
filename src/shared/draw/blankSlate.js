export default (color) => (p5) => {
    p5.fill(p5.color(Object.values(color)));
    p5.rect(0, 0, p5.width, p5.height);
}