/*
 * AppReducer
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
    INIT,
    INIT_SUCCESS,
    INIT_ERROR, // not logged in
    LOAD_REPOS_SUCCESS,
    LOAD_REPOS,
    LOAD_REPOS_ERROR,
    LOGIN_FACEBOOK,
    LOGIN_FACEBOOK_SUCCESS,
    LOGIN_FACEBOOK_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
    loading: false,
    error: false,
    isInitialized: false,
    isAuthenticated: false,
    currentUser: false,
    userData: {
        repositories: false,
    },
});

function appReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_SUCCESS:
            return state
                .set('isInitialized', true);
        case INIT_ERROR:
            return state
                .set('isInitialized', true);
        case LOGIN_FACEBOOK:
            return state
                .set('loading', true)
                .set('error', false)
                .setIn(['currentUser', 'isAuthenticated'], false);
        case LOGIN_FACEBOOK_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('isAuthenticated', true)
                .set('currentUser', action.payload);
        case LOGIN_FACEBOOK_ERROR:
            return state
                .set('loading', false)
                .set('error', true)
                .setIn(['currentUser', 'isAuthenticated'], false);
        // example
        // case LOAD_REPOS:
        //   return state
        //     .set('loading', true)
        //     .set('error', false)
        //     .setIn(['userData', 'repositories'], false);
        // case LOAD_REPOS_SUCCESS:
        //   return state
        //     .setIn(['userData', 'repositories'], action.repos)
        //     .set('loading', false)
        //     .set('currentUser', action.username);
        // case LOAD_REPOS_ERROR:
        //   return state
        //     .set('error', action.error)
        //     .set('loading', false);
        default:
            return state;
    }
}

export default appReducer;
