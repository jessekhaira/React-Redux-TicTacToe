import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDice} from '@fortawesome/free-solid-svg-icons';
import {PAUSED, GAME_WON, STALEMATE, STARTED} from '../reducers/reducerConstants';

// These are all the conditions in which a player has won the game
// each item represents one winning condition (IE: first row represents
// the diagonal winning condition from the top left cell) and each 
// item within the row represents [row,col] to look at in the grid 
const winning_conditions = [
    [[0,0], [1,1], [2,2]],
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[2,0], [1,1], [0,2]]
]

/** This class represents a React component and renders and controls the grid 
 * @class
 * @public
*/
class Grid extends React.Component {
    constructor(props) {
        super(props);

        this._handlerFunctionGridCells = this._handlerFunctionGridCells.bind(this);
        this._initHandlersGridCells = this._initHandlersGridCells.bind(this); 
        this._renderGridUpdate = this._renderGridUpdate.bind(this);
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
        if (this.props.game_state !== STARTED) {
            return;
        }
        const row = Number(e.target.id[1]);
        const col = Number(e.target.id[2]);
        // if already item in this grid cell, return
        if (this.props.curr_board_status[row][col] !== '') {
            return; 
        }
        const timestep = this.props.time_step;
        const val = this.props.curr_turn; 
        const update_info = [row, col, val];
        this.props.update_board(update_info, timestep);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.time_step === this.props.time_step) {
            return; 
        }
        else {
            this._renderGridUpdate(); 
        }
    }

    _renderGridUpdate() {
        const currGrid = this.props.curr_board_status;
        const [didWin, winner] = this.checkIfWinner(currGrid);
        if (didWin) {
            this.displayWinner(winner);
        }
        for (let i=0; i<currGrid.length; i++) {
            for (let j=0;j<currGrid[i].length; j++) {
                // you can only change one element at a time in the grid
                // so if any
                document.getElementById("_"+String(i)+String(j)).innerHTML = currGrid[i][j];
            }
        }

        if (this.checkIfStalemate(currGrid)) {
            this.displayStalemate(); 
        }
    }

    displayWinner(winner) {
        this.props.update_game_status(this.props.time_step, GAME_WON, this.props.curr_turn);
        const winner_div = document.getElementById('winner_div');
        winner_div.style.display = 'block';
        winner_div.innerHTML = `Player ${winner} wins! Reset the game, travel back to an earlier
        game state, or start a new game!`; 
    }

    displayStalemate() {
        this.props.update_game_status(this.props.time_step, STALEMATE, this.props.curr_turn);
        const stalemate_div = document.getElementById("stalemate_div");
        stalemate_div.style.display = 'block';
        stalemate_div.innerHTML = `The game has reached a stalemate. Please reset the game, travel back to an
        earlier game state and continue playing from there, or start a new game!`;
    }


    checkIfWinner(grid) {
        for (const item of winning_conditions) {
            let cell_item = '';
            let count_good = 0;
            for (const curr_cell of item) {
                const curr_val = grid[curr_cell[0]][curr_cell[1]];
                if (cell_item === '') {
                    cell_item = curr_val;
                }
                else if (cell_item !== curr_val) {
                    break;
                }
                else {
                    count_good++; 
                }
            }
            if (count_good === 2) {
                return [true, cell_item];
            }
        }
        return [false, ''];
    }

    checkIfStalemate(grid) {
        // stalemate if in every single path you can possibly win,
        // you have two different letters
        // so no path can ever have 3 in a row
        let possibleWinningConditions = winning_conditions.length; 
        for (const item of winning_conditions) {
            let cell_item = '';
            for (const curr_cell of item) {
                const curr_val = grid[curr_cell[0]][curr_cell[1]];
                // its fine if the cell hasnt been filled in yet
                // only want to consider case where it has been filled in and 
                // there are two different letters in the win condition 
                if (curr_val === '') {
                    continue;
                }
                else if (cell_item === '') {
                    cell_item = curr_val;
                }
                else if (cell_item !== curr_val) {
                    possibleWinningConditions--;
                    break;
                }
            }
        }
        return possibleWinningConditions === 0;
    }



    render() {
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

                {/*CSS grid will be used to create a grid with the container for the grid being grid holder */}
                <div id = "grid_holder">
                    <div className = "grid_cells"></div>
                    <div className = "grid_cells"></div>
                    <div className = "grid_cells"></div>

                    <div className = "grid_cells"></div>
                    <div className = "grid_cells"></div>
                    <div className = "grid_cells"></div>

                    <div className = "grid_cells"></div>
                    <div className = "grid_cells"></div>
                    <div className = "grid_cells"></div>
                </div>
            </div>
        )
    }
}

export default Grid;