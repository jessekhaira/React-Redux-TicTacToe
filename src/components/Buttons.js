import React from 'react';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import {STARTED, PAUSED} from '../reducers/reducerConstants';

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
        const buttons = Array.from(document.getElementsByClassName("buttons"));
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

        this._setDisplayNone(O_button, X_button);
        this._setDisplayBlock(reset_button, history_button);

        // Game status has changed to start if we have clicked the start button and chosen a style
        // so dispatch action to store to update the state
        this.props.update_game_status(0, STARTED, chosenStyle);
    }

    _setDisplayNone(...args) {
        args.forEach((x) => x.style.display = "none");
    }

    _setDisplayBlock(...args) {
        args.forEach((x) => x.style.display = "block");
    }

    render() {
        return(
            <div id = "button_holder">
                <div id = "start" class = "buttons" onClick = {this.startGame}>Start Game</div>
                <div id = "O" class = "buttons" onClick={this.chooseStyle}>Choose O</div>
                <div id = "X" class = "buttons" onClick = {this.chooseStyle}>Choose X</div>
                <div id = "reset" class = "buttons">Reset Game</div>
                <div id = "history" class = "buttons">Show Game History</div>
            </div>
        )
    }
}

export default Buttons;