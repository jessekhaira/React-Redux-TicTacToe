import React from 'react';
import {PAUSED, GAME_WON, STALEMATE, STARTED} from '../reducers/reducerConstants';
import {_setDisplayBlock, initializeGrid,_highlightWinningCells,_setDisplayNone, _insertO_X_intoGrid, _restoreDefaultColors, checkIfWinner, checkIfStalemate} from '../utilityFunctions'
import Grid from './Grid';

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
        this._addNewStateDiv = this._addNewStateDiv.bind(this); 
    }
    componentDidMount(){
        initializeGrid(document.getElementsByClassName("grid_cells"));
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
        _insertO_X_intoGrid(currGrid);
        const [didWin, winner, winningLoc] = checkIfWinner(currGrid);
        if (didWin) {
            this.displayWinner(winner, winningLoc);
            _highlightWinningCells(winningLoc)
        }
        else if (checkIfStalemate(currGrid)) {
            this.displayStalemate(); 
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

        // add new button for this state in the history tab
        this._addNewStateDiv(timestep, val, row, col);

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


    _addNewStateDiv(timestep, curr_turn, row, col) {
        // everytime we fill in a square, we need to add a div to the game history
        // saving the state in this div so we can return to it later
        const new_state_div = document.createElement('div');
        new_state_div.addEventListener('click', () => {
            this._stateDivHandler(timestep, curr_turn, row, col);
        })
        new_state_div.innerHTML = `Go to move # ${timestep}`;
        new_state_div.className = `buttons`;
        new_state_div.setAttribute('timestep', timestep); 
        const parent = document.getElementById("states_holder")
        parent.appendChild(new_state_div);
    }

    _stateDivHandler(timestep, curr_turn, row, col) {
        _insertO_X_intoGrid(this.props.all_board_statuses[timestep]);
        // turn off the states holder to hide all the buttons, and make visible 
        // option buttons to proceed with change or not 
        _setDisplayNone(document.getElementById("states_holder"), document.getElementById('go_back'));
        _setDisplayBlock(document.getElementById("option_buttons"));
        // we need to set the timestep on the go_back_yes in order to send the appropriate time to the redux store
        // to update state. 
        document.getElementById("go_back_yes").setAttribute('timestep', timestep);
        // game state should change to paused if game is not already stalemated or finished
        // as we consider to make the change or not 
        this.props.update_game_status(timestep, this._updateGameState(PAUSED), curr_turn);

        // show the previous move made at this timestep 
        document.getElementById('timestep_descr').innerHTML = `This is what the game looked like at time ${timestep}. 
        In this timestep, it was player ${curr_turn}'s turn to go. Move previously made here was to add ${curr_turn} to cell
        [${row}, ${col}].`
        _restoreDefaultColors();

    }


    displayWinner(winner, winningLoc) {
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