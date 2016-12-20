
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
			layer.tips('密码格式不正确', this.refs.pass);
			return false;
		}

		if ( !$.regTest('password',newpass) ) {
			layer.tips('密码格式不正确', this.refs.newpass);
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
		}else{
			bind == 'bind' ? this.bindthird(type) : this.clearthird(type);
		}
	}
	bindthird(type) {
		if ( type == 'qq' ) {
			location.href = $.thirdxhr;
		} else {
			location.href = $.thirdxhrwx;
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
	payEx(e){
		layer.open({
			title: '权限购买',
			content: '<div>您好，欢迎您拨打电话：028-83117030 进行咨询续费。</div>',
			scrollbar: false
		});
	}
	// 绑定手机
	bindNewphone(){
		const that = this;
		layer.open({
			title: '绑定新手机',
			area: ['600px', '270px'],
			content:'<div class="layer-box" style="padding: 10px 120px;">'+
						'<input type="text" placeholder="请输入绑定的手机号码" class="input-large pleft10 borderhui" id="bindPhone" />'+
						'<input type="text" placeholder="请输入短信验证码" class="input-middle mtop30 pleft10 borderhui" id="bindyzm"/>'+
						'<input type="button" value="获取验证码" class="input-middle mtop30 mleft10b borderblue" id="getyzm-bind"/>'+
						'<input type="button" value="确定" class="input-btn mtop30 borderblue" id="layer-bind-yes"/>'+
						'<input type="button" value="取消" class="input-btn mtop30 borderblue mleft10b" id="layer-bind-no"/>'+
					'</div>',
			btn: []
		});
		$('#layer-bind-yes').off().on('click',function(){
			let phone = $.trim($('#bindPhone').val());
			let yzm = $.trim($('#bindyzm').val());
			if ( !$.regTest('phone',phone) ) {
				layer.tips('密码格式不正确', '#bindPhone');
				return false;
			}
			if ( !$.regTest('null',yzm) ) {
				layer.tips('请输入短信验证码', '#bindyzm');
				return false;
			}
			let config = {
				type: 1, // 1是绑定
				code: yzm,
				mobile: phone
			};
			$.GetAjax('/v1/personal/inner/operationPhone',config,'GET',false,(data,state)=>{
				if ( state && data.code == 1 ) {
					layer.msg('绑定成功！');
					that.getUser(that.userToken);
				}else{
					layer.msg(data.message);
				}
			});
		});
		$('#layer-bind-no').off().on('click',function(){
			layer.closeAll();
		});
		$('#getyzm-bind').off().on('click',function(){
			let phone = $.trim($('#bindPhone').val());
			if ( !$.regTest('phone',phone) ) {
				layer.tips('密码格式不正确', '#bindPhone');
				return false;
			}
			let config = {
				mobile: phone,
				type: 3 // 3是绑定手机
			}
			that.getCode(config);
		});
	}
	// 解除绑定
	unbindPhone(hasphone=""){
		const that = this;
		layer.open({
			title: '解除绑定',
			area: ['600px', '270px'],
			content:'<div class="layer-box" style="padding: 10px 120px;">'+
						'<input type="text" placeholder="请输入绑定的旧手机号码" class="input-large pleft10 borderhui" id="bindPhone" value='+hasphone+' '+(hasphone ? 'disabled' : "")+' >'+
						'<input type="text" placeholder="请输入短信验证码" class="input-middle mtop30 pleft10 borderhui" id="bindyzm">'+
						'<input type="button" value="获取验证码" class="input-middle mtop30 mleft10b borderblue" id="getyzm">'+
						'<input type="button" value="确定" class="input-btn mtop30 borderblue" id="layer-yes">'+
						'<input type="button" value="取消" class="input-btn mtop30 borderblue mleft10b" id="layer-no">'+
					'</div>',
			btn: []
		});
		$('#layer-yes').off().on('click',function(){
			let phone = $.trim($('#bindPhone').val());
			let yzm = $.trim($('#bindyzm').val());
			if ( !$.regTest('phone',phone) ) {
				layer.tips('密码格式不正确', '#bindPhone');
				return false;
			}
			if ( !$.regTest('null',yzm) ) {
				layer.tips('请输入短信验证码', '#bindyzm');
				return false;
			}
			let config = {
				type: 0, // 0是解绑
				code: yzm,
				mobile: phone
			};
			$.GetAjax('/v1/personal/inner/operationPhone',config,'GET',false,(data,state)=>{
				if ( state && data.code == 1 ) {
					layer.closeAll();
					if ( !hasphone ) {
						that.getUser(that.userToken);
						layer.msg('解绑成功！');
					}else{
						that.bindNewphone();
					}
					
				}else{
					layer.msg(data.message);
				}
			});
		});
		$('#layer-no').off().on('click',function(){
			layer.closeAll();
		});
		$('#getyzm').off().on('click',function(){
			let phone = $.trim($('#bindPhone').val());
			if ( !$.regTest('phone',phone) ) {
				layer.tips('密码格式不正确', '#bindPhone');
				return false;
			}
			let config = {
				mobile: $.trim($('#bindPhone').val()),
				type: 2 // 2是解绑手机
			}
			that.getCode(config);
		});
	}
	// 绑定手机判断是否为更改
	bindUserPhone(type,e){
		
		if ( type == 'add' ) {
			this.bindNewphone();
		} else if ( type == 'update' ) {
			let userPhone = $(this.refs.userphone).html() || '';
			this.unbindPhone(userPhone);
		}
	}
	// 获取短信验证码
	getCode(config){
		$.GetAjax('/v1/system/sendCode',config,'GET',false,(data,state)=>{
			if ( state && data.code == 1 ) {
				alert('您的验证码是:'+data.data);
			}else{
				alert(data.message);
			}
		});
	}
	// 询问解除绑定
	unbindUserPhone(){
		const that = this;
		layer.open({
			title: '解除绑定',
			area: ['600px', '200px'],
			content:'<div class="layer-box" style="padding: 10px 120px;">'+
						'<p class="centerp">确定要解除绑定吗？</p>'+
						'<input type="button" value="解除绑定" class="input-middle mtop30 borderblue mleft10b" id="layer-unbind-yes"/>'+
						'<input type="button" value="取消" class="input-middle mtop30 borderhui mleft5b" id="layer-unbind-no"/>'+
					'</div>',
			btn: []
		});
		$('#layer-unbind-yes').off().on('click',function(){
			layer.closeAll();
			that.unbindPhone();
		});
		$('#layer-unbind-no').off().on('click',function(){
			layer.closeAll();
		});
		
	}
	render() {
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
			   				<p className={ this.userDatas.mobile && "user-list-cont" || "user-list-cont no-bind" } ref="userphone">{ this.userDatas.mobile || '未绑定' }</p>
			   				<input type="button" value={ this.userDatas.mobile ? "更改" : "绑定" } onClick={ this.bindUserPhone.bind(this,this.userDatas.mobile ? "update" : "add") }/>
			   				{(()=>{
			   					if ( this.userDatas.mobile ) {
			   						return <input type="button" value="解绑" onClick={ this.unbindUserPhone.bind(this) }/>
			   					}
			   				})()}
			   			</div>
			   			<div className="user-list">
			   				<p className="user-list-name">QQ</p>
			   				<p className={ this.userDatas.qqOpenid && "user-list-cont" || "user-list-cont no-bind" }>{ this.userDatas.qqOpenid ? this.userDatas.qqNickName : '未绑定' }</p>
			   				<input type="button" value={ this.userDatas.qqOpenid ? "解绑" : "绑定" } onClick={ this.bindThirdUser.bind(this,'qq',this.userDatas.qqOpenid ? "unbind" : "bind") }/>
			   				
			   			</div>
			   			<div className="user-list">
			   				<p className="user-list-name">微信</p>
			   				<p className={ this.userDatas.weinxinOpenid && "user-list-cont" || "user-list-cont no-bind" }>{ this.userDatas.weinxinOpenid ? this.userDatas.weixinNickName : '未绑定' }</p>
			   				<input type="button" value={ this.userDatas.weinxinOpenid ? "解绑" : "绑定" } onClick={ this.bindThirdUser.bind(this,'wx',this.userDatas.weinxinOpenid ? "unbind" : "bind") }/>
			   				
			   			</div>
			   		</div>
			   		<div className="user-module">
			   			<div className="user-title"><span>权限购买</span></div>
			   			<div className="user-list">
			   				<p className="user-list-name">数据权限</p>
			   				<p className="user-list-cont">{this.userDatas.type == 2 ? '高级用户' : '普通用户'}</p>
			   			</div>
			   			{(()=>{
			   				let type = this.userDatas.type || 1;
			   				let parentHTML = [];
			   				let childHTML = [];
			   				if ( type == 2 ) {
			   					childHTML.push(<p className="user-list-name">到期时间</p>);
			   					childHTML.push(<p className="user-list-cont">{ this.userDatas.payEx && $.getLocalTime(this.userDatas.payEx) || "" }</p>);
			   					childHTML.push(<input type="button" value="续费" onClick={ this.payEx.bind(this) }/>)
			   					parentHTML.push(<div className="user-list">{ childHTML }</div>);
			   				}
			   				return parentHTML;
			   			})()}
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