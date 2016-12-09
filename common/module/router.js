
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';

import "../../dist/common.js"; 				// 公用js包
import "../../dist/getViewData.js";			// ajax请求包

import '../style/common.less';

import Index from "../../view/index/index";			// 首页
import Login from "../../view/login/login";			// 登录
import Register from "../../view/login/register";	//注册
import Forget from "../../view/login/forget";		//忘记密码
import Regional from "../../view/regional/regional";// 地域
import Trade from "../../view/trade/trade";			// 行业
import Info from "../../view/info/info";			// 咨讯
import Aboutme from "../../view/aboutme/index";		// 关于我们

import Exponent_free from "../../view/exponent_free/free";	// 未付费版映潮指数
import Exponent_pay from "../../view/exponent_pay/pay";	// 付费版映潮指数

import About from "../../view/about/about";			// 关于（天玑）
import User from "../../view/user/user";			// 个人中心
import Nav from 'nav';
import Footer from 'footer';


class IndexComponent extends React.Component {
	render() {
		return (
			<div className="content">
				<Index parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}

class RegionalComponent extends React.Component {
	render() {
		return (
			<div className="content">
				<Nav select_key={1}/>
				<Regional parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}

class TradeComponent extends React.Component {
	render() {
		return (
			<div className="content">
				<Nav select_key={2}/>
				<Trade parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}

class InfoComponent extends React.Component {
	render() {
		return (
			<div className="content">
				<Nav select_key={3}/>
				<Info parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}

class ExponentFreeComponent extends React.Component {
	render() {
		return (
			<div className="content">
				<Nav select_key={4}/>
				<Exponent_free parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}

class ExponentPayComponent extends React.Component {
	render() {
		return (
			<div className="content">
				<Nav select_key={4}/>
				<Exponent_pay parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}

class AboutComponent extends React.Component {
	render() {
		return (
			<div className="content">
				<Nav select_key={5}/>
				<About parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}

class AboutMeComponent extends React.Component {
	render() {
		return (
			<div className="content">
				<Nav />
				<Aboutme parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/index" component={ IndexComponent }/>
		<Route path="/login" component={ Login }/>
		<Route path="/register" component={ Register }/>
		<Route path="/forget" component={ Forget }/>
		<Route path="/regional" component={ RegionalComponent }/>
		<Route path="/trade(/:tradeName)" component={ TradeComponent }/>
		<Route path="/info(/:pagetype)" component={ InfoComponent }/>

		<Route path="/exponent" onEnter={(nextState, replaceState)=>{
			let user = $.userlogin();
			if ( user ) {
				replaceState('/exponent_pay');
			}else{
				replaceState('/exponent_free');
			}
		}}/>

		<Route path="/exponent_free(/:freeName)" component={ ExponentFreeComponent }/>
		<Route path="/exponent_pay/:name" component={ ExponentPayComponent }/>
		<Route path="/aboutme/:name" component={ AboutMeComponent }/>

		<Route path="/about" component={ AboutComponent }/>
		<Route path="/user" component={ User }/>

		{/* 从 from 跳转到 to */}
		<Redirect from="/" to="/index" />
		<Redirect from="/aboutme" to="/aboutme/server" />
		<Redirect from="/exponent_pay" to="/exponent_pay/survey" />
	</Router>,
	document.getElementById('main')
);