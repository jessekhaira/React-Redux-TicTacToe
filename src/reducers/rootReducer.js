const INIT_BOARD_STATE = [];
for (let i=0; i<3; i++) {
    INIT_BOARD_STATE.push(Array(3).fill(''));
}

const INIT_TURN = '';

const INIT_STATE = {
    current_turn: INIT_TURN,
    curr_board_status: INIT_BOARD_STATE
}

const INIT_STATE_THROUGH_TIME = INIT_STATE;

function rootReducer(state = INIT_STATE_THROUGH_TIME, action) {
    
}