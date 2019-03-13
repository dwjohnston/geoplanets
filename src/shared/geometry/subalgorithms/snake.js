import speed from "../renderHints/speed";
import color from "../renderHints/color";
import { zeroToOne } from "../renderHints/generic";
import xolor from "xolor";
import circle from "../../draw/circle";


function updateSnake(oldSnake, speed) {
    const snake = { ...oldSnake };
    snake.dx = snake.dx - (speed / 2) + random(speed);
    snake.dy = snake.dy - (speed / 2) + random(speed);
    if ((snake.dx < 0 && snake.x < 0) || (snake.dy > 0 && snake.x > 1)) {
        snake.dx *= -1;
    }

    if ((snake.y < 0 && snake.dy < 0) || (snake.y > 1 && snake.dy > 0)) {
        snake.dy *= -1;
    }
    snake.x += snake.dx;
    snake.y += snake.dy;


    return snake;
}

export default (id = "snake", label = "snake", icon = "all_out", initState = { x: 0.5, y: 0.5, dx: 0.01, dy: 0.01 }) => ({
    calc: (t, cp, sp) => {

        const { speed, size, color } = cp[id] || initState;
        const newSnake = updateSnake(sp[id], speed);
        const permColor = xolor(Object.values(color)).lightness(50).css;
        const tempColor = xolor(Object.values(color)).css;

        return {
            data: { id, data: newSnake },
            temp: [circle({ ...newSnake, color: tempColor }, size)],
            perm: [circle({ ...newSnake, color: permColor }, size)],
        }
    },

    renderHint: {

        id,
        icon,
        label,

        controls: [
            speed(),
            zeroToOne("size", "size", 0.5),
            color(),
        ]
    }

})