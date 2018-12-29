import { combineReducers } from 'redux';

import slider from "./slider";
import algorithm from "./algorithm";
export default combineReducers({
    controlState: slider,
    algorithm: algorithm,
});
