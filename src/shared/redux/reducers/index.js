import { combineReducers } from 'redux';

import slider from "./slider";
import algorithm from "./algorithm";
import stateState from "./stateState";
export default combineReducers({
    controlState: slider,
    stateState: stateState,
    algorithm: algorithm,
});

