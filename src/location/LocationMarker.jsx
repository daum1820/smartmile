import React from 'react';
import { Marker } from '@react-google-maps/api';
import './LocationMarker.css';

/**
 * Component to set a Marker on Map for a location
 */
export default class LocationMarker extends React.Component {

    render() {
        const { name, address } = this.props.location;
        const position = {
            lat: address.latitude,
            lng: address.longitude
        }
        return (
            <Marker
                title={name}
                position={position}
            />
        );
    }
}