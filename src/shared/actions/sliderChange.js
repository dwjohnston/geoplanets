
export const SLIDER_UPDATE = 'SLIDER_UPDATE';

/**
 * This method is used to create the SLIDER_UPDATE action.
 * It is dispatched to the reducer and handled by it.
 *
 * @param name Name of the slider
 * @returns {{type: string, payload: {name: *, value: *}}} SLIDER_UPDATE action
 */
export const sliderUpdate = (name, value) => ({
    type: SLIDER_UPDATE,
    payload: {
        name: name,
        value: value,
    }
});