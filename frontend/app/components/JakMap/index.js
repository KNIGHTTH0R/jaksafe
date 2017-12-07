import React, {Component} from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class JakMap extends Component {

    render() {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{lat: this.props.lat, lng: this.props.lon}}
            >
                {/*{props.isMarkerShown && <Marker position={{lat: this.props.lat, lng: this.props.lon}}/>}*/}
            </GoogleMap>
        );
    }
}

export default compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(JakMap);

// <MyMapComponent isMarkerShown />// Map with a Marker
// <MyMapComponent isMarkerShown={false} />// Just only Map


