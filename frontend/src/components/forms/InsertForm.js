import React, {
	useState,
	useEffect
} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import "bootstrap3/dist/css/bootstrap.min.css";
import {
	insertMessage,
	toggleRedirect,
	hideInsertAlert,
} from '../../actions/userMessageActions';
import InsertAlert from './InsertAlert';

const InsertForm = ({
	getMessagesAction,
	insertMessageAction,
	toggleRedirectAction,
	setPageAction,
	hideInsertAlertAction,

	timeUntilDismissed,
	pageId,
	notesOnPage,

	redirectToFirst,
	visibleSuccessAlert,
	visibleErrorAlert,
	isInserting,
	isFetched
}) => {
	const [visible, setVisible] = useState(false);

	const [nameValue, setNameValue] = useState('');
	const [messageValue, setMessageValue] = useState('');

	const [theme, setTheme] = useState('');
	const [title, setTitle] = useState('');

	const handleChange = e => {
		e.target.name === 'name' ? 
			setNameValue(e.target.value) :	
			setMessageValue(e.target.value);
	}

	const handleSubmit = e => {
		e.preventDefault();

		if (redirectToFirst) {
			setPageAction(1);
		}

		insertMessageAction(
			e.target['message'].value,
			e.target['name'].value, 
		);

		getMessagesAction(
			pageId,
			notesOnPage
		);
	}

	useEffect(() => {
		async function showAlert() {
			setVisible(true);

			let timeout = null;

			await new Promise ((resolve, reject) => {
				timeout = setTimeout(
					() => {
						setVisible(false);
						hideInsertAlertAction();
						resolve(null);
					},
					timeUntilDismissed * 1000
				);
			});

			clearTimeout(timeout);
		}

		if (visibleSuccessAlert || visibleErrorAlert) {
			if (visibleErrorAlert) {
				setTheme('alert-danger');
				setTitle('Не удалось сохранить запись');
			} else if (visibleSuccessAlert) {
				setMessageValue('');

				setTheme('alert-info');
				setTitle('Запись успешно сохранена');
			}

			showAlert();
		}	
	}, [
		visibleSuccessAlert,
		visibleErrorAlert,
	 	timeUntilDismissed, 
	 	hideInsertAlertAction
	]);

	return (
		<React.Fragment>
			<InsertAlert 
				visible={visible}
				theme={theme}
				title={title} 
			/>
			<form onSubmit={handleSubmit}>
				<p>
					<input 
						className="form-control"
						placeholder="Ваше имя"
						name="name"
						readOnly={isInserting || isFetched}
						value={nameValue}
						onChange={handleChange}
						required
					/>
				</p>
				<p>
					<textarea 
						className="form-control"
						placeholder="Ваше сообщение"
						name="message"
						readOnly={isInserting || isFetched }
						value={messageValue}
						onChange={handleChange}
						required
					/>
				</p>
				<div className="custom-control custom-toggle my-2">
					<input 
						id="toggleRedirect"
						type="checkbox"
						name="toggleRedirect"
						className="custom-control-input"
						style={{
							marginTop: '12px',
						}}
						checked={redirectToFirst}
						onChange={() => toggleRedirectAction()}
					/>
					<label 
						htmlFor="toggleRedirect"
						className="custom-control-label"	
					>
						Перенаправлять на первую страницу при отправке.
					</label>
				</div>
				<p style={{marginTop: '12px'}}>
					<input 
						type="submit"
						className="btn btn-info btn-block"
						value="Сохранить"
						disabled={isInserting || isFetched}
					/>
				</p>
			</form>
		</React.Fragment>	
	);
}

InsertForm.propTypes = {
	redirectToFirst: PropTypes.bool.isRequired,
	visibleSuccessAlert: PropTypes.bool.isRequired,
	visibleErrorAlert: PropTypes.bool.isRequired,
	isInserting: PropTypes.bool.isRequired,
	isFetched: PropTypes.bool.isRequired,
	pageId: PropTypes.number.isRequired,
	notesOnPage: PropTypes.number.isRequired,
	timeUntilDismissed: PropTypes.number.isRequired,
	setPageAction: PropTypes.func.isRequired,
	getMessagesAction: PropTypes.func.isRequired,
	insertMessageAction: PropTypes.func.isRequired,
	hideInsertAlertAction: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
	redirectToFirst: store.userMessages.redirectToFirst,
	visibleSuccessAlert: store.userMessages.visibleSuccessAlert,
	visibleErrorAlert: store.userMessages.visibleErrorAlert,
});

const mapDispatchToProps = dispatch => ({
	insertMessageAction: (message, name) =>
		dispatch(insertMessage(message, name)),
	toggleRedirectAction: () => 
		dispatch(toggleRedirect()),
	hideInsertAlertAction: () => 
		dispatch(hideInsertAlert()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InsertForm);