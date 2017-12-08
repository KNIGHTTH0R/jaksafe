import React, {Component} from 'react';
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"

const JAKSafeMapStyle = require("./JAKSafeMapStyle.json");

class JakMap extends Component {

    render() {
        let props = this.props;
        let markers = props.markers && props.markers.length > 0 && props.markers.map(
            (marker, i) => {
                return <Marker key={1}
                        position={{lat: marker.coords.position.latitude, lng: marker.coords.position.longitude}}/>;
            });

        return (
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{lat: this.props.lat, lng: this.props.lon}}
                defaultOptions={{styles: JAKSafeMapStyle}}
            >
                {markers}
            </GoogleMap>
        );
    }
}

export default compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `100vh`}}/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    withScriptjs,
    withGoogleMap
)(JakMap);

// <MyMapComponent isMarkerShown />// Map with a Marker
// <MyMapComponent isMarkerShown={false} />// Just only Map
