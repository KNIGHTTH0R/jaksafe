/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import {fromJS} from 'immutable';

import {
    CHANGE_USERNAME, LOAD_HOTSPOTS, LOAD_HOTSPOTS_SUCCESS, LOAD_LOCATION, LOAD_LOCATION_SUCCESS, LOAD_LOCATION_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
    username: '',
});

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_HOTSPOTS:
            return state
                .set('loading', true);
        case LOAD_HOTSPOTS_SUCCESS:

            return state
                .set('hotspots', action.payload)
                .set('loading', false);
        case LOAD_LOCATION_SUCCESS:

            console.log(action);
            return state;
            // return state
            //     .set('lat', action.payload.coords.latitude)
            //     .set('lon', action.payload.coords.longitude);
        case CHANGE_USERNAME:

            // Delete prefixed '@' from the github username
            return state
                .set('username', action.name.replace(/@/gi, ''));
        default:
            return state;
    }
}

export default homeReducer;
