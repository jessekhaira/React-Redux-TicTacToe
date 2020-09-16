import updateBoardReducer from './updateBoardReducer';
import goBackReducer from './goBackReducer';
import changeGameStatusReducer from './changeGameStatusReducer';
import {UPDATE_BOARD, GO_BACK, t_0_state, CHANGE_GAME_STATUS} from './reducerConstants'

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

        default:
            return state;
    }
}


export {rootReducer};