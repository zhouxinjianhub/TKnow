
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
		let checkedObj = [{
			name: '地域',
			url: '/regional'
		},{
			name: '行业',
			url: '/trade'
		},{
			name: '资讯',
			url: '/info'
		},{
			name: '映潮指数',
			url: '/exponent'
		},{
			name: '天玑',
			url: '/about'
		}]
		return (
			<div className="nav">
				<div className="nav-box">
					<div className="nav-logo">
						<Link to={{ pathname: "/"}} >
							<img src="./images/logo-white.png" ref="logo" title="映潮科技"/>
						</Link>
					</div>
					<ul>
						{
							checkedObj.map((data,k)=>{
								return <li className={this.props.select_key == k+1 ? "active" : ""}><Link to={{ pathname: data.url}} >{ data.name }</Link></li>
							})
						}
					</ul>
					{(() => {
						let userObj = $.userlogin();
						let result = userObj ? true : false;
						switch ( result ) {
							case true: return <Islogin user={ userObj }/>;
							default:   return <Nologin />;
						}
					})()}
				</div>
			</div>
		)
	}
}

module.exports = Nav