export const UPDATE_STATE = "UPDATE_STATE";

export function updateState(data) {
    return {
        type: UPDATE_STATE,
        payload: {
            data
        }
    }
}