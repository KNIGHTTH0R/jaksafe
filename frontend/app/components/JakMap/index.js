import React, {Component} from 'react';
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"

const JAKSafeMapStyle = require("./JAKSafeMapStyle.json");

class JakMap extends Component {

    render() {
        let props = this.props;
        let markers = props.markers && props.markers.length > 0 && props.markers.map(
            (marker, i) => {
                return <Marker key={i}
                               position={{
                                   lat: marker.lat,
                                   lng: marker.lon
                               }}/>;
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
        containerElement: <div style={{height: `calc(100vh - 114px)`}}/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    withScriptjs,
    withGoogleMap
)(JakMap);

// <MyMapComponent isMarkerShown />// Map with a Marker
// <MyMapComponent isMarkerShown={false} />// Just only Map
