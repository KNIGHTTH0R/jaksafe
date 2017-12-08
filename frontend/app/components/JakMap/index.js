import React, {Component} from 'react';
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"

const JAKSafeMapStyle = require("./JAKSafeMapStyle.json");
const pinBanjir = require("./pin-banjir.png");
const pinHydrant = require("./pin-hydrant.png");
const pinTawuran = require("./pin-tawuran.png");
const pinPintuAir = require("./pin-pintuair.png");
const pinRumahPompa = require("./pin-masjid.png");

class JakMap extends Component {

    render() {
        let props = this.props;
        let markers = props.markers && props.markers.length > 0 && props.markers.map(
            (marker, i) => {
              let iconType;
              if (marker.type === 'hydrant'){
                iconType = pinHydrant;
              }
              else if(marker.type === 'rawan-bencana'){
                iconType = pinBanjir;
              }
              else if(marker.type === 'tawuran'){
                iconType = pinTawuran;
              }
              else if(marker.type === 'pintu-air'){
                iconType = pinPintuAir;
              }
              else{
                iconType = pinRumahPompa;
              }

                return <Marker key={i}
                               position={{
                                   lat: marker.lat,
                                   lng: marker.lon
                               }} icon={{
                                 url: iconType,
                                 scaledSize: new google.maps.Size(50, 50)
                               }} />;
            });

        return (
            <GoogleMap
                defaultZoom={11}
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