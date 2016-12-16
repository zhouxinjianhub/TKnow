
import React from 'react';
import { Link ,hashHistory} from 'react-router';
import "./login.less";
import "./loginCommon.less";

class ContainerLogin extends React.Component {
	constructor(props) {
        super(props);
        this.state = {       
            data:""
        };
	}
	componentDidMount() {
        
	}
      
    /**
    * 点击登录
    */
    checkLogin( e ) {    

        var self = this;       
        var name =  this.refs.username.value.trim();
        var pass = this.refs.password.value.trim();

        if ( !name ) {
            self.error_name_msg("请输入账户/手机号码");            
            return false;
        }

        if ( !pass ) {
             self.error_password_msg("请输入密码");           
            return false;
        }

        self.requset_login(name,pass)  
       
    }

    requset_login( name,pass ) {
        var self = this;

        let datas = {
            username:name,
            password:pass
        };

        $.GetAjax('/v1/personal/login', datas, 'POST', true, function(data , state) {

            if ( state && data.code == 1 ) {

                self.jumpToIndex(data);      

            } else {

                self.error_password_msg("您输入的帐号/密码有误，请重新输入");   

            }
        }); 
    }

    jumpToIndex(data){    

        var account=data.data.account,
            nickname=data.data.nickname,
            token=data.data.token;

        this.setCookie(account,nickname,token);
    }


    setCookie(account,nickname,token){

        $.cookie('account', account); 
        $.cookie('nickname', nickname); 
        $.cookie('token', token); 
        this.props.source ? this.props.closeMsk(true) : hashHistory.push('/index');
    }
    /**
     * 显示帐号名下方的错误
     */
   
    error_name_msg(msg){

        var error_name=this.refs.error_msg_name;
        error_name.innerHTML=msg;
        error_name.style.opacity=1;    
    
    }
    /**
     * 显示密码下方的错误
     */
    error_password_msg(msg){

        var error_name=this.refs.error_msg_pass;
        error_name.innerHTML=msg;
        error_name.style.opacity=1;

    }

    cleanError(){

        this.refs.error_msg_pass.style.opacity=0;
        this.refs.error_msg_name.style.opacity=0;
    }

	render() {
        
        return (
            <div className={ this.props.source ? "container-login other" : "container-login" }>
                    {(()=>{
                        return this.props.source ?  null : <Link to="/index"><div className="img_head"></div></Link>
                    })()}  
                <div id="wrapper" className="login-page">
                    <div className="login_form_head">
                        <p className="login_head_msg">登 录</p>
                        {(()=>{
                            return this.props.source ?  <p className="no_login">抱歉，您需要登陆后，才可发表评论~</p> : null
                        })()}
                    </div> 
                    <div id="login_form" className="form">
                        <input ref="username" className="login_input"  type="text" placeholder="请输入账户/手机号码" id="user_name"  onChange={this.cleanError.bind(this)}/>
                        <p ref="error_msg_name" className="msg_error" >帐号错误</p>
                        <input ref="password" className="login_input"  type="password" placeholder="请输入密码" id="password" />
                        <p ref="error_msg_pass" className="msg_error">密码错误</p>
                        <button className="login_btn" id="login" onClick={this.checkLogin.bind(this)}>登　录 </button>
                        <Link to="/register"><a className="register" >新用户注册</a></Link>
                        <Link to="/forget"><a className="forget">忘记密码?</a></Link>

                        {(()=>{
                            let third = [
                                <p className="text_login_other">-——————  第三方帐号登录  ——————-</p>,
                                <a href={$.thirdxhr} className="login_qq"></a>,
                                <a href="https://open.weixin.qq.com/connect/qrconnect?appid=wxb0cf58edd59d5db9&redirect_uri=http%3a%2f%2fwww.tknows.com&response_type=code&scope=snsapi_login#wechat_redirect" className="login_weixin"></a>
                            ];
                            return this.props.source ?  null : third
                        })()}
                        
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = ContainerLogin