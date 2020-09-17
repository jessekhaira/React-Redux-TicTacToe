import updateBoardReducer from './updateBoardReducer';
import goBackReducer from './goBackReducer';
import changeGameStatusReducer from './changeGameStatusReducer';
import resetGameReducer from './resetGameReducer';
import newGameReducer from './newGameReducer'; 
import {UPDATE_BOARD, GO_BACK, t_0_state, CHANGE_GAME_STATUS, RESET, NEWGAME} from './reducerConstants'

const INIT_STATE = {
    0: t_0_state
};


function rootReducer(state = INIT_STATE, action) {
    switch (action.type) {
        case UPDATE_BOARD:
            return updateBoardReducer(state, action);

        case GO_BACK:
            return goBackReducer(state, action);
        
        case CHANGE_GAME_STATUS:
            return changeGameStatusReducer(state, action); 

        case RESET:
            return resetGameReducer(state);

        case NEWGAME:
            return newGameReducer(state);

        default:
            return state;
    }
}


export {rootReducer};