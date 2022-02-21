import axios from 'axios';
import qs from 'qs';

const delay = async () => {
	let timeout = null;

	await new Promise((resolve, reject) => {
		timeout = setTimeout(() => resolve(null), 500);
	});
	
	clearTimeout(timeout);
}
 
export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_ERROR = 'GET_MESSAGES_ERROR';
export const INSERT_MESSAGE_REQUEST = 'INSERT_MESSAGE_REQUEST';
export const INSERT_MESSAGE_SUCCESS = 'INSERT_MESSAGE_SUCCESS';
export const INSERT_MESSAGE_ERROR = 'INSERT_MESSAGE_ERROR';
export const HIDE_INSERT_ALERT = 'HIDE_INSERT_ALERT';
export const REMOVE_MESSAGES = 'REMOVE_MESSAGES';
export const SET_PAGE = 'SET_PAGE';
export const SET_NOTES_ON_PAGE = 'SET_NOTES_ON_PAGE';
export const TOGGLE_REDIRECT = 'TOGGLE_REDIRECT';

const HOST = 'http://127.0.0.1:8000';

export function getMessages(pageId, notesOnPage, isBackground = false) {
	return async dispatch => {
		dispatch({
			type: GET_MESSAGES_REQUEST,
			payload: !isBackground,
		});
		await delay();

		const options = {
			method: 'GET',
			url: `${HOST}/api/messages/notesOnPage/${notesOnPage}/pageId/${pageId}`,
		};

		axios(options)
			.then(response => {
				if (response.status !== 200) throw response;

				for (let message of response.data.messages) {
					message.date = message.date.replace(/-/g, ".");
				}

				dispatch({
					type: GET_MESSAGES_SUCCESS,
					payload: {
						messages: response.data.messages,
						pages: response.data.pages,
					}
				});
			})
			.catch(error => {
				dispatch({
					type: GET_MESSAGES_ERROR,
					payload: error,
				});
			});	
	}
}

export function insertMessage(
	message,
	name,
) {
	return async dispatch => {
		dispatch({
			type: INSERT_MESSAGE_REQUEST,
		});

		const data = {message, name};
		const options = {
			method: 'POST',
			data: qs.stringify(data),
			url: `${HOST}/api/messages`,
		}

		await delay();

		axios(options)
			.then(response => {
				if (response.status !== 200) throw response;

				dispatch({
					type: INSERT_MESSAGE_SUCCESS,
				});

			})
			.catch(error => {
				dispatch({
					type: INSERT_MESSAGE_ERROR,
					payload: error
				});
			});			
	};
}

export function removeMessages() {
	return dispatch => {
		dispatch({
			type: REMOVE_MESSAGES,
		});
	}
}

export function setPage(pageId) {
	return dispatch => {
		dispatch({
			type: SET_PAGE,
			payload: pageId,
		});
	}
}

export function setNotesOnPage(value) {
	return dispatch => {
		dispatch({
			type: SET_NOTES_ON_PAGE,
			payload: value,
		});
	}
}

export function toggleRedirect() {
	return dispatch => {
		dispatch({
			type: TOGGLE_REDIRECT,
		});
	}
}

export function hideInsertAlert() {
	return dispatch => {
		dispatch({
			type: HIDE_INSERT_ALERT,
		});
	}
}