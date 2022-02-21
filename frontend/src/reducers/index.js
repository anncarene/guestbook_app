import {combineReducers} from 'redux';
import {userMessageReducer} from './userMessages';

const rootReducer = combineReducers({
	userMessages: userMessageReducer,
});

export default rootReducer;