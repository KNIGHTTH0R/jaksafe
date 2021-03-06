/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const INIT = 'INIT';
export const INIT_SUCCESS= 'INIT_SUCCESS';
export const INIT_ERROR = 'INIT_ERROR';
export const LOAD_REPOS = 'LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'LOAD_REPOS_ERROR';
export const LOGIN_FACEBOOK = 'LOGIN_FACEBOOK';
export const LOGIN_FACEBOOK_SUCCESS = 'LOGIN_FACEBOOK_SUCCESS';
export const LOGIN_FACEBOOK_ERROR = 'LOGIN_FACEBOOK_ERROR';
export const DEFAULT_LOCALE = 'en';
