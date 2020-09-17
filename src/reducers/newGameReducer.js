export default (state, action) => {
    const newstate = {};
    newstate[0] = JSON.parse(JSON.stringify(state[0]));
    newstate[0].current_turn = '';
    newstate[0].game_state = 'PAUSED';
    return newstate; 
}