export default (cp, size) => (p5) => {


    p5.stroke(cp.color);
    p5.fill(cp.color);

    p5.ellipse(
        Math.round(cp.x * p5.width),
        Math.round(cp.y * p5.height),
        Math.round(size * p5.width),
        Math.round(size * p5.height),
    );
}