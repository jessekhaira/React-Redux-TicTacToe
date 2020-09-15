import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDice} from '@fortawesome/free-solid-svg-icons';


/** This class represents a React component and renders and controls the grid 
 * @class
 * @public
*/
class Grid extends React.Component {

    componentDidMount(){
        this._initIdsGrid();
    }

    _initIdsGrid() {
        const grid_cells = document.getElementsByClassName("grid_cells");
        let curr_gc = 0;
        for (let i=0; i<3;i++) {
            for (let j=0; j<3; j++) {
                grid_cells[curr_gc].id = "_"+String(i) + String(j);
                curr_gc++;
            }
        }
    }

    render() {
        return (
            <div id = "header_grid">
                <div id = "header">
                    <h1>Tic-Tac-Toe</h1>
                    <div id = "dice_icon">
                        <FontAwesomeIcon icon = {faDice} size = "4x" color = "#EDF5E1"></FontAwesomeIcon>
                    </div>
                </div>

                {/*CSS grid will be used to create a grid with the container for the grid being grid holder */}
                <div id = "grid_holder">
                    <div class = "grid_cells"></div>
                    <div class = "grid_cells"></div>
                    <div class = "grid_cells"></div>
                    <div class = "grid_cells"></div>

                    <div class = "grid_cells"></div>
                    <div class = "grid_cells"></div>
                    <div class = "grid_cells"></div>
                    <div class = "grid_cells"></div>

                    <div class = "grid_cells"></div>
                </div>
            </div>
        )
    }
}

export default Grid;