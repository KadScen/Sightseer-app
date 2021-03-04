import subNavLocation from './subNav';
import isLogged from './isLogged';
import imageInfos from './imageInfos';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    subNavLoc : subNavLocation,
    isLogged,
    imageInfos
})

export default allReducers; 