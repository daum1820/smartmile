import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import './LoadingBar.css';
/**
 * Loading component using font-awesome to display the spinner.
 */
export default class LoadingBar extends React.Component {

    render() {
        return(
            <div className="loading">
                <FontAwesomeIcon  icon={faSpinner} spin size="3x" />
            </div>
        )
    }
}
