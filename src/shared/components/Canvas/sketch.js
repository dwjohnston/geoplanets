const s = function (sketch) {

    console.log(sketch);
    var x = 100;
    var y = 100;

    sketch.setup = function () {
        sketch.createCanvas(200, 200);
    };


    let t = 0;
    let controlsPackage = {};
    let statePackage = {};
    let algoFn = () => {
        return [];
    }

    sketch.doUpdate = function (controlsPackage, statePackage, algoFn) {

        t = 0;
        controlsPackage = controlsPackage;
        statePackage = statePackage;
        algoFn = algoFn;
    }

    sketch.draw = function () {
        sketch.background(0);
        sketch.fill(255);
        sketch.rect(x, y, 5, 50);

        algoFn(t, controlsPackage, statePackage, sketch).forEach(v => v(sketch));
    };
};

export default s; 