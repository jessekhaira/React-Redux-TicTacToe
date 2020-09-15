import React from 'react';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';

/**
 * This class represents a React component and renders and controls all the buttons for the game.
 * 
 * @class
 * @public
 */
class Buttons extends React.Component {
    constructor(props) {
        super(props);
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
        console.log(e.target);
        e.target.style.display = "none";
        document.getElementById("O").style.display = "block";
        document.getElementById("X").style.display = "block";
    }

    chooseStyle(e) {
        
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