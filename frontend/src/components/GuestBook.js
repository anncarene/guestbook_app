import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Pagination from './Pagination';
import Notes from './Notes';
import InsertForm from './forms/InsertForm';
import {
	setPage,
	getMessages
} from '../actions/userMessageActions'


const GuestBook = ({
	setPageAction,
	isInserting,
	...props
}) => (
	<div id="wrapper">
		<h1>Гостевая книга</h1>
		<Pagination 
			setPageAction={setPageAction}
			isInserting={isInserting}
			{...props}
		/>
		<Notes {...props} />
		<InsertForm 
			timeUntilDismissed={4} 
			setPageAction={setPageAction}
			isInserting={isInserting}
			{...props}
		/>
	</div>
);

GuestBook.propTypes = {
	setPageAction: PropTypes.func.isRequired,
	getMessagesAction: PropTypes.func.isRequired,
	pageId: PropTypes.number.isRequired,
	notesOnPage: PropTypes.number.isRequired,
	isInserting: PropTypes.bool.isRequired,
	isFetched: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
	pageId: store.userMessages.pageId,
	notesOnPage: store.userMessages.notesOnPage,
	isInserting: store.userMessages.isInserting,
	isFetched: store.userMessages.isFetched,
});

const mapDispatchToProps = dispatch => ({
	setPageAction: (pageId) => dispatch(setPage(pageId)),
	getMessagesAction: (pageId, notesOnPage, isBackground) => 
		dispatch(getMessages(pageId, notesOnPage, isBackground)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GuestBook);