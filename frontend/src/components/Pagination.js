import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import "bootstrap3/dist/css/bootstrap.min.css";
import PagForm from './forms/pagination_forms.js';
import Link from './Link';
import {setNotesOnPage} from '../actions/userMessageActions';

const Pagination = ({
	pages,
	pageId,
	notesOnPage,
	isInserting,
	isFetched,
	setPageAction,
	setNotesOnPageAction,
	getMessagesAction,
}) => {
	useEffect(() => {
		if (
			!isInserting &&  
			!isFetched
		) {
			const interval = setInterval(
				() => {
					getMessagesAction(pageId, notesOnPage, true);
				}, 5000
			);

			return () => {
				clearInterval(interval);
			};
		}
	})
	
	useEffect(() => {
		getMessagesAction(pageId, notesOnPage, false);
	}, [
		pageId,
		notesOnPage,
		getMessagesAction
	]);
	
	const title = pages > 3 ? '...' : '2';
	const middlePage = Math.ceil((pages + 1) / 2); 
	const firstLinkTo = pageId === 1 ? 1 : pageId - 1;
	const lastLinkTo = pageId === pages ? pages : pageId + 1;

	return (
		<div id="pag">
			<PagForm 
				placeholder={'Количество записей на странице'}
				submitValue={'Задать'}
				realizes={setNotesOnPageAction}
				additionallyRealizes={[
					() => setPageAction(1)
					]}
				pages={pages}
				name="notesOnPage"
				isFetched={isFetched}
				isInserting={isInserting}
			/>
			<PagForm 
				placeholder={'Номер страницы'}
				submitValue={'Перейти'}
				realizes={setPageAction}
				pages={pages}
				name="pageId"
				isFetched={isFetched}
				isInserting={isInserting}
			/>
			<nav>
				<ul className="pagination">
					<Link
						onClick={() => setPageAction(firstLinkTo)}
						title="&lt;"
						isDisabled={pageId === 1}
					/>
					<Link 
						onClick={() => setPageAction(1)}
						title="1"
						isActive={pageId === 1}
					/>
					{pages >= 2 ? (
						<Link 
							onClick={() => setPageAction(middlePage)}
							title={title}
							isActive={
								(pageId > 1 && pageId < pages) ||
								(pages === 2 && pageId === 2)
							}
						/>
					) : (false)}
					{pages >= 3 ? (
						<Link 
							onClick={() => setPageAction(pages)}
							title={`${pages}`}
							isActive={pageId === pages}
						/>
					) : (false)}
					<Link 
						onClick={() => setPageAction(lastLinkTo)}
						to={`/notes-${notesOnPage}/pages/${pageId + 1}`}
						title="&gt;"
						isDisabled={pageId === pages}
					/>
				</ul>
			</nav>
		</div>
	);
}

Pagination.propTypes = {
	pages: PropTypes.number.isRequired,
	pageId: PropTypes.number.isRequired,
	notesOnPage: PropTypes.number.isRequired,
	setPageAction: PropTypes.func.isRequired,
	setNotesOnPageAction: PropTypes.func.isRequired,
	getMessagesAction: PropTypes.func.isRequired,
	isInserting: PropTypes.bool.isRequired,
	isFetched: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
	pages: store.userMessages.pages, 
});

const mapDispatchToProps = dispatch => ({
	setNotesOnPageAction: (value) =>
		dispatch(setNotesOnPage(value)),	
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Pagination);