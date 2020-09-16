export default function(state, action) {
    // in addition to copying the top level, you have to make copies of 
    // each of the objects at every time step (deep copy)
    const new_state = JSON.parse(JSON.stringify(state));
    const curr_t = action.time_step;
    // state[t] -> {board:[[]], current_turn:'O/x'} -> so have to deep copy
    // object at the prev t as well when making new t
    new_state[curr_t+1] = JSON.parse(JSON.stringify(state[curr_t]));
    // update_info = [row,col, 'O'|'X']
    const [row,col, val] = action.update_info;
    new_state[curr_t+1].curr_board_status[row][col] = val;
    new_state[curr_t+1]["current_turn"] = (val === 'O' ? 'X':'O');
    return new_state; 
}