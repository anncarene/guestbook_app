import React from 'react';
import PropTypes from 'prop-types';
import "bootstrap3/dist/css/bootstrap.min.css";
import './InsertAlert.css';

const InsertAlert = ({
	visible,
	theme,
	title
}) => {
	return (
		<div className="alert-container">
			<div 
				className={"alert " + theme + (!visible ? " alert-transparent" : "")}
			>
				{title}
			</div>
		</div>
	);
}

InsertAlert.propTypes = {
	visible: PropTypes.bool.isRequired,
	theme: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
}

export default InsertAlert;