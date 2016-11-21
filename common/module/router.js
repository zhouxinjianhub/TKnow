
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';

import "../../dist/common.js"; 				// 公用js包
import "../../dist/getViewData.js";			// ajax请求包

import '../style/common.less';

import Index from "../../view/index/index";			// 首页
import Login from "../../view/login/login";			// 登录
import Regional from "../../view/regional/regional";// 地域
import Trade from "../../view/trade/trade";			// 行业
import Info from "../../view/info/info";			// 咨讯

import Exponent_free from "../../view/exponent_free/free";	// 未付费版映潮指数
import Exponent_pay from "../../view/exponent_pay/pay";	// 付费版映潮指数

import About from "../../view/about/about";			// 关于（天玑）
import User from "../../view/user/user";			// 个人中心
import Nav from 'nav';
import Footer from 'footer';
// // import PubSub from 'pubsub-js';

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
			</div>
		)
	}
}


ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/index" component={ IndexComponent }/>
		<Route path="/login" component={ Login }/>
		<Route path="/regional(/:name)" component={ RegionalComponent }/>
		<Route path="/trade" component={ TradeComponent }/>
		<Route path="/info" component={ InfoComponent }/>

		<Route path="/exponent_free" component={ ExponentFreeComponent }/>
		<Route path="/exponent_pay" component={ ExponentPayComponent }/>

		<Route path="/about" component={ AboutComponent }/>
		<Route path="/user" component={ User }/>

		{/* 从 from 跳转到 to */}
		<Redirect from="/" to="/index" />
   		<Redirect from="/exponent" to="/exponent_free" />
	</Router>,
	document.getElementById('main')
);