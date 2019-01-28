const BG_COLOR = "#bbb";
const N_GRID_PIXELS = 20;

const N_GRIDS_WIDE = 8;
const GRID_GAP_PIXELS = 10;

let pixelSize;
let gridWidth;

let prevFrame;

let ndiffs = 0;
let diffArray;
const DIFF_ARRAY_LENGTH = 100;

const ARRAY_WHITE = [255, 255, 255, 255];
const ARRAY_TRANSPARENT = [0, 0, 0, 0];
//const ARRAY_TRANSPARENT = [0, 0, 0, 0];

var capture;
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(BG_COLOR);

    gridWidth = (windowWidth - (N_GRIDS_WIDE - 1) * GRID_GAP_PIXELS) / N_GRIDS_WIDE;
    pixelSize = gridWidth / N_GRID_PIXELS;
    const constraints = {
        video: {
            // mandatory: {
            //     width: N_GRID_PIXELS,
            //     height: N_GRID_PIXELS,
            //     resizeMode: 'crop-and-scale',
            // },


        },
        audio: false,

    }
    capture = createCapture(constraints, VIDEO);
    //capture.size(10, 10);
    //capture.hide();

    prevFrame = createNewGrid(createBlankImage());
    diffArray = createNewGrid(createBlankImage());

    //frameRate(1);
}

function drawImage(img, n, target = this) {
    target.image(
        img,
        (n % N_GRIDS_WIDE) * (GRID_GAP_PIXELS + gridWidth),
        (Math.floor(n / N_GRIDS_WIDE)) * (GRID_GAP_PIXELS + gridWidth),
        gridWidth,
        gridWidth
    );
}

function createImageFromGrid(grid) {

}

function testCreateImage(image) {

}

function createBlankImage(c = ARRAY_TRANSPARENT) {
    const src = createImage(N_GRID_PIXELS, N_GRID_PIXELS);
    src.loadPixels();
    for (let i = 0; i < src.width; i++) {
        for (let j = 0; j < src.height; j++) {
            src.set(i, j, color(...c));
        }
    }
    src.updatePixels();

    return src;
}

function createHiResGrid(src) {
    const grid = createGraphics(gridWidth, gridWidth);
    return grid;
}

function createNewGrid(src) {


    const grid = createGraphics(N_GRID_PIXELS, N_GRID_PIXELS);
    grid.image(src, 0, 0, N_GRID_PIXELS, N_GRID_PIXELS);
    //grid.pixelDensity(1);
    //grid.resizeCanvas(N_GRID_PIXELS, N_GRID_PIXELS);
    return grid;
}

/**
 * 
 * @param {The p5 pixels array} pxls 
 * @param {A function returns a length 4 array, that will set those pixels } pixelFn 
 * @param {A function that will transform the whole array}
 */
function loopPixels(pxls, pixelFn) {
    for (var i = 0; i < pxls.length; i = i + 4) {

        // loop over
        const ca = pxls.slice(i, i + 4);
        typedArrayOverwrite(pxls, i, ...pixelFn(ca, i));
    }
}


function typedArrayOverwrite(ta, i, ...arr) {
    for (let j = 0; j < arr.length; j++) {
        ta[i + j] = arr[j];
    }
}

function diffGrid(pxlsA, pxlsB, diffFn, transformFn) {

    if (pxlsA.length !== pxlsB.length) {
        throw new Error("Pixel arrays must be the same length.");
    }

    for (var i = 0; i < pxlsA.length; i = i + 4) {

        // loop over
        const a1 = pxlsA.slice(i, i + 4);
        const a2 = pxlsB.slice(i, i + 4);

        if (diffFn(a1, a2)) {
            typedArrayOverwrite(pxlsA, i, ...transformFn(a1, a2));
        }
        else {
            typedArrayOverwrite(pxlsA, i, ...ARRAY_TRANSPARENT);
        }



    }
}

function buildDiffArray(prevDiff) {

    if (ndiffs < DIFF_ARRAY_LENGTH) {
        ndiffs++;
    }


    //diffArray.tint(255, 55);
    diffArray.image(
        createBlankImage([0, 0, 0, Math.floor(255 / ndiffs)]),
        0, 0, N_GRID_PIXELS, N_GRID_PIXELS);
    diffArray.image(
        prevDiff,
        0, 0, N_GRID_PIXELS, N_GRID_PIXELS);


}

function loopSubGrid(pixels, x1, x2, y1, y2, fn) {
    const iStart = x1;
    const iFin = x2;
    const jStart = y1;
    const jFin = y2;


    const returnArray = [];

    for (let j = jStart; j < jFin; j++) {
        for (let i = iStart; i < iFin; i++) {
            const index = (j * N_GRID_PIXELS * 4) + i * 4;
            returnArray.push(fn(pixels[index], pixels[index + 1], pixels[index + 2], pixels[index + 3]))
        }
    }

    return returnArray;
}

function indexToPosition(i, width) {
    return [
        i % width,
        Math.floor(i / width)
    ];
}

