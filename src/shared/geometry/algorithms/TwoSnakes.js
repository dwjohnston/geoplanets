
import linkRate from "../subalgorithms/linkRate";
import snake from "../subalgorithms/snake";
const linkPack = linkRate();
const snakeOne = snake("snake1");
const snakeTwo = snake("snake2");

const renderHint = {
    name: "Two Snakes",
    groups: [
        linkPack.renderHint,
        snakeOne.renderHint,
        snakeTwo.renderHint,
    ],
}

function calc(t, cp, sp) {

    const snake1 = snakeOne.calc(t, cp.snake1, sp.snake1);
    const snake2 = snakeTwo.calc(t, cp.snake2, sp.snake2);



    const links = linkPack.calc(cp.link, [snakeOne.state.data, snakeTwo.state.data]);


    return {
        perm: [...snake1.perm, ...snake2.perm, ...links.perm],
        temp: [...snake1.temp, ...snake2.temp, ...links.temp],
        data: [snake1.state, snake2.state]
    }
}


export default { renderHint, calc }; 