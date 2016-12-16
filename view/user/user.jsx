
import React from 'react';
import { hashHistory } from 'react-router';
import "./user.less";

class ContainerUser extends React.Component {
	constructor(props) {
		super(props);
		this.userDatas = {};
		this.userToken = $.cookie('token');

		this.reviewPassword = this.reviewPassword.bind(this);
	}
	componentDidMount() {
		this.getUser(this.userToken);
	}
	getUser(token){

		$.GetAjax('/v1/personal/inner/getUserInfo',null,'GET',false,(data,state)=>{
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
				},2000);
			}
		});
	}
	reviewPassword(e){
		
		let pass = $.trim($(this.refs.pass).val());
		let newpass = $.trim($(this.refs.newpass).val());
		let newpasscopy = $.trim($(this.refs.newpasscopy).val());
		
		if ( !$.regTest('password',pass) ) {
			layer.tips('密码格式不正确，请输入6-16位', this.refs.pass);
			return false;
		}

		if ( !$.regTest('password',newpass) ) {
			layer.tips('密码格式不正确，请输入6-16位', this.refs.newpass);
			return false;
		}

		if ( newpasscopy !== newpass ) {
			layer.tips('两次密码输入不一致', this.refs.newpasscopy);
			return false;
		}

		let option = {
			oldPas: pass,
			newPas: newpass
		};
		layer.load(3, {
			shade: [0.2,'#000']
		});
		this.updatePassword(option);
	}
	updatePassword(option){
		
		$.GetAjax('/v1/personal/inner/updatePas',option,'GET',false,(data,state)=>{
			
			if ( state && data.code == 1 ) {
				layer.closeAll('loading'); //关闭加载层
				layer.msg('密码修改成功，请重新登录！');
				setTimeout(()=>{
					$.laoutLogin(()=>{
						hashHistory.push('/login');
					});
				},888)
				
			}else{
				setTimeout(()=>{
					layer.closeAll('loading'); //关闭加载层
					layer.msg(data.message || "密码修改失败");
				},888)
			}
		});
	}
	bindThirdUser(type, bind, e){
		if ( type == 'qq' ) {
			bind == 'bind' ? this.bindthird(type) : this.clearthird(type);
		}
	}
	bindthird(type) {
		if ( type == 'qq' ) {
			location.href = $.thirdxhr;
		} else {
			alert('wx');
		}
		
	}
	clearthird(type){
		const that = this;
		let typeNums = type == 'qq' ? 0 : 1;
		//询问框
		layer.confirm('真的要解除绑定么？', {
			btn: ['确定','我再想想'] //按钮
		}, function(){
			$.GetAjax('/v1/personal/inner/relieveBand',{type:typeNums},'GET',false,(data,state)=>{
				if ( state && data.code == 1 ) {
					layer.msg('解除成功！');
					that.getUser(that.userToken);
				}else{
					layer.msg('解除失败，稍后再试！');
				}
			});
		}, function(index){
			layer.close(index);
		});
		
	}
	render() {
		if ( !this.userToken ) { 
			if ( history.go ) {
				history.go(-1);
				return false;
			}else{
				hashHistory.push('/');
				return false;
			}
		};
		return (
			<div className="container-user">
			   <div className="user-nav">
			   		<div className="user-logo">
			   			<img src={ this.userDatas.avatar || "./images/user.jpg" } />
			   		</div>
			   		<h3>{ this.userDatas.account || "" }</h3>
			   </div>
			   <div className="user-section">
			   		<div className="user-module">
			   			<div className="user-title"><span>账号信息</span></div>
			   			<div className="user-list">
			   				<p className="user-list-name">用户名</p>
			   				<p className="user-list-cont">{ this.userDatas.account || "" }</p>
			   			</div>
			   			<div className="user-list">
			   				<p className="user-list-name">手机号码</p>
			   				<p className={ this.userDatas.mobile && "user-list-cont" || "user-list-cont no-bind" }>{ this.userDatas.mobile || '未绑定' }</p>
			   				<input type="button" value={ this.userDatas.mobile ? "更改" : "绑定" }/>
			   			</div>
			   			<div className="user-list">
			   				<p className="user-list-name">QQ</p>
			   				<p className={ this.userDatas.qqOpenid && "user-list-cont" || "user-list-cont no-bind" }>{ this.userDatas.qqOpenid || '未绑定' }</p>
			   				<input type="button" value={ this.userDatas.qqOpenid ? "解绑" : "绑定" } onClick={ this.bindThirdUser.bind(this,'qq',this.userDatas.qqOpenid ? "unbind" : "bind") }/>
			   				
			   			</div>
			   			<div className="user-list">
			   				<p className="user-list-name">微信</p>
			   				<p className={ this.userDatas.weinxinOpenid && "user-list-cont" || "user-list-cont no-bind" }>{ this.userDatas.weinxinOpenid || '未绑定' }</p>
			   				<input type="button" value={ this.userDatas.weinxinOpenid ? "解绑" : "绑定" } onClick={ this.bindThirdUser.bind(this,'wx',this.userDatas.weinxinOpenid ? "unbind" : "bind") }/>
			   				
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
			   				<input type="password" ref="pass"/>
			   			</div>
			   			<div className="user-list">
			   				<p className="user-list-name">新密码</p>
			   				<input type="password" ref="newpass"/>
			   			</div>
			   			<div className="user-list">
			   				<p className="user-list-name">确认密码</p>
			   				<input type="password" ref="newpasscopy"/>
			   			</div>
			   			<div className="user-list">
			   				<p className="user-list-zw"></p>
			   				<input type="button" value="确定" onClick={ this.reviewPassword }/>
			   			</div>
			   		</div>
			   </div>
			</div>
		)
	}
}

module.exports = ContainerUser