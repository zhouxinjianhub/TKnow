
import React from 'react';
import { Link ,hashHistory} from 'react-router';
import "./register.less";
import "./loginCommon.less";

class ContainerLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {     

        };
        this.nameOk=false;
        this.passOk=false;
        this.passrOk=false;
        this.phoneOk=false;
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        clearTimeout(this.timeoutId)
    }
    /**
    * 检测用户名规则
    */
    checkName(event)
    {

        var name=event.target.value;   
        var regExp1=new RegExp("(^[\\u4e00-\\u9fa5A-Za-z0-9])([\\u4e00-\\u9fa5A-Za-z0-9_]{3,11})");
        var regExp2=new RegExp("^\\d+$");
        var regExp3=new RegExp("^(.)\\1+$");

        if(regExp1.test(name)&&!regExp2.test(name)&&!regExp3.test(name)) {

            this.checkNameExisted(name);

        }else {       

            this.error_msg('name','请输入有效的用户名',true);
        }


    } 
    /**
    * 检测用户名是否存在
    */
    checkNameExisted(name)
    {

        var self = this;
        let datas = {
            cmd:'account',                 
            account:name,
        };
        $.GetAjax('/v1/personal/check', datas, 'POST', true, function(data , state) {                  
            if (state && data.code == 1) {
                self.nameOk=true;              
            } else {
                self.error_msg('name','用户名已存在，请重新输入',true);
            }
        }); 

    }
    /**
    * 检测密码规则
    */
    checkPass(event)
    {

        var pass=event.target.value;
        var regExp1=new RegExp("[\\w]{6,16}");

        if(regExp1.test(pass)) {

          this.passOk=true;

        }else {

          this.error_msg('pass','请输入有效的密码',true);   

        }


    } 
    /**
    * 检测密码重复
    */
    checkPassRepeat()
    {

        var passr=event.target.value;
        if(!passr) {
            this.error_msg('passr','请再次输入您的密码',true);  
            return false;
        }
        var pass= this.refs.password.value;

        if(pass==passr) {
            this.passrOk=true;
        }else {
            this.error_msg('passr','密码输入不一致',true);   
        }

    }
    getNum(event)
    {
        this.checkPhone()
    }


    sendNum()
    {

        var self = this;
        var phone=this.refs.phonenum.value;
        let datas = {
            mobile:phone,
            type:0,
        };
        $.GetAjax('/v1/system/sendCode', datas, 'GET', true, function(data , state) {                  
            if (state && data.code == 1)  {
                alert('验证码是：'+data.data);    
                self.startTimer(60);           
            } else {
                error_msg('phone','手机已被注册',true);
            }
        }); 

    }


    startTimer(countdown)
    {
        var btn=this.refs.btn_num;
        if (countdown == 0) { 
            btn.removeAttribute("disabled");    
            btn.innerHTML="获取验证码"; 
            countdown = 60; 
            return;
        } else { 
            btn.setAttribute("disabled", true); 
            btn.innerHTML="" + countdown + "s后重新获取"; 
            countdown--; 
        } 

        this.timeoutId = setTimeout(() => {
        this.startTimer(countdown);
        }, 1000)

    }

    /**
    * 检测手机规则
    */
    checkPhone() {  

        var phone=this.refs.phonenum.value;
        if(!phone) {
            this.error_msg('phone','请输入手机号码',true);  
            return false;
        }

        var regExp1=new RegExp("^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$");   

        if(regExp1.test(phone)) {        
            this.checkPhoneExisted(phone);      
            return true;
        }else {
            this.error_msg('phone','请输入有效的手机号码',true);    
            return false;   
        }

    }


    /**
    * 检测手机是否被注册
    */
    checkPhoneExisted(phone) {
        var self = this;
        let datas = {
            cmd:'mobile',                 
            mobile:phone,
        };
        $.GetAjax('/v1/personal/check', datas, 'POST', true, function(data , state) {                  
            if (state && data.code == 1) {
                self.phoneOk=true;
                self.sendNum();              
            } else {
                self.error_msg('phone','您输入的手机号码已经注册，请直接登录',true);
            }
        }); 
    }
    /**
    * 点击注册
    */
    checkRegister() {   
        var needback=false;
        var name=this.refs.name.value; 

        if(!name) {
            this.error_msg('name','请输入用户名',true);
            needback=true;
        }

        var pass=this.refs.password.value;
        if(!pass) {
            this.error_msg('pass','请设置您的密码',true);
            needback=true;
        }

        var passr=this.refs.passr.value;
        if(!passr) {
            this.error_msg('passr','请再次输入您的密码',true);
            needback=true;
        }

        var phone=this.refs.phonenum.value;
        if(!phone) {
            this.error_msg('phone','请输入手机号码',true);
            needback=true;
        }

        var num=this.refs.num.value;
        if(!num)  {
            this.error_msg('num','请输入您的手机验证码',true);
            needback=true;
        }
        if(needback) {
            return false;
        }
        if(this.nameOk&&this.passOk&&this.passrOk&&this.phoneOk) {   
            this.register(name,pass,passr,phone,num);
        }
    }

    /**
    * 注册
    */
    register(name,pass,passr,phone,num) {
        var self = this;
        var phone=this.refs.phonenum.value;
        let datas = {
            account:name,
            password:pass,
            passwordRepeat:passr,
            mobile:phone,
            validCode:num
        };

        $.GetAjax('/v1/personal/register', datas, 'GET', true, function(data , state) {                  
            if (state && data.code == 1) {                          
                self.registerSucess(data);         
            } else {
                self.registerFailed(data);
            }
        }); 

    }

    registerSucess(data) {
        layer.open({
                    icon: 1,
                    title: '注册成功',
                    content: '<div>成功</div>',
                    yes: function(layero, index){
                        layer.close(layero);
                        location.href = '/login';
                    }
                });
    }

    registerFailed(data) {
        if(data.code==13) {
            this.error_msg('num','您输入的手机验证码有误',true);
        }else {
            this.error_msg('num',data.message,true);
        }

    }


    /**
    * 显示错误信息
    */
    error_msg(id,msg,show)
    {
        var error;
        console.log(id);
        switch (id) {
            case 'name':
                error=this.refs.error_msg_name;               
                break;
            case 'pass':
                error=this.refs.error_msg_pass;
                break;
            case 'passr':
                error=this.refs.error_msg_passr;
                break;
            case 'phone':
                error=this.refs.error_msg_phone;
                break;
            case 'num':
                error=this.refs.error_msg_num;
                break;
        }

        if(error) {

            this.setError(error,msg,show); 

        }
    }

    setError(error,msg,show) {
        if(show) {
            if(msg) {
                error.innerHTML=msg; 
            }
            error.style.opacity=1;  
            error.style.color='#fb4f4f'; 
        }else {
            error.style.opacity=0; 
        } 
    }

    clear(id,event)
    {
        this.error_msg(id,false);
    }
    /**
    * 警告
    */
    warning(id,event)
    {
        var warning;
        switch (id) {
            case 'name':
            warning=this.refs.error_msg_name;               
            break;                  

        }

        if(warning) {

            warning.style.opacity=1; 

        }
    }
    popService()
    {
        alert("服务条款");
    }


    render() {
        return (
            <div className="container-register">  
                <div id="wrapper" className="login-page">
                    <Link  to="/index">
                        <div className="img_head"></div>
                    </Link>               
                    <div className="login_form_head">
                        <Link to="/login"><a className="login">马上登录</a></Link> 
                        <p className="login_head_msg">注 册</p>                 

                        </div>
                        <div id="login_form" className="form">
                            <input ref="name" className="login_input" type="text" placeholder="用户名4-16位,支持中文、数字、字母" id="user_name" onBlur={this.checkName.bind(this)} onChange={this.clear.bind(this,'name')} onFocus={this.warning.bind(this,'name')}/>
                            <p ref="error_msg_name" className="msg_error" >用户名一旦设置成功无法修改</p>
                            <input ref="password" className="login_input" type="password" placeholder="设置密码:6-16位,支持数字、字母、字符" id="password" onBlur={this.checkPass.bind(this)} onChange={this.clear.bind(this,'pass')}/>
                            <p ref="error_msg_pass" className="msg_error" >警告密码规则</p>
                            <input ref="passr" className="login_input" type="password" placeholder="请再次输入您的密码"  onBlur={this.checkPassRepeat.bind(this)} onChange={this.clear.bind(this,'passr')} />
                            <p ref="error_msg_passr" className="msg_error" >警告密码重复</p>
                            <input ref="phonenum" className="login_input" type="text" placeholder="手机号码"  onChange={this.clear.bind(this,'phone')}/>
                            <p ref="error_msg_phone" className="msg_error" >警告手机号规则</p>
                            <div className="div_num">
                            <input ref="num" className="login_input" type="text" placeholder="手机验证码" id="nums" onChange={this.clear.bind(this,'num')}/>

                            <button ref="btn_num" className="login_btn" id="getnum" onClick={this.getNum.bind(this)}>获取验证码</button>
                        </div>
                        <p ref="error_msg_num" className="msg_error" >请输入验证码</p>
                        <p className="msg_register">点击[注册]，既代表您同意 <a onClick={this.popService}>《服务平台用户注册协议》</a></p>
                        <button  className="login_btn" id="register" onClick={this.checkRegister.bind(this)}>注 册</button>
                    </div>
                </div>
            </div>
        )
    }
  }

module.exports = ContainerLogin