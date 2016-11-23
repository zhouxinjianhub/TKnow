
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import { Nologin, Islogin } from "loginState";

import "../style/nav.less";


class Nav extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		let logo = ReactDOM.findDOMNode(this.refs.logo);
		logo.ondragstart=function (){return false;};
	}
	render() {
		return (
			<div className="nav">
				<div className="nav-box">
					<div className="nav-logo">
						<Link to={{ pathname: "/"}} >
							<img src="../../images/logo-white.png" ref="logo" title="映潮科技"/>
						</Link>
					</div>
					<ul>
						<li className={this.props.select_key == 1 ? "active" : ""}><Link to={{ pathname: "/regional"}} >地域</Link></li>
						<li className={this.props.select_key == 2 ? "active" : ""}><Link to={{ pathname: "/trade"}} >行业</Link></li>
						<li className={this.props.select_key == 3 ? "active" : ""}><Link to={{ pathname: "/info"}} >资讯</Link></li>
						<li className={this.props.select_key == 4 ? "active" : ""}><Link to={{ pathname: "/exponent"}} >映潮指数</Link></li>
						<li className={this.props.select_key == 5 ? "active" : ""}><Link to={{ pathname: "/about"}} >天玑</Link></li>
					</ul>
					{(() => {
						let userObj = $.userlogin();
						let result = userObj ? true : false;
						switch ( result ) {
							case true: return <Islogin userName={ userObj.userName }/>;
							default:   return <Nologin />;
						}
					})()}
				</div>
			</div>
		)
	}
}

module.exports = Nav