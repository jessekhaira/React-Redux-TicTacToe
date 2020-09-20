import React from 'react';
import {PAUSED, GAME_WON, STALEMATE, STARTED} from '../reducers/reducerConstants';
import GridCells from './GridCells';
import GridHeader from './GridHeader';
/** This class wraps the important components in the grid 
 * @class
 * @public
*/
class Grid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <GridHeader /> 
                <GridCells all_board_statuses = {this.props["all_board_statuses"]} update_game_status = {this.props["update_game_status"]} 
                        time_step = {this.props['time_step']} update_board = {this.props["update_board"]} 
                        curr_board_status = {this.props["curr_board_status"]} game_state = {this.props["game_state"]} 
                        _setDisplayNone = {this.props._setDisplayNone}
                        _setDisplayBlock = {this.props._setDisplayBlock} 
                        curr_turn = {this.props["curr_turn"]} /> 
            </div>
        )
    }
}

export default Grid;