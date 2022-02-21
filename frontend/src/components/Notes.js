import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {removeMessages} from '../actions/userMessageActions';

class Notes extends React.Component {
	componentDidMount() {
		this.props.getMessagesAction(
			this.props.pageId,
			this.props.notesOnPage,
			false
		);
	}

	componentWillUnmount() {
		this.props.removeMessagesAction();
	}

	render() {
		return (
			<div 
				className="notes"
				style={{
					position: 'relative',
					width: '100%',
				}}
			>
				{this.props.list.length !== 0 ? (
					<React.Fragment>
						{this.props.list.map((note) => (
							<div
								className="note" 
								key={note.id}
								style={{
									opacity: 1
								}}
							>
								<p>
									<span className="date">{note.date}</span> {' '}
									<span className="name">{note.name}</span> {' '}
								</p>
								<p>
									{note.message}
								</p>
							</div>
						))}
					</React.Fragment>
				) : (
					<div style={{
						textAlign: 'center',
						color: '#888',
						opacity: 1,
					}}>
						Здесь пока нет записей.
					</div>
				)}
			</div>
		);
	}
}

Notes.propTypes = {
	list: PropTypes.array.isRequired,
	pageId: PropTypes.number.isRequired,
	notesOnPage: PropTypes.number.isRequired,
	getMessagesAction: PropTypes.func.isRequired,
	removeMessagesAction: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
	list: store.userMessages.list,
});

const mapDispatchToProps = dispatch => ({
	removeMessagesAction: () => 
		dispatch(removeMessages()),	
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Notes);