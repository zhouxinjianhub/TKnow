
import React from 'react';
import { Link } from 'react-router';
import "./login.less";

class ContainerLogin extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log('login');
		console.log(this.props);
	}
	render() {
		return (
			<div className="container-login">
			   login
			   <Link to="/search" >to search2</Link>
			</div>
		)
	}
}

module.exports = ContainerLogin