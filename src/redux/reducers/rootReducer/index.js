import {combineReducers} from 'redux';
import grocReducer from '../grocReducer';

export const rootReducer = combineReducers({
  grocRed: grocReducer,
});
