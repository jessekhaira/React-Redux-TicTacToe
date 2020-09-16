export default function(state, action) {
    const new_state = JSON.parse(JSON.stringify(state));
    // deleting all the timesteps from t onwards
    let to_delete_t = action.to_timestep+1;
    while (true) {
        if (new_state[to_delete_t] === undefined) {
            break;
        }
        delete new_state[to_delete_t];
        to_delete_t++;
    }
    return new_state;
}