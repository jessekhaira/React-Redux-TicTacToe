export default function(state, action) {
    const new_state = JSON.parse(JSON.stringify(state));
    const time_step = action.time_step;
    const new_game_status = action.new_game_status;
    const current_turn = action.current_turn; 
    new_state[time_step]["game_state"] = new_game_status;
    new_state[time_step]["current_turn"] = current_turn; 
    return new_state; 
}