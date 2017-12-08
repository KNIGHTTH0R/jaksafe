/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {makeSelectRepos, makeSelectLoading, makeSelectError} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Header from 'components/Header';
import ToolbarBottom from 'components/ToolbarBottom';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import {loadRepos} from '../App/actions';
import {loadHotSpots} from './actions';
import {changeUsername} from './actions';
import {makeSelectUsername, makeSelectHotSpots} from './selectors';
import reducer from './reducer';
import saga from './saga';
import JakMap from "components/JakMap";
import Geolocation from "react-geolocation";

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    onLocationRetrieved = (position) => {
        console.log('location retrieved');
        console.log(position);
        this.props.loadHotSpots(position);
    }

    render() {

        return (
            <div>
                <Header/>
                <article>
                    <Helmet>
                        <title>Jaksafe</title>
                        <meta name="description" content="Jakarta Aman"/>
                    </Helmet>
                    <div>
                        <CenteredSection>
                            <JakMap markers={this.props.hotspots} lat={-6.1921633} lon={106.7895428}/>
                        </CenteredSection>
                        <Geolocation
                            onSuccess={this.onLocationRetrieved}
                            render={({
                                         fetchingPosition,
                                         position: {coords: {latitude, longitude} = {}} = {},
                                         error,
                                         getCurrentPosition
                                     }) =>
                                null}
                        />
                    </div>
                </article>
                <ToolbarBottom/>
            </div>
        );
    }
}

HomePage.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]),
    repos: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
    ]),
    onSubmitForm: PropTypes.func,
    username: PropTypes.string,
    onChangeUsername: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
    return {
        onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
        onSubmitForm: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(loadRepos());
        },
        loadHotSpots: (position) => {
            dispatch(loadHotSpots(position));
        }
    };
}

const mapStateToProps = createStructuredSelector({
    repos: makeSelectRepos(),
    username: makeSelectUsername(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    hotspots: makeSelectHotSpots()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: 'home', reducer});
const withSaga = injectSaga({key: 'home', saga});

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(HomePage);
