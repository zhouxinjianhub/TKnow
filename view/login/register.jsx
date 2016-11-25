
import React from 'react';
import { Link ,hashHistory} from 'react-router';
import "./register.less";

class ContainerLogin extends React.Component {
	constructor(props) {
		super(props);
        this.state = {       
        data:"",
      };
	}
	componentDidMount() {
       
		$("#login").click(function() {
            console.log('点击按钮');
            self.check_login();
            return false;
        })
	}
  

	render() {
        return (
        <div className="container-register">            
            <div id="wrapper" className="login-page">
                <div className="img_head"></div>
                <div className="login_form_head">
                 <p className="login_head_msg">注 册</p>
                </div>
                <div id="login_form" className="form">
                        <input className="login_input" type="text" placeholder="用户名4-16位,支持中文、数字、字母" id="user_name" />
                          <p className="msg_error" >警告</p>
                        <input  className="login_input" type="password" placeholder="设置密码:6-16位,支持数字、字母、字符" id="password" />
                          <p className="msg_error" >警告</p>
                        <input className="login_input" type="password" placeholder="确认密码" id="password" />
                          <p className="msg_error" >警告</p>
                        <input className="login_input" type="text" placeholder="手机号码" id="password" />
                          <p className="msg_error" >警告</p>
                        <input className="login_input" type="text" placeholder="手机验证码" id="password" />

                        <button className="login_btn" id="getnum" >获取验证码</button>
                        
                        <button  className="login_btn" id="register">注 册</button>
                                             
                </div>
            </div>
        </div>
        )
    }
}

module.exports = ContainerLogin