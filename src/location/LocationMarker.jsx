import React from 'react';
import { InfoWindow, Marker } from '@react-google-maps/api';
import { keys } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMap } from '@fortawesome/free-solid-svg-icons';

import marker from '../assets/marker.png';
import { MapContext } from '../shared/provider/MapProvider';
import './LocationMarker.css';

/**
 * Component to set a Marker on Map for a location
 */
export default class LocationMarker extends React.Component {

    /**
     * Renders a `InfoWindow` if a `Marker` was clicked.
     * It shows the Location name, address and opening hours.
     * 
     * @param {*} context React context to hide the `InfoWindow`
     * when the close button was clicked.
     */
    renderInfoWindow(context){
        
        // Do not render if visibleId from `MapContext` doesn't match with location id (`Marker`).
        if (context.visibleId !== this.props.location.id) {
            return null;
        }

        const { name, address, hours } = this.props.location
        const position = {
            lat: address.latitude,
            lng: address.longitude
        }

        return (
            <InfoWindow
                onCloseClick={() => context.setVisibleId(-1)}
                position={position}>
                <div className="info-window-container">
                    <h3 className="title">{name}</h3>
                    <div className="container">
                        <FontAwesomeIcon  icon={faMap} size="lg"/> 
                        <div>
                            <div>{address.street}</div> 
                            <div>{address.cityAndPostcode} - {address.country}</div>
                        </div>
                    </div>
                    <div className="container">
                        <FontAwesomeIcon  icon={faClock} size="lg"/> 
                        <div>
                            {
                                keys(hours).map(
                                    (key) => (
                                        <div key={key}>
                                            {key.replace(/^\w/, c => c.toUpperCase())}: {hours[key]}
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </InfoWindow>
        );
    }

    render() {
        const { id, name, address } = this.props.location;
        const position = {
            lat: address.latitude,
            lng: address.longitude
        }
        return (
            <MapContext.Consumer>
                {(context) => (
                    <div>
                        {this.renderInfoWindow(context)}
                        <Marker
                            title={name}
                            position={position}
                            icon={{
                                url: marker,
                                anchor: new window.google.maps.Point(24, 24),
                            }}
                            onClick={() => context.setVisibleId(id)}
                        />
                    </div>
                )}
                
            </MapContext.Consumer>
        );
    }
}