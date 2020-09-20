import Grid from "./Grid"

import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDice} from '@fortawesome/free-solid-svg-icons';
function GridHeader() {
    return (
        <div id = "header_grid">
            <div id = "header">
                <h1>Tic-Tac-Toe</h1>
                <div id = "dice_icon">
                    <FontAwesomeIcon icon = {faDice} size = "4x" color = "#EDF5E1"></FontAwesomeIcon>
                </div>
                <div id = "winner_div" className = "finished_board">
                </div>
                <div id = "stalemate_div" className = "finished_board">
                </div>
            </div>
        </div>
    )
}

export default GridHeader; 