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
const makeSelectLat = () => createSelector(
    selectHome,
    (homeState) => homeState.get('lat')
);
const makeSelectLon = () => createSelector(
    selectHome,
    (homeState) => homeState.get('lon')
);

export {
    selectHome,
    makeSelectUsername,
    makeSelectHotSpots,
    makeSelectLat,
    makeSelectLon
};
