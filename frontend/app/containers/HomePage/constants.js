/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_USERNAME = 'boilerplate/Home/CHANGE_USERNAME';

export const LOAD_HOTSPOTS = 'LOAD_HOTSPOTS';
export const LOAD_HOTSPOTS_SUCCESS = 'LOAD_HOTSPOTS_SUCCESS';
export const LOAD_HOTSPOTS_ERROR = 'LOAD_HOTSPOTS_ERROR';
export const LOAD_LOCATION = 'LOAD_LOCATION';
export const LOAD_LOCATION_SUCCESS = 'LOAD_LOCATION_SUCCESS';
export const LOAD_LOCATION_ERROR = 'LOAD_LOCATION_ERROR';
