import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import './Error.css';
/**
 * Error component using font-awesome to display the warning.
 */
export default class Error extends React.Component {

    render() {
        return(
            <div className="error">
                <FontAwesomeIcon  icon={faExclamationTriangle} size="4x" />
                <label className="error-label">Something went wrong! Please try again!</label>
            </div>
        )
    }
}
