
import React from 'react';
import { Link, hashHistory } from 'react-router';

class Nologin extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="nav-login">
				<div className="nav-login-box">
					<Link to={{ pathname: "/login"}} >登录</Link>
					<span>/</span>
					<Link to={{ pathname: "/register"}} >注册</Link>
				</div>
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
				<div className="nav-login-box">
					<Link to={{ pathname: this.props.user.url}} >{this.props.user.account}</Link>
					<img src="./images/user.jpg" />
				</div>
				<p className="layout" onClick={$.laoutLogin.bind(this,()=>{hashHistory.push('/')},this.props.isIndex)}>退出</p>
			</div>
		)
	}
}

module.exports = {
	Nologin: Nologin,
	Islogin: Islogin
}