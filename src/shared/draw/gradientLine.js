
export default (cp1, cp2) => (p5) => {

    const { x: _x1, y: _y1, color: c1 } = cp1;
    const { x: _x2, y: _y2, color: c2 } = cp2;

    const x1 = _x1 * p5.width;
    const x2 = _x2 * p5.width;
    const y1 = _y1 * p5.height;
    const y2 = _y2 * p5.height;

    const length = Math.floor(Math.sqrt(
        (x2 - x1) * (x2 - x1)
        + (y2 - y1) * (y2 - y1)));
    p5.stroke(c1);

    p5.translate(x1, y1);
    const degree = -1 * p5.atan2(x2 - x1, y2 - y1);
    p5.rotate(degree);

    Array(length).fill(0).forEach((v, i) => {
        p5.stroke(p5.lerpColor(p5.color(c1), p5.color(c2), i / length));
        p5.point(0, i);
    });
    p5.rotate(-1 * degree);
    p5.translate(-1 * x1, -1 * y1);

}
