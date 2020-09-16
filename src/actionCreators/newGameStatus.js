import {CHANGE_GAME_STATUS} from "../reducers/reducerConstants"
export default function(time_step, new_game_status, current_turn) {
    return {
        type: CHANGE_GAME_STATUS, 
        time_step: time_step,
        new_game_status: new_game_status,
        current_turn: current_turn
    }
}