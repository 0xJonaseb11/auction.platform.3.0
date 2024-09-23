// client/src/redux/reducers/index.js
import { combineReducers } from 'redux';
import bidHistoryReducer from './bidHistoryReducer';

const rootReducer = combineReducers({
  bidHistory: bidHistoryReducer,
});

export default rootReducer;
