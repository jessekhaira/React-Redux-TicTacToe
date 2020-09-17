import update_board from '../actionCreators/update_board';
import go_back_state from '../actionCreators/goBack';  
import newGameStatus from '../actionCreators/newGameStatus';
import resetGame from '../actionCreators/resetGame';
import startNewGame from '../actionCreators/startNewGame';
/**
 * Maps the dispatch function to props that components can access.
 */
function mapDispatchToProps(dispatch) {
    return {
        update_board: (update_info, time_step) => dispatch(update_board(update_info, time_step)),
        go_back_state: (t) => dispatch(go_back_state(t)),
        update_game_status: (t, new_game_status, current_turn) => dispatch(newGameStatus(t, new_game_status, current_turn)),
        resetGame: () => dispatch(resetGame()),
        startNewGame: () => dispatch(startNewGame()) 
    }
}

export {mapDispatchToProps};