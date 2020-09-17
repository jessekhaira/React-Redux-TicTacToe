import {UPDATE_BOARD} from '../reducers/reducerConstants';

export default (update_info, time_step) => (
    {type:UPDATE_BOARD, time_step:time_step, update_info:update_info}
);