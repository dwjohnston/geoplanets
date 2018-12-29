import { SLIDER_UPDATE } from "../actions/sliderChange";
import { set, cloneDeep } from "lodash";
const initialState = {

};

export default (
    state = initialState,
    action
) => {
    switch (action.type) {
        case SLIDER_UPDATE: {
            return set(cloneDeep(state), action.payload.id.join("."), action.payload.value)
        }

        default: {
            return initialState;
        }
    }
};
