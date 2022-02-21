import {
	INSERT_MESSAGE_REQUEST,
	INSERT_MESSAGE_SUCCESS,
	INSERT_MESSAGE_ERROR,
	HIDE_INSERT_ALERT,
	GET_MESSAGES_REQUEST,
	GET_MESSAGES_SUCCESS,
	GET_MESSAGES_ERROR,
	REMOVE_MESSAGES,
	SET_PAGE,
	SET_NOTES_ON_PAGE,
	TOGGLE_REDIRECT
} from '../actions/userMessageActions.js';

export const initialState = {
	list: [],
	pages: 1,
	pageId: 1, 
	notesOnPage: 5,
	redirectToFirst: false,
	error: null,
	isFetched: false,
	isInserting: false,
	visibleSuccessAlert: false,
	visibleErrorAlert: false,
};

export function userMessageReducer(state = initialState, action) {
	switch (action.type) {
		case INSERT_MESSAGE_REQUEST:
			return {
				...state,
				isInserting: true,
				error: null,
			};
		case INSERT_MESSAGE_SUCCESS:
			return {
				...state,
				isInserting: false,
				visibleSuccessAlert: true,
				error: null,
			}
		case INSERT_MESSAGE_ERROR:
			return {
				...state,
				isInserting: false,
				visibleErrorAlert: true,
				error: action.payload,
			}
		case HIDE_INSERT_ALERT:
			return {
				...state,
				visibleErrorAlert: false,
				visibleSuccessAlert: false,
			}	
		case GET_MESSAGES_REQUEST:
			return {
				...state,
				isFetched: action.payload,
				error: null,
			}
		case GET_MESSAGES_SUCCESS:
			return {
				...state,
				isFetched: false,
				list: action.payload.messages,
				pages: action.payload.pages,
				error: null,
			}
		case GET_MESSAGES_ERROR:
			return {
				...state,
				isFetched: false,
				error: action.payload,
			}
		case REMOVE_MESSAGES:
			return {
				...state,
				list: [],
			}
		case SET_PAGE:
			return {
				...state,
				pageId: action.payload,
				error: null,
			}
		case SET_NOTES_ON_PAGE:
			return {
				...state,
				notesOnPage: action.payload,
				error: null,
			}
		case TOGGLE_REDIRECT:
			return {
				...state,
				redirectToFirst: !state.redirectToFirst,
			}		
		default:
			return state;						
	}
}