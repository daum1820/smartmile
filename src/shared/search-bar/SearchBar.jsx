import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from 'lodash';

import './SearchBar.css';

/**
 * Search Bar Component
 */
export default class SearchBar extends React.Component {
    state = {
        term: ''
    }

    /**
     * Set teh current state and let the parent know about the changes.
     * @param {*} term to be searched
     */
    onInputChange(term) {
        this.setState({term});
        this.props.onSearch(term);
    }

    /**
     * Renders teh search-icon when the input is empty.
     * Otherwise the user can click on the clean button to clean the search-box.
     */
    renderIcon() {
        if (isEmpty(this.state.term) ){
            return (<FontAwesomeIcon  className="icon" icon={faSearch} />);
        } else {
            return (
                <FontAwesomeIcon className="icon button" icon={faTimesCircle} onClick={() => this.onInputChange('')}/>
            )
        }
    }

    render() {
        return (
            <div className="search-bar-container">
                <input className="search-bar-input"
                    placeholder="Search for a name or address"
                    value={this.state.term}
                    onChange={event => this.onInputChange(event.target.value)} />
                {this.renderIcon()}                     
            </div>
        );
    }
}