const INIT_BOARD_STATE = [];
for (let i=0; i<3; i++) {
    INIT_BOARD_STATE.push(Array(3).fill(''));
}

const UPDATE_BOARD = "UPDATE_BOARD";
const GO_BACK = "GO_BACK";
const CHANGE_GAME_STATUS = "CHANGE_GAME_STATUS";
const RESET = "RESET";
const NEWGAME = "NEW_GAME";
// Game states 
const STARTED = "STARTED";
const PAUSED = "PAUSED"; 
const GAME_WON = "GAME_WON";
const STALEMATE = "STALEMATE";

const t_0_state = {
    current_turn: '',
    curr_board_status: INIT_BOARD_STATE,
    game_state: PAUSED
}

export {UPDATE_BOARD, GO_BACK, t_0_state, STARTED, PAUSED, CHANGE_GAME_STATUS,RESET,
     NEWGAME, GAME_WON, STALEMATE}; 