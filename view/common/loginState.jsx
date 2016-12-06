
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
				<Link to={{ pathname: "/register"}} >注册</Link>
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
				<Link to={{ pathname: this.props.user.url}} >{this.props.user.account}</Link>
				<img src="../../images/user.jpg" />
			</div>
		)
	}
}

module.exports = {
	Nologin: Nologin,
	Islogin: Islogin
}