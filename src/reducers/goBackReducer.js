import {STARTED} from './reducerConstants';

export default function(state, action) {
    const new_state = JSON.parse(JSON.stringify(state));
    // deleting all the timesteps from t onwards if we're going to start
    // playing from the previous timestep. Otherwise, just return the state as it is
    // no need to delete 
    let to_delete_t = Number(action.to_timestep)+1;
    while (true) {
        if (new_state[to_delete_t] === undefined) {
            break;
        }
        delete new_state[to_delete_t];
        to_delete_t++;
    }
    new_state[Object.keys(new_state).length-1]['game_state'] = STARTED; 
    return new_state;
}