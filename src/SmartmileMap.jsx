import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { isEmpty, isNil } from 'lodash';

import LoadingBar from './shared/loading-bar/LoadingBar';
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
        map: undefined
    };

    async componentDidMount() {
        // fetch all locations and update component state
        const locations = await locationAPI.getAll();
        this.setState({ locations });

        if (!isEmpty(locations) && !isNil(this.state.map)) {
            // set the map bounds once the map was and location were already loaded.
            const bounds = new window.google.maps.LatLngBounds();
            locations.forEach( location => {
                bounds.extend({
                    lat: location.address.latitude,
                    lng: location.address.longitude
                })
            });
            this.state.map.fitBounds(bounds);
        }
    }

    /**
     *  set map on component state after onLoad event from GoogleMap
     */
    onLoad = (map) => this.setState({ map });

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
        let loadingBarHTML = null;
        let loadingClassName = 'smartmile-map-container';

        // shows loading if locations are not available
        if (isEmpty(this.state.locations)) {
            loadingClassName = `${loadingClassName} loading`;
            loadingBarHTML= (<LoadingBar />);
        }

        return (
            <div>
                { loadingBarHTML }
                <LoadScript
                    googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}>
                    <GoogleMap
                        mapContainerClassName={loadingClassName}
                        zoom={this.props.zoom}
                        center={this.props.center}
                        onLoad={map => this.onLoad(map)}>
                            {this.renderLocationMarkers()}                      
                    </GoogleMap>
                </LoadScript>
            </div>
        );
    }
}