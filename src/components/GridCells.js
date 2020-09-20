import React from 'react';
import {PAUSED, GAME_WON, STALEMATE, STARTED} from '../reducers/reducerConstants';
import Grid from './Grid';

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
class GridCells extends React.Component {
    constructor(props) {
        super(props);
        this._handlerFunctionGridCells = this._handlerFunctionGridCells.bind(this);
        this._initHandlersGridCells = this._initHandlersGridCells.bind(this); 
        this._renderGridUpdate = this._renderGridUpdate.bind(this);
        this._insertO_X_intoGrid = this._insertO_X_intoGrid.bind(this);
        this._addNewStateDiv = this._addNewStateDiv.bind(this); 
    }
    componentDidMount(){
        this._initIdsGridCells();
        this._initHandlersGridCells();
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
        this._insertO_X_intoGrid(currGrid); 
        if (this.checkIfStalemate(currGrid)) {
            this.displayStalemate(); 
        }
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

    _insertO_X_intoGrid(currGrid) {
        for (let i=0; i<currGrid.length; i++) {
            for (let j=0;j<currGrid[i].length; j++) {
                // you can only change one element at a time in the grid
                // so if any
                document.getElementById("_"+String(i)+String(j)).innerHTML = currGrid[i][j];
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

        // add new button for this state in the history tab
        this._addNewStateDiv(timestep, val);

    }

    _updateGameState (newState) {
        let output = null;
        if (this.props.game_state === GAME_WON || this.props.game_state === STALEMATE) {
            output = this.props.game_state;
        }
        else {
            output = newState;
        }
        return output; 
    }


    _addNewStateDiv(timestep, curr_turn) {
        const new_state_div = document.createElement('div');
        // need access to the timestep
        // creating a closure for the event handler
        new_state_div.addEventListener('click', (e) => {
            this._insertO_X_intoGrid(this.props.all_board_statuses[timestep]);
            // turn off the states holder to hide all the buttons, and make visible 
            // option buttons to proceed with change or not 
            this.props._setDisplayNone(document.getElementById("states_holder"), document.getElementById('go_back'));
            this.props._setDisplayBlock(document.getElementById("option_buttons"));
            // we need to set the timestep on the go_back_yes in order to send the appropriate time to the redux store
            // to update state. 
            document.getElementById("go_back_yes").setAttribute('timestep', timestep);
            // game state should change to paused if game is not already stalemated or finished
            // as we consider to make the change or not 
            this.props.update_game_status(timestep, this._updateGameState(PAUSED), curr_turn);

        })
        new_state_div.innerHTML = `Go to move # ${timestep}`;
        new_state_div.className = `buttons`;
        new_state_div.setAttribute('timestep', timestep); 
        const parent = document.getElementById("states_holder")
        parent.appendChild(new_state_div);
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
        return(
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
        )
    }
}

export default GridCells; 