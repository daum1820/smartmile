import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api'

import './SmartmileMap.css';

export default class SmartmileMap extends React.Component {
    static defaultProps = {
        zoom: 15,
        center: {
            lat: 48.5479601,
            lng: 8.7272992
        }
    }

    state = {
        locations: [],
    };

    render() {
        return (
            <div>
                <LoadScript
                    googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}>
                    <GoogleMap
                        mapContainerClassName='smartmile-map-container'
                        zoom={this.props.zoom}
                        center={this.props.center}>                        
                    </GoogleMap>
                </LoadScript>
            </div>
        );
    }
}