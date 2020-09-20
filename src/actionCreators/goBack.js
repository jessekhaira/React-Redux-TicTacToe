import {GO_BACK} from '../reducers/reducerConstants';

export default (to_timestep, del) => ({
    type: GO_BACK,
    to_timestep: to_timestep
});