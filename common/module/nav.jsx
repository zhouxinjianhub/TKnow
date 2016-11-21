
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
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
				<div className="nav-bg"></div>
				<div className="nav-logo">
					<Link to={{ pathname: "/"}} >
						<img src="../../images/logo.jpg" ref="logo" title="映潮科技"/>
					</Link>				
				</div>
				<ul>
					<li className={this.props.select_key == 1 ? "active" : ""}><Link to={{ pathname: "/regional"}} >地域</Link></li>
					<li className={this.props.select_key == 2 ? "active" : ""}><Link to={{ pathname: "/trade"}} >行业</Link></li>
					<li className={this.props.select_key == 3 ? "active" : ""}><Link to={{ pathname: "/info"}} >资讯</Link></li>
					<li className={this.props.select_key == 4 ? "active" : ""}><Link to={{ pathname: "/exponent"}} >映潮指数</Link></li>
					<li className={this.props.select_key == 5 ? "active" : ""}><Link to={{ pathname: "/about"}} >天玑</Link></li>
				</ul>
				<div className="nav-login">
					<Link to={{ pathname: "/login"}} >登录/注册</Link>
				</div>
			</div>
		)
	}
}

module.exports = Nav