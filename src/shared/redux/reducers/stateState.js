import { UPDATE_STATE } from "../actions/updateState";

const initialState = {

};

export default (
    state = initialState,
    action
) => {
    switch (action.type) {
        case UPDATE_STATE: {
            // return action.payload.data.reduce((acc, cur) => {
            //     return { ...acc, [cur.id]: cur.data }   //nb, this is superficial
            // }, {});
            //return action.payload

            return state;
        }

        default: {
            return state;
        }
    }
};
