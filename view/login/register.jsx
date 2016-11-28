
import React from 'react';
import { Link ,hashHistory} from 'react-router';
import "./register.less";

class ContainerLogin extends React.Component {
	constructor(props) {
		super(props);
        this.state = {       
        nameOk:false,
        passOk:false,
        passrOk:false,
        phoneOk:false,
      };
	}
	componentDidMount() {
       	
	}
/**
 * 检测用户名规则
 */
    checkName(event)
  {
      
    var name=event.target.value;   
    console.log(name);
    var regExp1=new RegExp("(^[\\u4e00-\\u9fa5A-Za-z0-9])([\\u4e00-\\u9fa5A-Za-z0-9_]{3,11})");
    var regExp2=new RegExp("^\\d+$");
    var regExp3=new RegExp("^(.)\\1+$");

    if(regExp1.test(name)&&!regExp2.test(name)&&!regExp3.test(name))
    {
         console.log('用户名格式通过');
         this.checkNameExisted(name);

    }else {       

        this.error_msg('name','用户名不通过',true);
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
    $.GetAjax('/v1/personal/check', datas, 'POST', true, function(data , state) 
                  {                  
                    if (state && data.code == 1) 
                    {
                         console.log('用户名未被注册');
                           self.setState({
                                nameOk: true
                                        });              
                     } else {
                        console.log('用户名被注册');
                         self.error_msg('name','用户名已被注册',true);
                     }
                  }); 
  }
/**
 * 检测密码规则
 */
    checkPass(event)
  {
     var pass=event.target.value;
      console.log(pass);
     var regExp1=new RegExp("[\\w]{6,16}");
     if(regExp1.test(pass))
     {

        this.setState({
              passOk: true
                     });
        console.log('密码通过');        
     }else {
         this.error_msg('pass','密码不通过',true);    
     }

    
  } 
/**
 * 检测密码重复
 */
    checkPassRepeat()
  {
     var pass= this.refs.password.value;
     var passr=event.target.value;
     if(pass==passr)
     {
          this.setState({
              passrOk: true
                     });
        console.log('重复通过');
     }else {
        this.error_msg('passr','密码输入不一致',true);   
     }
  }
        getNum(event)
    {
    if(this.checkPhone())
    {
       
    }

    }


    sendNum()
    {

     var self = this;
     var phone=this.refs.phonenum.value;
     let datas = {
                 mobile:phone,
                 type:0,
                  };
    $.GetAjax('/v1/system/sendCode', datas, 'GET', true, function(data , state) 
                  {                  
                    if (state && data.code == 1) 
                    {
                          alert('验证码是：'+data.data);               
                     } else {
                         error_msg('phone','手机已被注册',true);
                     }
                  }); 
    }

/**
 * 检测手机规则
 */
    checkPhone()
   {     
     var phone=this.refs.phonenum.value;
     console.log(phone);
     if(!phone)
     {
        this.error_msg('phone','手机不能为空',true);  
        return false;
     }

     var regExp1=new RegExp("^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$");       
     if(regExp1.test(phone))
     {        
        this.checkPhoneExisted(phone);      
        return true;
     }else {
         this.error_msg('phone','手机格式不正确',true);    
        return false;   
     }
   }


   /**
 * 检测手机是否被注册
 */
  checkPhoneExisted(phone)
  {

    var self = this;
     let datas = {
                 cmd:'mobile',                 
                 mobile:phone,
                  };
    $.GetAjax('/v1/personal/check', datas, 'POST', true, function(data , state) 
                  {                  
                    if (state && data.code == 1) 
                    {
                         console.log('手机未被注册');
                           self.setState({
                                phoneOk: true
                                        }); 
                          self.sendNum();              
                     } else {
                        console.log('用户名被注册');
                         self.error_msg('phone','手机已被注册',true);
                     }
                  }); 
  }
/**
 * 点击注册
 */
    checkRegister()
  {       
    if(this.state.nameOk&&this.state.passOk&&this.state.passrOk&&this.state.phoneOk)
    {    
      var name=this.refs.name.value; 
      var pass=this.refs.password.value;
      var passr=this.refs.passr.value;
      var phone=this.refs.phonenum.value;
      var num=this.refs.num.value;
      this.register(name,pass,passr,phone,num);
    }
  }

/**
 * 注册
 */
    register(name,pass,passr,phone,num)
  {
     var self = this;
     var phone=this.refs.phonenum.value;
     let datas = {
                 account:name,
                 password:pass,
                 passwordRepeat:passr,
                 mobile:phone,
                 validCode:num,
                  };

      $.GetAjax('/v1/personal/register', datas, 'GET', true, function(data , state) 
                  {                  
                    if (state && data.code == 1) 
                    {                          
                        self.registerSucess(data);         
                     } else {
                        self.registerFailed(data);
                     }
                  }); 

  }

    registerSucess(data)
    {
                alert('注册成功:'+data.data);
                console.log(data); 
    }

     registerFailed(data)
    {
                alert('注册失败:'+data.data);
                console.log(data); 
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
        if(error)
        {
            this.setError(error,msg,show); 
        }
    }

    setError(error,msg,show)
    {
        if(show)
        {
         if(msg)
            {
               error.innerHTML=msg; 
            }
        
        error.style.opacity=1;  
        }else {
        error.style.opacity=0; 
        } 
    }
    clear(id,event)
    {
      console.log(id);
      console.log(event);
      this.error_msg(id,false);
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
                        <input ref="name" className="login_input" type="text" placeholder="用户名4-16位,支持中文、数字、字母" id="user_name" onBlur={this.checkName.bind(this)} onChange={this.clear.bind(this,'name')}/>
                          <p ref="error_msg_name" className="msg_error" >警告用户名规则</p>
                        <input ref="password" className="login_input" type="password" placeholder="设置密码:6-16位,支持数字、字母、字符" id="password" onBlur={this.checkPass.bind(this)} onChange={this.clear.bind(this,'pass')}/>
                          <p ref="error_msg_pass" className="msg_error" >警告密码规则</p>
                        <input ref="passr" className="login_input" type="password" placeholder="确认密码" id="password" onBlur={this.checkPassRepeat.bind(this)} onChange={this.clear.bind(this,'passr')} />
                          <p ref="error_msg_passr" className="msg_error" >警告密码重复</p>
                        <input ref="phonenum" className="login_input" type="text" placeholder="手机号码" id="password" onChange={this.clear.bind(this,'phone')}/>
                          <p ref="error_msg_phone" className="msg_error" >警告手机号规则</p>
                        <input ref="num" className="login_input" type="text" placeholder="手机验证码" id="password"  onChange={this.clear.bind(this,'num')}/>
                          <p ref="error_msg_num" className="msg_error" >请输入验证码</p>

                        <button className="login_btn" id="getnum" onClick={this.getNum.bind(this)}>获取验证码</button>
                        
                        <button  className="login_btn" id="register" onClick={this.checkRegister.bind(this)}>注 册</button>
                                             
                </div>
            </div>
        </div>
        )
    }
}

module.exports = ContainerLogin