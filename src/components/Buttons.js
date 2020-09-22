import React from 'react';
import {_setDisplayBlock, _setDisplayNone, _insertO_X_intoGrid, 
    _setDisplayGrid,_restoreDefaultColors, _highlightWinningCells ,checkIfWinner, 
    checkIfStalemate, deleteChildrenGreater_EqualThanT} from '../utilityFunctions'

import {STARTED, PAUSED, GAME_WON, STALEMATE} from '../reducers/reducerConstants';

/**
 * This class represents a React component and renders and controls all the buttons for the game.
 * 
 * @class
 * @public
 */
class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.chooseStyle = this.chooseStyle.bind(this);
        this.startGame = this.startGame.bind(this);
        this._resetYes = this._resetYes.bind(this);
        this._resetNo = this._resetNo.bind(this);
        this._startNewGame = this._startNewGame.bind(this);
        this._resetGame = this._resetGame.bind(this);
        this._newGameYes = this._newGameYes.bind(this);
        this._newGameNo = this._newGameNo.bind(this);
        this._updateGameState = this._updateGameState.bind(this);
        this._showGameHistory = this._showGameHistory.bind(this);
        this._goBack = this._goBack.bind(this);
        this._noResetToStateT = this._noResetToStateT.bind(this);

        this._resetToStateT = this._resetToStateT.bind(this);
    }

    componentDidMount() {
        this._initDisplay();
        this._initStatesHolder();
    }

    _initStatesHolder() {
        const stateHolder = document.getElementById("states_holder");
    }

    _initDisplay() {
        const buttons = Array.from(document.getElementById("button_holder").children);
        buttons.forEach((x) => {
            let val = (x.id === "start" ? "block":"none");
            x.style.display = val; 
        });
    }

    startGame(e) {
        const O_button = document.getElementById("O");
        const X_button = document.getElementById("X");
        _setDisplayNone(e.target);
        _setDisplayBlock(O_button, X_button);
    }

    chooseStyle(e) {
        const chosenStyle = e.target.id;
        const O_button = document.getElementById("O");
        const X_button = document.getElementById("X");
        const reset_button = document.getElementById("reset");
        const history_button = document.getElementById("history");
        const new_game = document.getElementById("new_game");

        _setDisplayNone(O_button, X_button);
        _setDisplayBlock(reset_button, history_button, new_game);

        // Game status has changed to start if we have clicked the start button and chosen a style
        // so dispatch action to store to update the state
        this.props.update_game_status(this.props.time_step, STARTED, chosenStyle);
    }

    _hideGameButtons() {
        const reset_button = document.getElementById("reset");
        const history_button = document.getElementById("history");
        const new_game = document.getElementById("new_game");
        _setDisplayNone(reset_button, history_button, new_game);
    }

    _showGameButtons() {
        const reset_button = document.getElementById("reset");
        const history_button = document.getElementById("history");
        const new_game = document.getElementById("new_game");
        _setDisplayBlock(reset_button, history_button, new_game);
    }


    _turnOffWinnerStalemate() {
        const winner = document.getElementById('winner_div');
        const stalemate = document.getElementById('stalemate_div');
        _setDisplayNone(winner, stalemate);
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


    _resetGame(){
        // don't want to be able to change board state when resetting
        this.props.update_game_status(this.props.time_step, this._updateGameState(PAUSED), this.props.curr_turn);
        const confirm_reset = document.getElementById("confirm_reset");
        this._hideGameButtons();
        confirm_reset.style.display = "flex";
        confirm_reset.style.flexDirection = "column";
        confirm_reset.style.justifyContent = "center";

    }

    _resetYes() {
        this.props.resetGame();
        this._turnOffWinnerStalemate(); 
        this._showGameButtons();
        const confirm_reset = document.getElementById("confirm_reset");
        _setDisplayNone(confirm_reset);
        // clear all previous states in stateholder
        this._clearGameHistory();
        // change all the colors to blue if we're resetting
        _restoreDefaultColors();
    }


    _resetNo() {
        // If we're not resetting and game state is won or stalemate, then keep that game state the same
        // otherwise, start game back up again 
        this.props.update_game_status(this.props.time_step, this._updateGameState(STARTED), this.props.curr_turn);
        this._showGameButtons();
        const confirm_reset = document.getElementById("confirm_reset");
        _setDisplayNone(confirm_reset);
    }

    _startNewGame() {
        // don't want to be able to change board state when starting new game 
        this.props.update_game_status(this.props.time_step, this._updateGameState(PAUSED), this.props.curr_turn);
        this._hideGameButtons(); 
        const confirm_newgame = document.getElementById("confirm_newgame");
        confirm_newgame.style.display = 'flex';
        confirm_newgame.style.flexDirection = 'column';
        confirm_newgame.style.justifyContent = 'center';
    }

    _newGameYes() {
        this.props.startNewGame();
        this._turnOffWinnerStalemate();
        const confirm_newgame = document.getElementById("confirm_newgame");
        const startbutton = document.getElementById("start");
        _setDisplayNone(confirm_newgame);
        _setDisplayBlock(startbutton);

        // if we're starting a newgame, we have to get rid of all the previous states that
        // we've saved in the history 
        this._clearGameHistory();
        // reset colors to defaults 
        _restoreDefaultColors();

    }

    _newGameNo() {
        // If we're not resetting and game state is won or stalemate, then keep that game state the same
        // otherwise, start game back up again 
        this.props.update_game_status(this.props.time_step, this._updateGameState(STARTED), this.props.curr_turn);
        this._showGameButtons();
        const confirm_newgame = document.getElementById("confirm_newgame");
        _setDisplayNone(confirm_newgame);
    }

    _showGameHistory() {
        this.props.update_game_status(this.props.time_step, this._updateGameState(PAUSED), this.props.curr_turn);
        this._hideGameButtons();
        _setDisplayBlock(document.getElementById("go_back"));
        const parent = document.getElementById("states_holder");
        _setDisplayGrid(parent);
    }

    _clearGameHistory() {
        const parent = document.getElementById("states_holder");
        while (parent.firstChild) {
            parent.removeChild(parent.lastChild);
        }
    }

    _goBack(e) {
        this._showGameButtons();
        this.props.update_game_status(this.props.time_step, this._updateGameState(STARTED), this.props.curr_turn);
        _setDisplayNone(e.target, document.getElementById("states_holder"));
    }

    _resetToStateT(e) {
        const timestep = e.target.getAttribute('timestep');
        this.props.go_back_state(timestep);
        _setDisplayNone(document.getElementById("option_buttons"));
        this._showGameButtons(); 
        // regardless of if game was won or in stalemate, if we're resetting to an earlier timestep
        // then those messages should go away
        document.getElementById("winner_div").innerHTML = '';
        document.getElementById("stalemate_div").innerHTML = ''; 
        // clear all the divs in the state holder that occur after the current timestep
        // because if we've decided to reset, those should not exist 
        const state_holder = document.getElementById("states_holder");
        deleteChildrenGreater_EqualThanT(state_holder, e.target.getAttribute('timestep'));
    }


    _noResetToStateT() {
        // If we are choosing to not reset and play the game from timestep t
        // then we must restore the previous view of the grid for the states holder
        // and hide these two buttons 
        _setDisplayNone(document.getElementById("option_buttons"));
        _setDisplayBlock(document.getElementById("go_back"));
        _setDisplayGrid(document.getElementById("states_holder"));

        // We must also fill the board with the current grid status as we are not
        // considering going back to the previous state
        _insertO_X_intoGrid(this.props.curr_board_status);
        // need to recolor grid if there was originally a winner, we have to highlight those
        // cells again. Slightly inefficient but good tradeoff in order to avoid adding another
        // two quantities to state (didWin, winningLoc)
        const [didWin, winner, winningLoc] = checkIfWinner(this.props.curr_board_status);
        if (didWin) {
            _highlightWinningCells(winningLoc);
        }
    }


    render() {
        return(
            <div id = "button_loc">
                <div id = "button_holder">
                    <div id = "start" className = "buttons" onClick = {this.startGame}>Start Game</div>
                    <div id = "O" className = "buttons" onClick={this.chooseStyle}>Choose O</div>
                    <div id = "X" className = "buttons" onClick = {this.chooseStyle}>Choose X</div>
                    <div id = "reset" className = "buttons" onClick = {this._resetGame}>Reset Game</div>
                    <div id = "history" className = "buttons" onClick = {this._showGameHistory}>Show Game History</div>
                    <div id = "new_game" className = "buttons" onClick = {this._startNewGame}>Start New Game</div> 
                </div>
                <div id = "confirm_reset">
                    <h3>Are you sure?</h3>
                    <div id = "reset_buttons">
                        <div id = "reset_yes" className = "buttons" onClick={this._resetYes}>Yes</div>
                        <div id = "reset_no" className = "buttons" onClick = {this._resetNo}>No</div>            
                    </div>
                </div>

                <div id = "confirm_newgame">
                    <h3>Are you sure?</h3>
                    <div id = "newgame_buttons">
                        <div id = "newgame_yes" className = "buttons" onClick = {this._newGameYes}>Yes</div>
                        <div id = "newgame_no" className = "buttons" onClick = {this._newGameNo}>No</div>            
                    </div>
                </div>

                <div id = "state_through_time">
                    <div id = "go_back" className = "buttons" onClick = {this._goBack}>Go Back</div>
                    <div id = "states_holder">
                    </div>
                    <div id = "option_buttons">
                            <h3 id = "timestep_descr"></h3>
                            <div id = "go_back_yes" className = "buttons" onClick = {this._resetToStateT}>Start playing from this time onward?</div>
                            <div id = "go_back_no" className = "buttons" onClick = {this._noResetToStateT}>Back to list of timestates</div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Buttons;