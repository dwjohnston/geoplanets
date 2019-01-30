
const BG_COLOR = "#bbb";
const N_GRID_PIXELS = 6;

const N_GRIDS_WIDE = 4;
const GRID_GAP_PIXELS = 1;

let pixelSize;
let gridWidth;

let prevFrame;

let ndiffs = 0;
let diffArray;
const DIFF_ARRAY_LENGTH = 100;

const ARRAY_WHITE = [255, 255, 255, 255];
const ARRAY_TRANSPARENT = [0, 0, 0, 0];


const N_SUBGRIDS = 1;   //The number of subgrids will be the square of this number
// //const ARRAY_TRANSPARENT = [0, 0, 0, 0];
const CANVAS_SIZE = 200;
function createHiResGrid(src) {
    const grid = this.createGraphics(gridWidth, gridWidth);
    return grid;
}



// /**
//  * 
//  * @param {The p5 pixels array} pxls 
//  * @param {A function returns a length 4 array, that will set those pixels } pixelFn 
//  * @param {A function that will transform the whole array}
//  */
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


function getPixelAt(pixels, x, y) {
    const index = (y * N_GRID_PIXELS * 4) + x * 4;
    return [pixels[index], pixels[index + 1], pixels[index + 2], pixels[index + 3]];
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
            returnArray.push(fn(pixels[index], pixels[index + 1], pixels[index + 2], pixels[index + 3], i, j))
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

function drawImage(img, n, target = this) {
    target.image(
        img,
        (n % N_GRIDS_WIDE) * (GRID_GAP_PIXELS + gridWidth),
        (Math.floor(n / N_GRIDS_WIDE)) * (GRID_GAP_PIXELS + gridWidth),
        gridWidth,
        gridWidth
    );
}

function createNewGrid(src) {
    const grid = this.createGraphics(N_GRID_PIXELS, N_GRID_PIXELS);
    grid.image(src, 0, 0, N_GRID_PIXELS, N_GRID_PIXELS);
    //grid.pixelDensity(1);
    //grid.resizeCanvas(N_GRID_PIXELS, N_GRID_PIXELS);
    return grid;
}

function createBlankImage(c = ARRAY_TRANSPARENT) {
    const src = this.createImage(N_GRID_PIXELS, N_GRID_PIXELS);
    src.loadPixels();
    for (let i = 0; i < src.width; i++) {
        for (let j = 0; j < src.height; j++) {
            src.set(i, j, this.color(...c));
        }
    }
    src.updatePixels();

    return src;
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


function splitIntoSubGrids(grid) {

    grid.loadPixels();
    const size = Math.floor(N_GRID_PIXELS / N_SUBGRIDS);

    //Creating N_SUBGRIDS * N_SUBGRIDS 
    return Array(N_SUBGRIDS * N_SUBGRIDS).fill(true).map((v, i) => {
        const xStart = (i % N_SUBGRIDS) * size;
        const yStart = Math.floor(i / N_SUBGRIDS) * size;
        return loopSubGrid(grid.pixels, xStart, xStart + size, yStart, yStart + size,
            (r, g, b, a) => {
                return this.color(r, g, b, a);
            }
        );
    });

}

function drawSubGrids(startIndex, grids) {
    let j = 0;

    const size = Math.floor(N_GRID_PIXELS / N_SUBGRIDS);
    for (let grid of grids) {
        const g5 = createHiResGrid();

        g5.background("#aaa");
        g5.strokeWeight(3);
        g5.noFill();

        g5.stroke(0, 0, 0, 255);


        for (let i = 0; i < grid.length; i++) {

            let x = i % size;
            let y = Math.floor(i / size);

            g5.noStroke();
            g5.fill(grid[i]);
            g5.rect(x * pixelSize * N_SUBGRIDS, y * pixelSize * N_SUBGRIDS, pixelSize * N_SUBGRIDS, pixelSize * N_SUBGRIDS);
        }

        drawImage(g5, startIndex + j++);
        g5.remove();

    }
}

let t = 0;
let tx = 0;
let ty = 0;
const s = function (p) {

    p.init = function (videoUpdate) {
        p.videoUpdate = videoUpdate;
    }

    p.setup = function () {
        p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
        p.background(0);
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
        p.capture = p.createCapture(constraints, p.VIDEO);
        p.capture.hide();

        gridWidth = (CANVAS_SIZE - (N_GRIDS_WIDE - 1) * GRID_GAP_PIXELS) / N_GRIDS_WIDE;
        pixelSize = gridWidth / N_GRID_PIXELS;

        createBlankImage = createBlankImage.bind(p);
        createNewGrid = createNewGrid.bind(p);
        drawImage = drawImage.bind(p);
        createHiResGrid = createHiResGrid.bind(p);
        splitIntoSubGrids = splitIntoSubGrids.bind(p);

        prevFrame = createNewGrid(createBlankImage());
        diffArray = createNewGrid(createBlankImage());
    }
    p.draw = function () {
        //p.image(p.capture, 0, 0, 50, 50);

        //Draw the raw capture on 
        p.background(BG_COLOR);
        drawImage(p.capture, 0);

        //Draw the reduced pixel capture on 
        const g1 = createNewGrid(p.capture);
        drawImage(g1, 1);
        const g2 = createNewGrid(g1);
        g1.remove();

        //Change the reduced capture to blank and white
        g2.loadPixels();
        loopPixels(g2.pixels, (ca) => {
            getPixelAt
            const c = p.color(...ca);
            if (p.brightness(c) > 50) {
                return ARRAY_WHITE
            }
            else {
                return ARRAY_TRANSPARENT
            }
        });
        g2.updatePixels();

        const g3 = createNewGrid(g2);
        drawImage(g2, 2);

        //Extract just the changed pixels
        g3.loadPixels();
        prevFrame.loadPixels();
        diffGrid(g3.pixels, prevFrame.pixels, (a, b) => {
            return a.some((v, i) => v !== b[i])
        }, () => {
            return ARRAY_WHITE
        });

        g3.updatePixels();
        //drawImage(g3, 3); //Disable this one, coz it's way to flashy

        prevFrame.remove();
        prevFrame = createNewGrid(g2);
        g2.remove();
        //Draw the changed pixels with time delay/fa});de out
        buildDiffArray(g3);
        g3.remove();
        drawImage(diffArray, 4);




        //Split this image into however many panels. 
        diffArray.loadPixels();
        const startIndex = 5;
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

        const grids = splitIntoSubGrids(diffArray);
        drawSubGrids(5, grids);
        getPixelAt

        if (t++ % 1 === 0) {



            p.videoUpdate({
                x: tx, y: ty,
                value: p.brightness(p.color(...getPixelAt(diffArray.pixels, tx, ty)))
            });

            tx = ++tx % 6;
            if (tx === 0) {
                ty = ++ty % 6;
            }

            // loopSubGrid(diffArray.pixels, t % 6, , 0, 6, (r, g, b, a, x, y) => {
            //     p.videoUpdate({
            //         x, y,
            //         value: p.brightness(p.color(r, g, b, a))
            //     });
            // });
        }




    };
};

export default s; 