function draw() {
    background(BG_COLOR);
    drawImage(capture, 0);

    const g1 = createNewGrid(capture);

    drawImage(g1, 1);
    const g2 = createNewGrid(g1);
    g1.remove();


    g2.loadPixels();
    loopPixels(g2.pixels, (ca) => {

        const c = color(...ca);
        if (brightness(c) > 50) {
            return ARRAY_WHITE
        }
        else {
            return ARRAY_TRANSPARENT
        }
    });
    g2.updatePixels();

    const g3 = createNewGrid(g2);
    drawImage(g2, 2);


    g3.loadPixels();
    prevFrame.loadPixels();
    diffGrid(g3.pixels, prevFrame.pixels, (a, b) => {
        return a.some((v, i) => v !== b[i])
    }, (a, b) => {
        return ARRAY_WHITE
    });

    g3.updatePixels();
    //drawImage(g3, 3); //Disable this one, coz it's way to flashy

    prevFrame.remove();

    prevFrame = createNewGrid(g2);
    g2.remove();



    buildDiffArray(g3);

    g3.remove();
    drawImage(diffArray, 4);


    diffArray.loadPixels();


    const points = [];
    for (let i = 0; i < diffArray.pixels.length; i += 4) {
        let value = diffArray.pixels[i];
        if (value > 0) {
            const x = i % N_GRID_PIXELS;
            const y = Math.floor(i / N_GRID_PIXELS);

            points.push([Math.floor((x / N_GRID_PIXELS) * gridWidth), Math.floor((y / N_GRID_PIXELS) * gridWidth)]);
        }
    }
    function average(a1, a2, ratio) {

        return [
            a1[0] + ratio * (a2[0] - a1[0]),
            a1[1] + ratio * (a2[1] - a1[1])

        ]
    }

    diffArray.loadPixels();

    const gridOne = loopSubGrid(diffArray.pixels, 0, 10, 0, 10, (r, g, b, a) => {
        return color(r, g, b, a);
    });

    const gridTwo = loopSubGrid(diffArray.pixels, 10, 20, 0, 10, (r, g, b, a) => {
        return color(r, g, b, a);
    });

    const gridThree = loopSubGrid(diffArray.pixels, 0, 10, 10, 20, (r, g, b, a) => {
        return color(r, g, b, a);
    });

    const gridFour = loopSubGrid(diffArray.pixels, 10, 20, 10, 20, (r, g, b, a) => {
        return color(r, g, b, a);
    });


    let j = 0;
    for (let grid of [gridOne, gridTwo, gridThree, gridFour]) {

        const g5 = createHiResGrid();

        g5.background("#aaa");
        g5.strokeWeight(3);
        g5.noFill();

        g5.stroke(0, 0, 0, 255);


        for (let i = 0; i < grid.length; i++) {

            let x = i % 10;
            let y = Math.floor(i / 10);

            g5.noStroke();
            g5.fill(grid[i]);
            g5.rect(x * pixelSize * 2, y * pixelSize * 2, pixelSize * 2, pixelSize * 2);
        }

        drawImage(g5, 5 + j++);
        g5.remove();

    }

    const g9 = createHiResGrid();

    function adjustForPixelSizeGrid(x, y, ps = pixelSize) {
        return [x * ps, y * ps];
    }

    function extractPoints(array, fn) {
        return array.map((v, i) => ({
            position: indexToPosition(i, 20),
            brightness: brightness(v)
        })).filter(v => v.brightness > 50);
    }


    let keepGoing = true;
    g9.background("#888");
    g9.stroke(0, 0, 0, 255);
    g9.noFill();

    let indexA = 0;
    let indexB = 0;
    let indexC = 0;
    let indexD = 0;


    function* rollingIterator(points, fn) {

        if (points.length === 0) {
            throw new Error("Array must contain at least one element");
        }
        let i = 0;

        while (true) {
            yield fn(points[i]);
            i++;
            i = i % points.length;
        }

    }

    let pointsA = extractPoints(gridOne);
    let pointsB = extractPoints(gridTwo);
    let pointsC = extractPoints(gridThree);
    let pointsD = extractPoints(gridFour);

    const pointsBIter = rollingIterator(pointsB, (v) => v.position.map(w => w * pixelSize * 2));
    const pointsCIter = rollingIterator(pointsC, (v) => v.position.map(w => w * pixelSize * 2));
    const pointsDIter = rollingIterator(pointsD, (v) => v.position.map(w => w * pixelSize * 2));


    try {
        pointsA.forEach(point => {

            g9.beginShape();
            g9.vertex(...point.position.map(v => v * pixelSize * 2));

            g9.quadraticVertex(...pointsBIter.next().value, ...pointsCIter.next().value);

            g9.vertex(...pointsDIter.next().value);

            g9.endShape();
        })
    }
    catch (err) {
        console.error(err, "For Each Aborted");
    }




    drawImage(g9, 9);
    g9.remove();


    // if (points.length > 3) {
    //     g5.beginShape();
    //     g5.vertex(...points.pop());
    //     while (points.length > 2) {
    //         g5.quadraticVertex(...points.pop(), ...points.pop());
    //     }

    //     g5.endShape();

    // }


    // const N_LINES = 10;
    // for (let i = 0; i < N_LINES; i++) {

    //     const ratio = i / N_LINES;

    //     const c = lerpColor(c1, c2, ratio);
    //     g5.stroke(c);

    //     g5.bezier(...p1, ...average(b1a, b1b, ratio), ...average(b2a, b2b, ratio), ...p2);

    // }


    //g5.fill(color(0, 0, 255, 255));
    //g5.noFill();
    //g5.line(0, 0, 50, 100);









}