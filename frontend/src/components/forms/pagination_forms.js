import React from 'react';
import PropTypes from 'prop-types';
 
class PagForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isInvalid: false,
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		
		const name = this.props.name;

		const condition = name === 'pageId' ?
			(+e.target[name].value <= 0 || +e.target[name].value > this.props.pages) : 			
			+e.target[name].value <= 0;

		if (condition) {
			this.setState({isInvalid: true});
			return;
		} else {
			this.setState({isInvalid: false});
		}

		this.props.realizes(+e.target[name].value);

		if (this.props.additionallyRealizes.length > 0) {
			for (let i = 0; i < this.props.additionallyRealizes.length; i++) {
				this.props.additionallyRealizes[i]();
			}
		}

	}

	render() {
		const isInvalid = this.state.isInvalid ? 'is-invalid' : '';

		const readonly = this.props.isFetched || this.props.isInserting;

		return(
			<form onSubmit={this.handleSubmit}>
				<p>
					<input 
						type="number" 
						placeholder={this.props.placeholder}
						className={`form-control ${isInvalid}`}
						name={this.props.name}
						required
						readOnly={readonly}
					/>
				</p>
				<p>
					<input
						type="submit"
						className="btn btn-info btn-block"
						value={this.props.submitValue}
						readOnly={readonly}
					/>
				</p>
			</form>
		);
	}
}

PagForm.defaultProps = {
	additionallyRealizes: [],
}

PagForm.propTypes = {
	realizes: PropTypes.func.isRequired,
	additionallyRealizes: PropTypes.array,
	placeholder: PropTypes.string.isRequired,
	submitValue: PropTypes.string.isRequired,
	pages: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
}

export default PagForm;