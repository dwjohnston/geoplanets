import SLIDER_UPDATE from "../actions/sliderChange";
const initialState = {
    name: "slider",
    value: 5,
};

export default (
    state = initialState,
    action
) => {
    switch (action.type) {
    case "SLIDER_UPDATE": {
        return { ...action.payload }
    }

    default: {
        return initialState;
    }
    }
};
