import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';//
import {Provider} from 'react-redux';
import rootReducer from './reducers/index';
import App from './App';

const logger = createLogger({
	collapsed: true,
});

const store = createStore(
	rootReducer,
	applyMiddleware(thunk, logger)
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);