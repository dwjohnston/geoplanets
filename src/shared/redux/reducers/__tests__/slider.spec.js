import slider from "../slider";
import { SLIDER_UPDATE } from "../../actions/sliderChange";
describe("slider reducer", () => {

    let action;

    beforeEach(() => {
        action = {
            type: SLIDER_UPDATE,
            payload: {
                id: ["foo", "bar", "biz"],
                value: 99
            }

        };
    });


    it("sets a value if it doesn't exist", () => {
        const result = slider({}, action);
        expect(result.foo.bar.biz).toEqual(99);
    });

    it("replaces a value if it already exists", () => {
        const result = slider({ foo: { bar: { biz: 11 } } }, action);
        expect(result.foo.bar.biz).toEqual(99);
    });

    it("does not replace other valeus", () => {
        const result = slider({ foo: { bang: { biz: 11 } } }, action);
        expect(result.foo.bang.biz).toEqual(11);
    });

}); 