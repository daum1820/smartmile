import React from 'react';

/**
 * Provider to pass data state between LocationMarkers siblings,
 * so just one information should be display at the map.
 */
export const MapContext = React.createContext();

export class MapProvider extends React.Component {
    state = {
        visibleId: -1,
        setVisibleId: (id) => this.setState({ visibleId: id }),
    }

    render() {
        return (
            <MapContext.Provider value={this.state}>
                { this.props.children }
            </MapContext.Provider>
        )
    }
}