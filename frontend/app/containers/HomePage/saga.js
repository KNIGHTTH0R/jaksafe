/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';
import {LOAD_HOTSPOTS} from "./constants";
import {loadHotSpotsError, loadHotSpotsSuccess} from "./actions";

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* getHotSpots(action) {
    console.log('saga get hot spots');
    console.log(action);
    const location= action.payload.coords.latitude+','+action.payload.coords.longitude;
    const requestURL = 'https://jaksafe.tono.io/api/hotspots?location='+location;

    try {
        // Call our request helper (see 'utils/request')
        const hotspots = yield call(request, requestURL);
        yield put(loadHotSpotsSuccess(hotspots.data));
    } catch (err) {
        yield put(loadHotSpotsError(err));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getRepos);
  yield takeLatest(LOAD_HOTSPOTS, getHotSpots);
}
