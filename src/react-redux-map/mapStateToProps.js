 /**
  * Map the state object managed by the Redux store to 
  * @param {object} state 
  * @param {String[][]} state.curr_board_status
  * @param {String} state.curr_turn
  * @returns {object} Object mapping the state to immutable props that can be passed into
  * React components
  */
 function mapStateToProps(state) {
    // the current state is going to be the current time step
    // only hashing in values from 0 to state.length-1
    const curr_t = Object.keys(state).length-1;
    return {
        curr_board_status: state[curr_t].curr_board_status,
        curr_turn: state[curr_t].current_turn,
        game_state: state[curr_t].game_state,
        time_step: curr_t
    }
}

export {mapStateToProps};