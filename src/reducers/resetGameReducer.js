export default function(state) {
    // reset state back to t = 0 state
    const new_state = {0:[]};
    new_state[0] = JSON.parse(JSON.stringify(state[0]));
    new_state[0].game_state = "STARTED";
    return new_state; 
}