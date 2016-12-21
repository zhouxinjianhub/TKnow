
import React from 'react';
import { Link ,hashHistory} from 'react-router';
import "./forget.less";
import "./loginCommon.less";

class Containerforget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {   

        };
        this.passOk=false;
        this.passrOk=false;
        this.phoneOk=false;
        this.phone=0;
        this.step=1;
    }
    componentDidMount() {

        var self = this;       

    }

    componentWillUnmount() {

        clearTimeout(this.timeoutId);
        clearTimeout(this.jumpTimeoutId)
    }
    /**
    *  点击重设密码
    */
    checkNum( event ) {

        var phone=this.refs.phone.value;

        if( !phone ) {
            this.error_msg('phone','请输入手机号码',true);  
            return false;
        }
        var num=this.refs.num.value;
        if( !num ) {
            this.error_msg('num','请输入您的手机验证码',true);  
            return false;
        }

        if( !this.phoneOk ) {
            this.error_msg('phone','请输入有效的手机号码',true);  
            return false;
        }

        var self = this;    
        let datas = {
            mobile:phone,
            code:num
        };
        $.GetAjax('/v1/personal/forgetCheckedCode', datas, 'GET', true, function(data , state) {    
            if (state && data.code == 1) {
                self.jumpToPass();            
            } else if (state && data.code == 13) {                      
                self.error_msg('num','验证码错误',true);            
            } else {
                self.error_msg('num',data.message,true);
            }
        }); 

    }
    /**
    * 跳转输入密码
    */
    jumpToPass( ) {    

        this.jumpToPage(2);
        clearTimeout(this.timeoutId);
        this.startTimer(0);
    }

    /**
    * 检测密码规则
    */
    checkPass( event ) {

        var pass=event.target.value;
        console.log(pass);
        if($.regTest('password',pass)) {
            this.passOk=true;
            console.log('密码通过');        
        }else {
            this.error_msg('pass','请输入有效的密码',true); 
            this.passrOk=fasle;   
        }

    } 
    /**
    * 检测密码重复
    */
    checkPassRepeat( ) {

        var pass= this.refs.pass.value;
        var passr=this.refs.passr.value;
        if( pass==passr ) {
            this.passOk=true;
            console.log('重复通过');
            return true;
        }else {
            this.error_msg('passr','密码输入不一致',true); 
            return false;  
        }

    }


    checkForget( ) {

        if(this.checkPassRepeat()) {          
            var phone=this.refs.phone.value; 
            var pass=this.refs.pass.value;
            var num=this.refs.num.value;         
            this.forget(phone,pass,num);
        }

    }

    forget( phone,pass,num ) {

        console.log('验证码'+num);
        var self = this;    
        let datas = {
            mobile:phone,
            password:pass,
            code:num
        };
        $.GetAjax('/v1/personal/forget', datas, 'GET', true, function(data , state) {   
            if (state && data.code == 1){
                self.forgetSuccess();            
            } else {
                self.forgetFailed(data);
            }
        }); 

    }

    /**
    * 忘记密码成功
    */
    forgetSuccess( ) {

    console.log('修改成功');
    this.jumpToPage(3);

    }
    /**
    * 忘记密码失败
    */
    forgetFailed( data ) {

        console.log(data);
        if(data.code==13) {
            this.error_msg('num','您输入的手机验证码有误',true);    
            this.jumpToPage(1);

        }else {
            this.error_msg('passr',data.message,true);  
        }

    }


    jumpToPage(step) {

        this.step=step;
        if(step<3) {
            $('.forget_step_one').animate({
                height: 'toggle',
                opacity: 'toggle'
            }, 'slow');


            $('.forget_step_two').animate({
                height: 'toggle',
                opacity: 'toggle'
            }, 'slow');
        }else {
            $('.forget-page').animate({
                height: 'toggle',
                opacity: 'toggle'
            }, 'slow');
            $('.forget_step_three').animate({
                height: 'toggle',
                opacity: 'toggle'
            }, 'slow');
            this.startJumpTimer(3);
        }

    } 



    /**
    *  点击获取验证码
    */
    getNum(event) {

        this.checkPhone()

    }


    /**
    * 检测手机规则
    */
    checkPhone() {     
        var phone=this.refs.phone.value;

        console.log(phone);

        if(!phone) {
            this.error_msg('phone','手机不能为空',true);  
            return false;
        }
        if($.regTest('phone',phone)) {        
            this.sendNum(phone);     
            return true;
         }else {
            this.error_msg('phone','请输入有效的手机号码',true);    
            return false;   
        }
    }

    /**
    * 请求验证码
    */
    sendNum( phone ) {

        var self = this;   

        let datas = {
            mobile:phone,
            type:1,
        };

        $.GetAjax('/v1/system/sendCode', datas, 'GET', true, function(data , state) {    
            if (state && data.code == 1){
                self.sendNumToUser(phone,data);
                self.startTimer(60);            
            } else if (state && data.code == 11){
                self.error_msg('phone','您输入的手机号码未注册',true);            
            } else {
                self.error_msg('phone',data.message,true);
            }
        });

    }


    startTimer( countdown ) {

        var btn=this.refs.btn_num;

        if (countdown == 0) { 
            btn.removeAttribute("disabled");    
            btn.innerHTML="获取验证码"; 
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



    startJumpTimer( countdown ) {
        var text=this.refs.jump;

        console.log(text);

        if (countdown == 0) { 
            hashHistory.push('/login');
            return;
        } else { 
            text.setAttribute("disabled", true); 
            text.innerHTML="" + countdown + "秒后跳转到登录页面。";             
            countdown--; 
        } 

        this.jumpTimeoutId = setTimeout(() => {
        this.startJumpTimer(countdown);
        }, 1000)

    }



    /**
    * 发送验证码给用户
    */
    sendNumToUser(phone,data) {

        alert(phone+'验证码是：'+data.data);      

        this.phoneOk=true;
        this.phone=phone;
    }





    /**
    * 显示错误信息
    */
    error_msg(id,msg,show)
    {
        var error;
        console.log(id);
        switch (id) {
            case 'phone':
                error=this.refs.error_msg_phone;               
                break;
            case 'num':
                error=this.refs.error_msg_num;
                break; 
            case 'pass':
                error=this.refs.error_msg_pass;               
                break;
            case 'passr':
                error=this.refs.error_msg_passr;
                break;          
        }

        if( error ) {
            this.setError(error,msg,show); 
        }
    }

    setError( error,msg,show ) {

        if( show ) {
            if( msg ) {
                error.innerHTML=msg; 
            }
            error.style.opacity=1;  
        }else {
            error.style.opacity=0; 
        } 

    }

    /**
    * 清理错误信息
    */
    clear( id,event ) {

        this.error_msg(id,false);

    }

    back() {

        if(this.step==2) {
            this.jumpToPage(1);           
        }else {
            hashHistory.push('/login');
        }

    }


    render() {
        return (
        <div className="container-forget">  
            <Link  to="/index">
                <div className="img_head"></div>
            </Link>          
            <div id="wrapper" className="forget-page">                
                <div className="forget_form_head">
                    <Link to="/login"><a className="login">马上登录</a></Link>
                    <a className="back" onClick={this.back.bind(this)}>返回</a>
                    <p className="forget_head_msg">忘记密码</p>
                </div>
                <div className="form">
                    <div className="forget_step_one">
                        <img src="../../images/login/step1.png" alt=""/>
                        <input ref="phone" className="login_input" type="text" placeholder="手机号" onChange={this.clear.bind(this,'phone')} />
                        <p ref="error_msg_phone" className="msg_error" >手机号码错误</p>

                        <input ref="num" className="login_input" type="text" id="num" placeholder="验证码" onChange={this.clear.bind(this,'num')}/>
                        <button   ref="btn_num" className="login_btn" id="get_num" onClick={this.getNum.bind(this)}>获取验证码 </button>  

                        <p ref="error_msg_num" className="msg_error">验证码错误</p>
                        <button  className="login_btn"  onClick={this.checkNum.bind(this)} >下一步 </button>                     
                    </div>
                    <div className="forget_step_two">
                        <img src="../../images/login/step2.png" alt=""/>
                        <input ref="pass"  className="login_input" type="password" placeholder="设置新密码" onChange={this.clear.bind(this,'pass')} onBlur={this.checkPass.bind(this)} />
                        <p ref="error_msg_pass" className="msg_error" >密码格式不正确</p>
                        <input ref="passr"  className="login_input" type="password" placeholder="再次输入新密码" onChange={this.clear.bind(this,'passr')}/>
                        <p ref="error_msg_passr" className="msg_error">密码不同</p>
                        <button className="login_btn" id="forget" onClick={this.checkForget.bind(this)} >完成</button>                     
                    </div> 
                </div>             
            </div>
                <div className="forget_step_three">
                    <p className="reset">密码重置</p>
                    <h1>成功!</h1>
                    <div className="reset_success"></div>
                    <div className="div-success">
                        <p ref="jump" className="jump">3秒后跳转到登录页面。</p>
                        <Link to="/login"><a className="jumpnow">立即跳转</a></Link>
                    </div>                        
                </div>
        </div>
        )
        }
}

module.exports = Containerforget