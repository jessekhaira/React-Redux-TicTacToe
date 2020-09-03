import React from 'react';
import {connect} from 'react-redux';
import Buttons from './Buttons';
import Grid from './Grid';

class AppComponents extends React.Component {
    render() {
        return(
            <div id = 'AppComponents'>
                <Grid /> 
                <Buttons /> 
            </div>
        )
    }
}

export default AppComponents; 