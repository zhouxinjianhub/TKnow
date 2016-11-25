
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
        var self = this;
		
        // $("#user_name").change(function(event) {
        //     /* Act on the event */
        // });
	}
   

	render() {
        return (
        <div className="container-login">  
           <div className="img_head"></div>          
           <div id="wrapper" className="login-page">                
                <div className="login_form_head">
                   <p className="login_head_msg">忘记密码</p>
                </div>
                <div className="forget_step_one">
                    <input type="text" placeholder="手机号" id="user_name" />
                    <p className="msg_error" ></p>
                    <input type="password" placeholder="验证码" id="password" />
                    <p className="msg_error">验证码错误</p>
                    <button id="login">下一步 </button>                     
                </div>
                 <div className="forget_step_one">
                    <input type="text" placeholder="设置新密码" id="user_name" />
                    <p className="msg_error" ></p>
                    <input type="password" placeholder="再次输入新密码" id="password" />
                    <p className="msg_error">密码不同</p>
                    <button id="login">完成</button>                     
                </div>                 
            </div>
            <div className="forget_step_one">
                        <p>密码重置</p>
                        <h1>成功！</h1>
                        <div></div>
                        <p>3秒中后跳转到登录页面</p>
                     
                </div>
        </div>
        )
    }
}

module.exports = ContainerLogin