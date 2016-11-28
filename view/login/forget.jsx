
import React from 'react';
import { Link ,hashHistory} from 'react-router';
import "./forget.less";

class Containerforget extends React.Component {
	constructor(props) {
		super(props);
        this.state = {       
        data:"",
      };
	}
	componentDidMount() {
        var self = this;

         $('.login_btn').click(function() {
            $('.forget_step_one').animate({
                height: 'toggle',
                opacity: 'toggle'
            }, 'slow');


            $('.forget_step_two').animate({
                height: 'toggle',
                opacity: 'toggle'
            }, 'slow');


        });
		
	}
   

	render() {
        return (
        <div className="container-forget">  
           <div className="img_head"></div>          
           <div id="wrapper" className="forget-page">                
                <div className="forget_form_head">
                   <p className="forget_head_msg">忘记密码</p>
                </div>
                <div className="form">
                <div className="forget_step_one">
                    <input className="login_input" type="text" placeholder="手机号" id="user_name" />
                    <p className="msg_error" ></p>
                     <button  className="login_btn" >获取验证码 </button>    
                    <input className="login_input" type="password" placeholder="验证码" id="password" />
                    <p className="msg_error">验证码错误</p>
                    <button  className="login_btn"  id="forget">下一步 </button>                     
                </div>

                 <div className="forget_step_two">
                    <input className="login_input" type="password" placeholder="设置新密码" id="user_name" />
                    <p className="msg_error" ></p>
                    <input className="login_input" type="password" placeholder="再次输入新密码" id="password" />
                    <p className="msg_error">密码不同</p>
                    <button className="login_btn" id="forget">完成</button>                     
                </div> 
                </div>             
            </div>

            <div className="forget_step_three">
                        <p>密码重置</p>
                        <h1>成功！</h1>
                        <div className="reset_success"></div>
                        <p>3秒中后跳转到登录页面</p>
                     
            </div>
        </div>
        )
    }
}

module.exports = Containerforget