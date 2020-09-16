import {UPDATE_BOARD} from '../reducers/reducerConstants';

export default function(update_info, time_step) {
    return {
        type: UPDATE_BOARD, 
        time_step: time_step,
        update_info: update_info
    }
}