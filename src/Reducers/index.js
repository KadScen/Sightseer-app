import subNavLocation from './subNav';
import isLogged from "./isLogged";
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    subNavLoc : subNavLocation,
    isLogged
})

export default allReducers; 