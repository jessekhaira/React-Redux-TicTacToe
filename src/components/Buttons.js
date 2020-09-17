import React from 'react';
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
    }

    componentDidMount() {
        // component mounted for first time, we want only the start button to be available
        // no other button 
        this._initDisplay();
    }


    /**
     * This function is a private method used to initialize the display, hiding all the 
     * buttons except for the start button to begin off with. 
     * 
     * @return {null} The method returns nothing, as it just changes the display style of the buttons.
     * @method
     * @public
     */
    _initDisplay() {
        const buttons = Array.from(document.getElementById("button_holder").children);
        buttons.forEach((x) => {
            let val = (x.id === "start" ? "block":"none");
            x.style.display = val; 
        })
    }

    startGame(e) {
        const O_button = document.getElementById("O");
        const X_button = document.getElementById("X");
        this._setDisplayNone(e.target);
        this._setDisplayBlock(O_button, X_button);
    }

    chooseStyle(e) {
        const chosenStyle = e.target.id;
        const O_button = document.getElementById("O");
        const X_button = document.getElementById("X");
        const reset_button = document.getElementById("reset");
        const history_button = document.getElementById("history");
        const new_game = document.getElementById("new_game");

        this._setDisplayNone(O_button, X_button);
        this._setDisplayBlock(reset_button, history_button, new_game);

        // Game status has changed to start if we have clicked the start button and chosen a style
        // so dispatch action to store to update the state
        this.props.update_game_status(this.props.time_step, STARTED, chosenStyle);
    }

    _setDisplayNone(...args) {
        args.forEach((x) => x.style.display = "none");
    }

    _setDisplayBlock(...args) {
        args.forEach((x) => x.style.display = "block");
    }

    _hideGameButtons() {
        const reset_button = document.getElementById("reset");
        const history_button = document.getElementById("history");
        const new_game = document.getElementById("new_game");
        this._setDisplayNone(reset_button, history_button, new_game);
    }

    _showGameButtons() {
        const reset_button = document.getElementById("reset");
        const history_button = document.getElementById("history");
        const new_game = document.getElementById("new_game");
        this._setDisplayBlock(reset_button, history_button, new_game);
    }


    _turnOffWinnerStalemate() {
        const winner = document.getElementById('winner_div');
        const stalemate = document.getElementById('stalemate_div');
        this._setDisplayNone(winner, stalemate);
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
        this._setDisplayNone(confirm_reset);
    }

    _resetNo() {
        // If we're not resetting and game state is won or stalemate, then keep that game state the same
        // otherwise, start game back up again 
        this.props.update_game_status(this.props.time_step, this._updateGameState(STARTED), this.props.curr_turn);
        this._showGameButtons();
        const confirm_reset = document.getElementById("confirm_reset");
        this._setDisplayNone(confirm_reset);
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
        this._setDisplayNone(confirm_newgame);
        this._setDisplayBlock(startbutton);
    }

    _newGameNo() {
        // If we're not resetting and game state is won or stalemate, then keep that game state the same
        // otherwise, start game back up again 
        this.props.update_game_status(this.props.time_step, this._updateGameState(STARTED), this.props.curr_turn);
        this._showGameButtons();
        const confirm_newgame = document.getElementById("confirm_newgame");
        this._setDisplayNone(confirm_newgame);
    }

    render() {
        return(
            <div id = "button_loc">
                <div id = "button_holder">
                    <div id = "start" className = "buttons" onClick = {this.startGame}>Start Game</div>
                    <div id = "O" className = "buttons" onClick={this.chooseStyle}>Choose O</div>
                    <div id = "X" className = "buttons" onClick = {this.chooseStyle}>Choose X</div>
                    <div id = "reset" className = "buttons" onClick = {this._resetGame}>Reset Game</div>
                    <div id = "history" className = "buttons">Show Game History</div>
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
            </div>
        )
    }
}

export default Buttons;