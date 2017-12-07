/**
 * Homepage selectors
 */

import {createSelector} from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
    selectHome,
    (homeState) => homeState.get('username')
);

const makeSelectHotSpots = () => createSelector(
    selectHome,
    (homeState) => homeState.get('hotspots')
);

export {
    selectHome,
    makeSelectUsername,
    makeSelectHotSpots
};
