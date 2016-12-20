
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, hashHistory } from 'react-router';

import "./Message.less";
/**
 * @name  message 咨询留言模块
 */
class MessageComponent extends React.Component {
	constructor(props) {
		super(props);
		this.textOk=false;
		this.nameOk=false;
		this.phoneOk=false;
        this.emailOk = false;
	}
    state = {
		data: []
	};
	componentDidMount() {
		const that = this;
	}
	//判断不能为空或空格
	checkName(event){
		this.nameOk=false;
		let name = $(this.refs.name).val();
		// let name=event.target.value;  
	    if (name.length == 0) {
	        this.error_msg('name','请输入您的姓名',true);
	        $(this.refs.name).css({
				borderColor: 'red'
			});
	    } else if (name.length > 20) {
	        this.error_msg('name','姓名长度不能超过20字数',true);
	        $(this.refs.name).css({
				borderColor: 'red'
			});
	    } else if (name.replace(/\s+/, '') == '') {
	        this.error_msg('name','不能输入空格！',true);
	        $(this.refs.name).val("").css({
				borderColor: 'red'
			});
	    } else if(!$.regTest('null',name)){
	    	this.error_msg('name','输入不能带有空格！',true);
	    	$(this.refs.name).val("").css({
				borderColor: 'red'
			});
	    }
	    else{
	    	this.nameOk=true;
	    	$(this.refs.name).css({
				borderColor: '#e5e5e5'
			});
	    }
	}
	//电话号码和手机号码同时验证
	checkPhone(event){
		this.phoneOk=false;
		let phone = $(this.refs.phone).val();
		// let phone=event.target.value;  
	    let regTel1 = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(phone);//带区号的固定电话
	    let regTel2 = /^(\d{7,8})(-(\d{3,}))?$/.test(phone);//不带区号的固定电话
	    let mobile1=(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))//手机号码
	    if (phone.length == 0) {
	        this.error_msg('phone','请输入您的电话/手机号码',true);
	        $(this.refs.phone).css({
				borderColor: 'red'
			});
	    } else if(phone.length>20){
	    	this.error_msg('phone','电话长度不能超过20字数',true);
	    	$(this.refs.phone).css({
				borderColor: 'red'
			});
	    }else if (phone.replace(/\s+/, '') == '') {
	        this.error_msg('phone','不能输入空格！',true);
	        $(this.refs.phone).val("").css({
				borderColor: 'red'
			});
	    } else if(!regTel1 && !regTel2&& !mobile1){
	    	this.error_msg('phone','请输入有效的电话/手机号码',true);
	    	$(this.refs.phone).css({
				borderColor: 'red'
			});
	    }else{
	    	this.phoneOk=true;
	    	$(this.refs.phone).css({
				borderColor: '#e5e5e5'
			});
	    }
	}
	checkText(event){
		this.textOk=false;
		let text = $(this.refs.text).val();
	    if (text.length == 0) {
	        this.error_msg('text','请输入您想说的内容',true);
	        $(this.refs.text).css({
				borderColor: 'red'
			});
	    }else if(text.length >500){
			this.error_msg('text','您输入的内容已经超出500个字~',true);
			 $(this.refs.text).css({
				borderColor: 'red'
			});
	    }else if(text.length <4){
			this.error_msg('text','请输入4个字及以上内容',true);
			 $(this.refs.text).css({
				borderColor: 'red'
			});
	    }else if (text.replace(/\s+/, '') == '') {
	        this.error_msg('text','不能输入空格！',true);
	         $(this.refs.text).val("").css({
				borderColor: 'red'
			});
	    }else if(!$.regTest('null',text)){
	    	this.error_msg('text','输入不能带有空格！',true);
	    	$(this.refs.text).val("").css({
				borderColor: 'red'
			});
	    }else{
	    	this.textOk=true;
	    	$(this.refs.text).css({
				borderColor: '#e5e5e5'
			});
	    }
	}
	//邮箱验证
	checkEmail(event){
		this.emailOk=false;
		let email = $(this.refs.email).val();
		let RegEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	    if (!RegEmail.test(email)) {
	        this.error_msg('email','请输入有效的邮箱地址',true);
			$(this.refs.email).css({
				borderColor: 'red'
			});
	    } else{
	    	this.emailOk=true;
	    	$(this.refs.email).css({
				borderColor: '#e5e5e5'
			});
	    }
	}
	/**
    * 警告
    */
    warning(id,event){
      	var warning;
        switch (id) {
            case 'name':
                warning=this.refs.error_msg_name;               
                break;                    

        }

        if(warning){
        	warning.style.opacity=1; 
        }
    }
    /**
     * 显示错误信息
     */
    error_msg(id,msg,show){
        let error;
        switch (id) {
            case 'name':
                error=this.refs.error_msg_name;               
                break;
            case 'phone':
                error=this.refs.error_msg_phone;
                break;
            case 'text':
                error=this.refs.error_msg_text;
                break;
            case 'email':
                error=this.refs.error_msg_email;
                break;
        }
        if(error)
        {
            this.setError(error,msg,show); 
        }
    }
    setError(error,msg,show){
        if(show)
        {
         if(msg)
            {
               error.innerHTML=msg; 
            }
       
          error.style.opacity=1;  
          error.style.color='#fb4f4f'; 
        }else {
        error.style.opacity=0; 
        } 
    }
    clear(id,event){
        this.error_msg(id,false);
    }
    /**
	 * 点击提交
	 */
    checkSubmit(){   
	    let needback=false;
	    let text=this.refs.text.value;
	    if(!text){
	        this.error_msg('text','请输入您想说的内容',true);
	        $(this.refs.text).css({
				borderColor: 'red'
			});
	        needback=true;
	    }

	    let name=this.refs.name.value; 
	    if(!name){
	        this.error_msg('name','请输入您的姓名',true);
	        $(this.refs.name).css({
				borderColor: 'red'
			});
	        needback=true;
	    }
	    let phone=this.refs.phone.value;
	    if(!phone){
	        this.error_msg('phone','请输入您的电话/手机号码',true);
	        $(this.refs.phone).css({
				borderColor: 'red'
			});
	        needback=true;
	    }
	    let email= this.refs.email.value;
	    if(!email){
	        this.error_msg('email','请输入您的邮箱',true);
	        $(this.refs.email).css({
				borderColor: 'red'
			});
	        needback=true;
	    }
	    if(needback){
	        return false;
	    }
	    if(this.textOk&&this.nameOk&&this.phoneOk&&this.emailOk){   
	      this.submit(text,name,phone,email);
	    }
  	}
	/**
	 * 提交
	 */
    submit(text,name,phone,email){
    	let that = this;
		let datas = {
			content:text,
			userName:name,
			phone:phone,
			email:email
		};
		$.GetAjax('/v1/tianji/addFeedback',datas,'POST',true,function(data,state){
			if(state && data.code == 1){
				layer.open({
					title: '提交状态',
					content: '<div>提交成功，我们会尽快联系您！</div>',
					scrollbar: false
				});
			}else{
				layer.open({
					title: '提交状态',
					content: '<div>提交失败</div>',
					scrollbar: false
				});
			}
		})
  	}
	render() {
		return (
			<div id="message" className="message">
				<hr/>
				<div className="con">
					<div className="left">
						<p className="title">欢迎咨询</p>
						<p className="title">028-64112233</p>
					</div>
					<div className="form">
						<div className="text">
							<p className="title">请你留言</p>
							<textarea className= "textarea" type="text" ref="text" placeholder="客官，说点什么吧,4个字至500个字范围内" onBlur={this.checkText.bind(this)} onChange={this.clear.bind(this,'text')}/>
							<p ref="error_msg_text" className="msg_error" >请您留言</p>
						</div>
						<div className="line">
							<p>姓名</p>
							<input className="content" ref="name" type="text"  id="user_name" onBlur={this.checkName.bind(this)} onChange={this.clear.bind(this,'name')} ></input>
							<p ref="error_msg_name" className="msg_error" >请输入你的姓名</p>
						</div>
						<div className="line">
							<p>电话</p>
							<input className="content " ref="phone"  type="text" onBlur={this.checkPhone.bind(this)} onChange={this.clear.bind(this,'phone')}></input>
							<p ref="error_msg_phone" className="msg_error" >请输入您的电话</p>
						</div>
						<div className="line">
							<p>邮箱</p>
							<input className="content" ref="email" type="text" onBlur={this.checkEmail.bind(this)} onChange={this.clear.bind(this,'email')}></input>
							<p ref="error_msg_email" className="msg_error" >请输入您的邮箱</p>
						</div>
						<div className="line">
							<button className="submit " id="submit" onClick={this.checkSubmit.bind(this)}>提交 </button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = MessageComponent
