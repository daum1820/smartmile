import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api'

import LocationMarker from './location/LocationMarker';
import locationAPI from './location/location.api';

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

    async componentDidMount() {
        // fetch all locations and update component state
        const locations = await locationAPI.getAll();
        this.setState({ locations });
    }

    /**
     * Render all children component's as `LocationMarker`
     */
    renderLocationMarkers() {
        let { locations } = this.state;
             
        return locations.map(location => (
            <LocationMarker
                key={location.id}
                location={location}
            />
        ));
    }

    render() {
        return (
            <div>
                <LoadScript
                    googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}>
                    <GoogleMap
                        mapContainerClassName='smartmile-map-container'
                        zoom={this.props.zoom}
                        center={this.props.center}>
                            {this.renderLocationMarkers()}                      
                    </GoogleMap>
                </LoadScript>
            </div>
        );
    }
}