/*
 * App Actions
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
    INIT,
    INIT_SUCCESS,
    INIT_ERROR,
    LOAD_REPOS,
    LOAD_REPOS_SUCCESS,
    LOAD_REPOS_ERROR,
    LOGIN_FACEBOOK,
    LOGIN_FACEBOOK_SUCCESS,
    LOGIN_FACEBOOK_ERROR
} from './constants';

export function init() {
    return {
        type: INIT
    };
}

export function initSuccess() {
    return {
        type: INIT_SUCCESS
    };
}

export function initError() {
    return {
        type: INIT_ERROR
    };
}

export function loginFacebook() {
    return {
        type: LOGIN_FACEBOOK
    };
}

export function loginFacebookSuccess(user) {
    return {
        type: LOGIN_FACEBOOK_SUCCESS,
        payload: user
    };
}

export function loginFacebookError(error) {
    return {
        type: LOGIN_FACEBOOK_ERROR,
        payload: error
    };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
    return {
        type: LOAD_REPOS
    };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
    return {
        type: LOAD_REPOS_SUCCESS,
        repos,
        username,
    };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
    return {
        type: LOAD_REPOS_ERROR,
        error,
    };
}
