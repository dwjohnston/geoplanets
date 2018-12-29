export default (cp, size) => (p5) => {
    p5.circle(cp.x, cp.y, size * p5.width, size * p5.height, p5.TWO_PI);
}