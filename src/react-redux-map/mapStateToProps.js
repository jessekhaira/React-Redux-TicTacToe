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
    // in order to access the board states from any given timestep
    // we need to give our components access to those board states 
    const all_board_statuses = {};
    for (const t of Object.keys(state)) {
        all_board_statuses[t] = JSON.parse(JSON.stringify(state[t].curr_board_status));
    }
    return {
        curr_board_status: state[curr_t].curr_board_status,
        curr_turn: state[curr_t].current_turn,
        game_state: state[curr_t].game_state,
        time_step: curr_t,
        all_board_statuses: all_board_statuses
    }
}

export {mapStateToProps};