
import React from 'react';
import { hashHistory } from 'react-router';
import "./user.less";

class ContainerUser extends React.Component {
	constructor(props) {
		super(props);
		this.userDatas = {};
		this.userToken = $.cookie('token');
		if ( !this.userToken ) { 
			if ( history.go ) {
				history.go(-1);
			}else{
				hashHistory.push('/');
			}
		}
	}
	componentDidMount() {
		this.getUserMsg();
	}
	getUserMsg() {
		let token = this.props.parent.location.query['access_token'] || null;
		console.log(token);
		if ( token ) {
			this.getThirdUser(token);
		}else{
			this.getUser(this.userToken);
		}
	}
	getUser(token){
		$.GetAjax('/v1/personal/inner/getUserInfo',{token: token},'GET',false,(data,state)=>{
			if ( state && data.code == 1 ) {
				this.userDatas = data.data;
				this.setState({
					status: true
				});
			}else{
				layer.msg('获取用户信息失败，请重新登录!!');
				setTimeout(()=>{
					$.laoutLogin(()=>{
						hashHistory.push('/login');
					});
				},3000);
			}
		});
	}
	getThirdUser(token){

	}
	openJs() {
		var ref = window.open("page.html", "newwindow","height=100, width=400, top=0,left=0,toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no,status=no");
        console.log(ref);
        // hashHistory.push('/login');
	}
	render() {
		let pageName = this.props.parent.params.name;
		return (
			<div className="container-user">
			   <div className="user-nav">
			   		<div className="user-logo">
			   			<img src="./images/user.jpg" />
			   		</div>
			   		<h3>六个中文字符</h3>
			   </div>
			   <div className="user-section">
			   		<div className="user-module">
			   			<div className="user-title"><span>账号信息</span></div>
			   			<div className="user-list">
			   				<p className="user-list-name">用户名</p>
			   				<p className="user-list-cont">六个中文字符</p>
			   			</div>
			   			<div className="user-list">
			   				<p className="user-list-name">手机号码</p>
			   				<p className={ this.userDatas.mobile && "user-list-cont" || "user-list-cont no-bind" }>{ this.userDatas.mobile || '未绑定' }</p>
			   				<input type="button" value={ this.userDatas.mobile ? "更改" : "绑定" } onClick={ this.openJs.bind(this) } />
			   			</div>
			   			<div className="user-list">
			   				<p className="user-list-name">QQ</p>
			   				<p className={ this.userDatas.qqOpenid && "user-list-cont" || "user-list-cont no-bind" }>{ this.userDatas.qqOpenid || '未绑定' }</p>
			   				<input type="button" value={ this.userDatas.qqOpenid ? "解绑" : "绑定" }/>
			   				
			   			</div>
			   			<div className="user-list">
			   				<p className="user-list-name">微信</p>
			   				<p className={ this.userDatas.weinxinOpenid && "user-list-cont" || "user-list-cont no-bind" }>{ this.userDatas.weinxinOpenid || '未绑定' }</p>
			   				<input type="button" value={ this.userDatas.weinxinOpenid ? "解绑" : "绑定" }/>
			   				
			   			</div>
			   		</div>
			   		<div className="user-module">
			   			<div className="user-title"><span>权限购买</span></div>
			   			<div className="user-list">
			   				<p className="user-list-name">数据权限</p>
			   				<p className="user-list-cont">普通用户</p>
			   			</div>
			   			<div className="user-list">
			   				<p className="user-list-name">到期时间</p>
			   				<p className="user-list-cont">2016-11-22</p>
			   				<input type="button" value="续费"/>
			   			</div>
			   		</div>
			   		<div className="user-module">
			   			<div className="user-title"><span>修改密码</span></div>
			   			<div className="user-list">
			   				<p className="user-list-name">原密码</p>
			   				<input type="password" value=""/>
			   			</div>
			   			<div className="user-list">
			   				<p className="user-list-name">新密码</p>
			   				<input type="password" value=""/>
			   			</div>
			   			<div className="user-list">
			   				<p className="user-list-name">确认密码</p>
			   				<input type="password" value=""/>
			   			</div>
			   			<div className="user-list">
			   				<p className="user-list-zw"></p>
			   				<input type="button" value="确定"/>
			   			</div>
			   		</div>
			   </div>
			</div>
		)
	}
}

module.exports = ContainerUser