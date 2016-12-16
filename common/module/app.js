
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, Redirect } from 'react-router';

import "../../dist/common.js"; 				// 公用js包
import "../../dist/getViewData.js";			// ajax请求包
import '../style/common.less';				// 公用样式包


render(
	<Router history={hashHistory}>

		{/*首页*/}
		<Route path="/index" getComponent={(nextState, callback)=>{
			require.ensure([], function (require) {
				callback(null, require('../../routes/index'))
			},'index')
		}}/>

		{/*登录*/}
		<Route path="/login"  getComponent={(nextState, callback)=>{
			require.ensure([], function (require) {
				callback(null, require('../../view/login/login'))
			},'login')
		}}/>

		{/*注册*/}
		<Route path="/register" getComponent={(nextState, callback)=>{
			require.ensure([], function (require) {
				callback(null, require('../../view/login/register'))
			},'register')
		}}/>

		{/*忘记密码*/}
		<Route path="/forget" getComponent={(nextState, callback)=>{
			require.ensure([], function (require) {
				callback(null, require('../../view/login/forget'))
			},'forget')
		}}/>

		{/*第三方注册用户信息*/}
		<Route path="/third" getComponent={(nextState, callback)=>{
			require.ensure([], function (require) {
				callback(null, require('../../view/common/thirdLogin'))
			},'third')
		}}/>

		{/*地域*/}
		<Route path="/regional" getComponent={(nextState, callback)=>{
			require.ensure([], function (require) {
				callback(null, require('../../routes/regional'))
			},'regional')
		}}/>

		{/*行业*/}
		<Route path="/trade(/:tradeName)" getComponent={(nextState, callback)=>{
			require.ensure([], function (require) {
				callback(null, require('../../routes/trade'))
			},'trade')
		}}/>

		{/*咨讯*/}
		<Route path="/info(/:pagetype)" getComponent={(nextState, callback)=>{
			require.ensure([], function (require) {
				callback(null, require('../../routes/info'))
			},'info')
		}}/>

		{/*未付费版映潮指数*/}
		<Route path="/exponent_free(/:freeName)" getComponent={(nextState, callback)=>{
			require.ensure([], function (require) {
				callback(null, require('../../routes/exponent_free'))
			},'free')
		}}/>

		{/*付费版映潮指数*/}
		<Route path="/exponent_pay/*" getComponent={(nextState, callback)=>{
			require.ensure([], function (require) {
				callback(null, require('../../routes/exponent_pay'))
			},'pay')
		}}/>

		{/*关于我们*/}
		<Route path="/aboutme/:name" getComponent={(nextState, callback)=>{
			require.ensure([], function (require) {
				callback(null, require('../../routes/aboutme'))
			},'aboutme')
		}}/>

		{/*关于（天玑）*/}
		<Route path="/about" getComponent={(nextState, callback)=>{
			require.ensure([], function (require) {
				callback(null, require('../../routes/about'))
			},'about')
		}}/>

		{/*个人中心*/}
		<Route path="/user" getComponent={(nextState, callback)=>{
			require.ensure([], function (require) {
				callback(null, require('../../routes/user'))
			},'user')
		}}/>

		<Route path="/exponent" onEnter={(nextState, replaceState)=>{
			if ( $.isVipUser() ) {
				replaceState('/exponent_pay');
			}else{
				replaceState('/exponent_free');
			}
		}}/>

		{/* 从 from 跳转到 to */}
		<Redirect from="/" to="/index" />
		<Redirect from="/aboutme" to="/aboutme/server" />
		<Redirect from="/exponent_pay" to="/exponent_pay/survey" />
	</Router>,
	document.getElementById('main')
);