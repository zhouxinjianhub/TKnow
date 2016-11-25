
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
		$("#login").click(function() {
            console.log('点击按钮');
            self.check_login();
            return false;
        })

        $(".login_qq").click(function() {            
            self.login_qq();
            return false;
        })

        $(".login_weixin").click(function() {         
            self.login_weixin();
            return false;
        })


        // $("#user_name").change(function(event) {
        //     /* Act on the event */
        // });
	}
    /**
     * qq登录
     */
    login_qq()
    {
        alert("qq登录");
    }
     /**
      * 微信登录
      */
     login_weixin()
    {
        alert("微信登录");
    }
  
     /**
      * 点击登录
      */
    check_login()
    {
        var self = this;
        var name = $("#user_name").val();
        var pass = $("#password").val();
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
       

        if (name && pass) {
               self.requset_login(name,pass)      

        } else {

            $("#login_form").removeClass('shake_effect');
            setTimeout(function() {
                $("#login_form").addClass('shake_effect')
            }, 1);

        }
    }

    requset_login(name,pass)
    {
           var self = this;
           let datas = {
                 username:name,
                 password:pass,
                            };
            $.GetAjax('/api/v1/personal/login', datas, 'POST', true, function(data , state) 
                  {
                         alert("code: " + data.code + "\nStatus: " + status);
                          console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status); 

                    if (state && data.code == 1) {
                                that.setState({
                                data:data
                                              });
                     } else {
                        self.error_password_msg("您输入的帐号/密码有误，请重新输入"); 
                     }


                  }); 
    }
    /**
     * 显示帐号名下方的错误
     */
    error_name_msg(e)
    {
        console.log(e);
        
    }
    /**
     * 显示密码下方的错误
     */
    error_password_msg(e)
    {
        console.log(e);
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
                        <input className="login_input" type="text" placeholder="请输入帐号/手机号" id="user_name" />
                        <p className="msg_error" >帐号错误</p>
                        <input className="login_input"  type="password" placeholder="请输入密码" id="password" />
                        <p className="msg_error">密码错误</p>
                        <button className="login_btn" id="login">登　录 </button>
                        <Link to="/register"><a className="register" >新用户注册</a></Link>
                        <Link to="/forget"><a className="forget">忘记密码?</a></Link>
                        <p className="text_login_other">-——————  第三方帐号登录  ——————-</p>
                        <div className="login_qq"></div>
                        <div className="login_weixin"></div>
                </div>
            </div>
        </div>
        )
    }
}

module.exports = ContainerLogin