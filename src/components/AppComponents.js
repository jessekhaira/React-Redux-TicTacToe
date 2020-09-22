import React from 'react';
import {connect} from 'react-redux';
import Buttons from './Buttons';
import Grid from './Grid';
import {mapStateToProps} from '../react-redux-map/mapStateToProps';
import {mapDispatchToProps} from '../react-redux-map/mapDispatchToProps';

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
                    <Grid all_board_statuses = {this.props["all_board_statuses"]} 
                        update_game_status = {this.props["update_game_status"]} 
                        time_step = {this.props['time_step']} 
                        update_board = {this.props["update_board"]} 
                        curr_board_status = {this.props["curr_board_status"]} 
                        game_state = {this.props["game_state"]} 
                        curr_turn = {this.props["curr_turn"]}
                        /> 

                    <Buttons startNewGame = {this.props.startNewGame} 
                        time_step = {this.props['time_step']} 
                        update_game_status = {this.props["update_game_status"]}
                        go_back_state = {this.props.go_back_state}
                        curr_board_status = {this.props["curr_board_status"]} 
                        resetGame = {this.props["resetGame"]} 
                        game_state = {this.props["game_state"]}
                        curr_turn = {this.props["curr_turn"]} /> 
                </div>
            </div>
        )
    }
}
let connectedComponent = connect(mapStateToProps, mapDispatchToProps)(AppComponents); 

export {connectedComponent as AppComponents}; 