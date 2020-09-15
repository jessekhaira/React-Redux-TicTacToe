import React from 'react';
import {connect} from 'react-redux';
import Buttons from './Buttons';
import Grid from './Grid';

/**
 * This class represents a React component which acts a container
 * to compose the main components within the application.
 * 
 * @class
 * @public
 */
class AppComponents extends React.Component {
    render() {
        return(
            <div id = 'AppComponents'>
                <div id = "container">
                    <Grid /> 
                    <Buttons /> 
                </div>
            </div>
        )
    }
}

export default AppComponents; 