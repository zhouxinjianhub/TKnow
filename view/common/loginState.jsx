
import React from 'react';
import { Link } from 'react-router';

class Nologin extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="nav-login">
				<Link to={{ pathname: "/login"}} >登录</Link>
				<span>/</span>
				<Link to={{ pathname: "/login"}} >注册</Link>
			</div>
		)
	}
}

class Islogin extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="nav-login">
				<Link to={{ pathname: "/login"}} >{this.props.userName}</Link>
				<img src="../../images/user.jpg" />
			</div>
		)
	}
}

module.exports = {
	Nologin: Nologin,
	Islogin: Islogin
}