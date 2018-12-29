import { CHANGE_ALGO } from "../actions/algoChange";

export default (state = { selectedAlgo: 0 }, action) => {
    switch (action.type) {
    case CHANGE_ALGO: return {
        selectedAlgo: action.payload
    };

    default: return state;
    }
}

