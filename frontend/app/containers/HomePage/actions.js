/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
    CHANGE_USERNAME, LOAD_HOTSPOTS, LOAD_HOTSPOTS_SUCCESS,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(name) {
    return {
        type: CHANGE_USERNAME,
        name,
    };
}

export function loadHotSpots(position) {
    return {
        type: LOAD_HOTSPOTS,
        payload: position,
    };
}

export function loadHotSpotsSuccess(hotspots) {
    return {
        type: LOAD_HOTSPOTS_SUCCESS,
        payload: hotspots,
    };
}

export function loadHotSpotsError(error) {
    return {
        type: LOAD_HOTSPOTS_SUCCESS,
        payload: error,
    };
}

export function loadLocation() {
    return {
        type: LOAD_LOCATION,
    };
}

export function loadLocationSuccess(position) {
    return {
        type: LOAD_LOCATION_SUCCESS,
        payload: position,
    };
}

export function loadLocationError(error) {
    return {
        type: LOAD_LOCATiON_SUCCESS,
        payload: error,
    };
}
