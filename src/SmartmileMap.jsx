import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { debounce, isEmpty, isNil } from 'lodash';

import Error from './shared/error/Error';
import LoadingBar from './shared/loading-bar/LoadingBar';
import SearchBar from './shared/search-bar/SearchBar';
import { MapProvider } from './shared/provider/MapProvider';
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
        error: false,
        locations: [],
        map: undefined,
        search: undefined,
    };

    async componentDidMount() {

        // fetch all locations and update component state
        const locations = await locationAPI.getAll().catch(() => {
            this.setState({ error: true })
        });
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
     *  set search term on component state after the `SearchBar` was used.
     */
    onSearch = (search) => this.setState({ search });

    /**
     *  filter the locations based on their address and name.
     *  return all locations where desired term was found.
     *  if no search term is provided, return all locations from component's state.
     */
    onFilter = (search, locations) => {
        // return empty if there is no locations
        if (isEmpty(locations)) {
            return [];
        }
        // return all locations if there is no terms to search
        if (isEmpty(search)) {
            return locations;
        }

        // filter location by Location's name or address
        return locations.filter(l =>  {
            return  l.name.toLowerCase().includes(search.toLowerCase()) ||
            l.address.street.toLowerCase().includes(search.toLowerCase()) ||
            l.address.cityAndPostcode.toLowerCase().includes(search.toLowerCase()) ||
            l.address.country.toLowerCase().includes(search.toLowerCase()) 
        })
    }

    /**
     * Render all children component's as `LocationMarker`
     */
    renderLocationMarkers() {
        let { locations, search } = this.state;
             
        return this.onFilter(search, locations).map(location => (
            <LocationMarker
                key={location.id}
                location={location}
            />
        ));
    }

    render() {
        let { locations, error } = this.state;
        let containerHTML = null;
        let containerClassName = 'smartmile-map-container';

        if (error) {
            // return if something wrong happened.
            containerHTML = (<Error />);
            containerClassName = `${containerClassName} opacity`;
        } else if (isEmpty(locations)) {
            // shows loading if locations are not available
            containerClassName = `${containerClassName} opacity`;
            containerHTML= (<LoadingBar />);
        }

        // Debounce to prevent the search to be triggered for every single changes on `SearchBar`
        const searchDebounce = debounce(term => this.onSearch(term), 500);
        return (
            <div>
                { containerHTML }
                <LoadScript
                    googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}>
                    <GoogleMap
                        mapContainerClassName={containerClassName}
                        zoom={this.props.zoom}
                        center={this.props.center}
                        onLoad={map => this.onLoad(map)}>
                            <SearchBar onSearch={searchDebounce} />
                            <MapProvider>
                                {this.renderLocationMarkers()}
                            </MapProvider>                   
                    </GoogleMap>
                </LoadScript>
            </div>
        );
    }
}