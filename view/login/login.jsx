
import React from 'react';
import { Link ,hashHistory} from 'react-router';
import "./login.less";

class ContainerLogin extends React.Component {
	constructor(props) {
		super(props);
        this.state = {       
        data:"",

      };
	}
	componentDidMount() {
        
	}
    /**
     * qq登录
     */
    loginByQq(e)
    {
        alert("qq登录");
    }
     /**
      * 微信登录
      */
     loginByWeixin(e)
    {
        alert("微信登录");
    }
  
     /**
      * 点击登录
      */
    checkLogin(e)
    {         
       console.log(e);
        var self = this;       
        var name =  this.refs.username.value.trim();
         console.log(name);
        var pass = this.refs.password.value.trim();
         console.log(pass);
        if (!name)
        {
            self.error_name_msg("请输入账户/手机号码 ");            
            return false;
        }

        if (!pass)
        {
             self.error_password_msg("请输入密码");           
            return false;
        }
       
       self.requset_login(name,pass)  
       
    }

    requset_login(name,pass)
    {
           var self = this;

           let datas = {
                 username:name,
                 password:pass,
                            };
            $.GetAjax('/v1/personal/login', datas, 'POST', true, function(data , state) 
                  {
                        
                          console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status); 

                    if (state && data.code == 1) 
                    {
                          self.jumpToIndex();                  
                     } else {
                        self.error_password_msg("您输入的帐号/密码有误，请重新输入"); 


                         // $("#login").removeClass('shake_effect');
                         //                setTimeout(function() {
                         // $("#login").addClass('shake_effect')
                         //                                        }, 1);     
                     }
                  }); 
    }

    jumpToIndex()
    {       
        alert('跳转到首页');
    }
    /**
     * 显示帐号名下方的错误
     */
   
    error_name_msg(msg)
    {
        var error_name=this.refs.error_msg_name;
        error_name.innerHTML=msg;
        error_name.style.opacity=1;    
    
    }
    /**
     * 显示密码下方的错误
     */
    error_password_msg(msg)
    {
        var error_name=this.refs.error_msg_pass;
        error_name.innerHTML=msg;
        error_name.style.opacity=1;  
    }

    cleanError()
    {

        this.refs.error_msg_pass.style.opacity=0;
        this.refs.error_msg_name.style.opacity=0;
    }

	render() {
        return (
        <div className="container-login">            
            <div id="wrapper" className="login-page">
                <div className="img_head"></div>
                <div className="login_form_head">
                 <p className="login_head_msg">登 录</p>
                </div> 
                <div id="login_form" className="form">
                        <input ref="username" className="login_input"  type="text" placeholder="请输入帐号/手机号" id="user_name"  onChange={this.cleanError.bind(this)}/>
                        <p ref="error_msg_name" className="msg_error" >帐号错误</p>
                        <input ref="password" className="login_input"  type="password" placeholder="请输入密码" id="password" />
                        <p ref="error_msg_pass" className="msg_error">密码错误</p>
                        <button className="login_btn" id="login" onClick={this.checkLogin.bind(this)}>登　录 </button>
                        <Link to="/register"><a className="register" >新用户注册</a></Link>
                        <Link to="/forget"><a className="forget">忘记密码?</a></Link>
                        <p className="text_login_other">-——————  第三方帐号登录  ——————-</p>
                        <div className="login_qq" onClick={this.loginByQq.bind(this)}></div>
                        <div className="login_weixin" onClick={this.loginByWeixin.bind(this)}></div>
                </div>
            </div>
        </div>
        )
    }
}

module.exports = ContainerLogin