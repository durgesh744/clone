import {combineReducers} from 'redux';
import {CLEAN_STORE} from '../actionTypes/actionTypes';
import user from './user';
import kundli from './kundli';

const rootReducer = combineReducers({
  user,
  kundli
});

const appReducer = (state, action) => {
  if (action.type == CLEAN_STORE) {
    state = undefined;
  }
  return rootReducer(state, action);
};

export default appReducer;
