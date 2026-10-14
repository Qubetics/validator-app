import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducer/auth';
import drawerReducer from './reducer/drawer';

const combinedReducer = combineReducers({
  auth: authReducer,
  drawer: drawerReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'drawer/logout') {
    state = undefined;
    localStorage.clear();
  }
  return combinedReducer(state, action);
};

export default rootReducer;
