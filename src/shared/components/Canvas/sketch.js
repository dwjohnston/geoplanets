const s = function (p) {

    p.setup = function () {
        p.createCanvas(200, 200);
        p.background(0);
        p.temp = p.createGraphics(200, 200);
        p.perm = p.createGraphics(200, 200);
    };


    p.t = 0;
    p.controlsPackage = {};
    p.statePackage = {};
    p._algoFn = () => {
        return [];
    }

    p.init = function (controlsPackage, statePackage, algoFn, updateState) {
        p.t = 0;
        p.controlsPackage = controlsPackage;
        p.statePackage = statePackage;
        p._algoFn = algoFn;
        p._updateState = updateState;
    }

    p.doUpdate = function (controlsPackage, statePackage, algoFn) {
        p.t = 0;
        p.controlsPackage = controlsPackage;
        p.statePackage = statePackage;
        p._algoFn = algoFn;
    }

    p.draw = function () {
        try {
            const { temp, perm, data } = p._algoFn(p.t, p.controlsPackage, p.statePackage, p);
            perm.forEach(v => v(p.perm));
            //p._updateState(data); //For some reason, updating the state is clobbaring the existing control state

            p.temp.clear();
            temp.forEach(v => v(p.temp));

            p.clear();
            p.image(p.temp, 0, 0);
            p.image(p.perm, 0, 0);

            p.t++;

        } catch (err) {
            console.error(err);
        }

    };
};

export default s; 