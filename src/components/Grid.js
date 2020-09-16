import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDice} from '@fortawesome/free-solid-svg-icons';
import {STARTED, PAUSED} from '../reducers/reducerConstants';

/** This class represents a React component and renders and controls the grid 
 * @class
 * @public
*/
class Grid extends React.Component {
    constructor(props) {
        super(props);

        this._handlerFunctionGridCells = this._handlerFunctionGridCells.bind(this);
        this._initHandlersGridCells = this._initHandlersGridCells.bind(this); 
    }

    componentDidMount(){
        this._initIdsGridCells();
        this._initHandlersGridCells();
    }

    _initIdsGridCells() {
        const grid_cells = document.getElementsByClassName("grid_cells");
        let curr_gc = 0;
        for (let i=0; i<3;i++) {
            for (let j=0; j<3; j++) {
                grid_cells[curr_gc].id = "_"+String(i) + String(j);
                curr_gc++;
            }
        }
    }

    _initHandlersGridCells() {
        for (let i=0; i<3;i++) {
            for (let j=0; j<3; j++) {
                const curr_cell = document.getElementById("_"+String(i) + String(j));
                curr_cell.addEventListener('click', this._handlerFunctionGridCells)
            }
        }
    }

    _handlerFunctionGridCells(e) {
        if (this.props.game_state === PAUSED) {
            return;
        }
        const row = Number(e.target.id[1]);
        const col = Number(e.target.id[2]);
        const timestep = this.props.time_step;
        const val = this.props.curr_turn; 
        const update_info = [row, col, val];
        this.props.update_board(update_info, timestep);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.time_step !== this.props.time_step) {
            return; 
        }
        else {
            const prevPropsGrid = prevProps.curr_board_status;
            const currGrid = this.props.curr_board_status;
            for (let i=0; i<prevPropsGrid.length; i++) {
                for (let j=0;j<prevPropsGrid[i].length; j++) {
                    // you can only change one element at a time in the grid
                    // so if any
                    if (prevPropsGrid[i][j] !== currGrid[i][j]) {
                        break; 
                    }
                }
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