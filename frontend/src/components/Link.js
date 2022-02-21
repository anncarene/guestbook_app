import React from 'react';
import PropTypes from 'prop-types';

const Link = ({
	onClick,
	title,
	to,
	isDisabled,
	isActive
}) => {
	const disabled = isDisabled ? 'disabled' : '';

	return (
		<li className={`page-item ${disabled}`}>
			<span
				className='page-link'
				style={
					isActive ? {
						color: '#fff',
						backgroundColor: '#007bff',
						borderColor: '#007bff',
					} : {
						display: 'block',
					}
				}
				onClick={onClick}
			>
				{title}
			</span>
		</li>
	);
}

Link.defaultProps = {
	isDisabled: false,
	isActive: false,
}

Link.propTypes = {
	onClick: PropTypes.func.isRequired,
	title: PropTypes.node.isRequired,
	isDisabled: PropTypes.bool,
	isActive: PropTypes.bool,
};

export default Link;