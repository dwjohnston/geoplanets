
const s = function (p) {

    p.setup = function () {
        p.createCanvas(200, 200);
        p.background(0);
        p.temp = p.createGraphics(200, 200);
        p.perm = p.createGraphics(200, 200);


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
    };




    p.t = 0;
    p.controlsPackage = {};
    p.statePackage = {};
    p._algoFn = () => {
        return [];
    }

    p.doUpdate = function (controlsPackage, statePackage, algoFn, isTemp = false) {
        //p.t = 0;
        p.controlsPackage = controlsPackage;
        p.statePackage = statePackage;
        p._algoFn = algoFn;
    }

    p.draw = function () {
        const { temp, perm } = p._algoFn(p.t, p.controlsPackage, p.statePackage, p);
        perm.forEach(v => v(p.perm));

        p.temp.clear();
        temp.forEach(v => v(p.temp));

        p.clear();
        p.image(p.temp, 0, 0);
        p.image(p.perm, 0, 0);

        p.t++;
    };
};

export default s; 