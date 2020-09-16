import {GO_BACK} from '../reducers/reducerConstants';

export default function(to_timestep) {
    return {
        type: GO_BACK,
        to_timestep: to_timestep
    };
};