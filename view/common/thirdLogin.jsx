
import React from 'react';
import { Link ,hashHistory} from 'react-router';
import "./thirdLogin.less";

class ContainerthirdLogin extends React.Component {
    constructor(props) {
        super(props);
        this.nameOk = false;
        this.passOk = false;
        this.passrOk = false;
        this.toloading = true;
        this.access_token = "";
        this.nickName = "";
        this.thirdData = "";
        this.type = 0;
    }
    componentDidMount() {
        let urlModule = this.props.location.hash;

        if ( urlModule ) {
            this.splitUrlToken(urlModule);
        }
        
    }
    splitUrlToken(param){
        let url = param.split('#')[1];
        let string = url.split('&');
        let res = {};
        for ( let i = 0; i<string.length; i++ ) {
            var str = string[i].split('=');
            res[str[0]] = str[1];
        }

        if ( res['access_token'] ) {
            this.access_token = res['access_token'];
            this.type = 0;
            let userMess = $.userlogin();
            // 已登录状态
            if ( userMess ) {
                this.hasTokenBand(this.access_token,this.type);
            }
            // 未登录状态
            else{
                this.reviewTokenBand(this.access_token,this.type);
            }
        }

        if ( res['code'] ) {
            this.access_token = res['code'];
            this.type = 1;
            let userMess = $.userlogin();
            // 已登录状态
            if ( userMess ) {
                this.hasTokenBand(this.access_token,this.type);
            }
            // 未登录状态
            else{
                this.reviewTokenBand(this.access_token,this.type);
            }
            
        }
    }
    // 已经登录，直接绑定
    hasTokenBand(code,type) {
        let config = {
            code: code,
            type: type
        };
        
        $.GetAjax('/v1/personal/inner/band', config, 'Get', true, (data, state) => {                  
            if (state && data.code == 1) {
                layer.closeAll('loading');
                hashHistory.push('/user');
            } else {
                layer.closeAll('loading');
                layer.open({
                    icon: 5,
                    title: '错误',
                    content: '<div>'+data.message+'</div>',
                    yes: function(layero, index){
                        hashHistory.push('/');
                        layer.close(layero);
                    }
                });
            }
        }); 
    }

    // 验证用户是否已经绑定了该账号
    reviewTokenBand(code,type) {
        let config = {
            code: code,
            type: type
        };
        
        $.GetAjax('/v1/personal/thirdLogin', config, 'Get', true, (data, state) => {                  
            if (state && data.code == 1) {
                layer.closeAll('loading');
                $.cookie('account', data.data.account);
                $.cookie('nickname', this.type == 0 ? data.data.qqNickName : data.data.weixinNickName);
                $.cookie('token', data.data.token);
                $.cookie('member', $.encodeBase64(data.data.type,10));
                hashHistory.push('/user');
            } else if ( state && data.code == 19 ) {  // 19是需要绑定
                this.toloading = false;
                this.thirdData = data.data;
                this.nickName = this.type == 0 ? data.data.qqNickName : data.data.weixinNickName;
                layer.closeAll('loading');
                this.setState({
                    loading: false
                });
            }else{
                layer.open({
                    icon: 2,
                    title: '错误',
                    content: '<div>'+data.message+'</div>',
                    yes: function(layero, index){
                        layer.close(layero);
                        location.href = $.thirdxhr;
                    }
                });
            }
        }); 
    }

    // 移除组件
    componentWillUnmount() {
        clearTimeout(this.timeoutId)
    }
    /**
    * 检测用户名规则
    */
    checkName(event) {
        var name=$.trim(event.target.value);

        if ( !$.regTest('num',name) ) {
            this.checkNameExisted(name);
        } else {       
            this.error_msg('name','请输入有效的用户名',true);
        }
    } 
    /**
    * 检测用户名是否存在
    */
    checkNameExisted(name) {
        let datas = {
            cmd:'account',
            account:name
        };
        $.GetAjax('/v1/personal/check', datas, 'POST', true,(data , state) => {                  
            if ( state && data.code == 1 ) {
                this.nameOk = true;
            } else {
                this.error_msg('name',data.message,true);
            }
        }); 
    }
    /**
    * 检测密码规则
    */
    checkPass(event) {
        var pass=$.trim(event.target.value);

        if ( $.regTest('password',pass) ) {
            this.passOk = true;
        } else {
            this.error_msg('pass','请输入有效的密码',true);
        }
    } 
    /**
    * 检测密码重复
    */
    checkPassRepeat(event){

        var passr = $.trim(event.target.value);
        if( !$.regTest('password',passr) ) {
            this.error_msg('passr','密码格式有误',true);
            return false;
        }
        var pass = $.trim(this.refs.password.value);

        if( pass == passr ) {
            this.passrOk = true;
        }else {
            this.error_msg('passr','密码输入不一致',true);
        }

    }

    /**
    * 点击注册
    */
    checkRegister() {

        let name = this.refs.name.value; 
        let pass = this.refs.password.value;
        let passr = this.refs.passr.value;

        if ( $.regTest('num',name) ) {
            this.nameOk = false;
            this.error_msg('name','请输入用户名',true);
        }else{
            this.nameOk = true;
        }
        
        if ( !$.regTest('password' ,pass) ) {
            this.nameOk = false;
            this.error_msg('pass','请设置您的密码',true);
        }else{
            this.passOk = true;
        }
        
        if ( !$.regTest('password' ,passr) ) {
            this.nameOk = false;
            this.error_msg('passr','请再次输入您的密码',true);
        }else{
            this.passrOk = true;
        }

        if ( this.nameOk && this.passOk && this.passrOk ) {
            let registConfig = {
                openId: this.type == 0 ? this.thirdData.qqOpenid : this.thirdData.weinxinOpenid,
                type: this.type,
                account: name,
                nickname: this.type == 0 ? this.thirdData.qqNickName : this.thirdData.weixinNickName,
                avatar: this.thirdData.avatar,
                password: pass
            }
            this.register(registConfig);
        }
    }

    /**
    * 注册
    */
    register(config) {
        $.GetAjax('/v1/personal/mainBand', config, 'GET', true, function(data , state) {                  
            if ( state && data.code == 1 ) {                          
                layer.msg('恭喜，注册成功！');
                $.cookie('account', data.data.account);
                $.cookie('nickname', data.data.nickname);
                $.cookie('token', data.data.token);
                $.cookie('member', $.encodeBase64(data.data.type,10));
                hashHistory.push('/');
            } else {
                layer.msg('注册失败');
            }
        }); 
    }

    /**
    * 显示错误信息
    */
    error_msg(id,msg,show){
        var error;
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
            default: break;
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

    clear(id,event){
        this.error_msg(id,false);
    }
    /**
    * 警告
    */
    warning(id,event){
        var warning;
        switch (id) {
            case 'name':
            warning = this.refs.error_msg_name;               
            break;                  
        }

        if ( warning ) {
            warning.style.opacity = 1;
        }
    }
    popService(){
        layer.open({
            type: 2,
            title: '注册协议',
            area: ['900px', '600px'],
            shade: 0.8,
            closeBtn: 0,
            shadeClose: true,
            scrollbar: false,
            content: '../../routes/login/provision.html'
        });
    }

    render() {
        if ( this.toloading ) {
            layer.load(3);
            return false;
        }
        return (
            <div className="container-thirdLogin">
                <div id="wrapper" className="login-page">
                    <Link  to="/index">
                        <div className="img_head"></div>
                    </Link>
                    <div className="login_form_head">
                        <p className="login_head_msg">完善信息</p>
                    </div>
                    <div id="login_form" className="form">
                        <p className="welcome">欢迎您，{ this.nickName }</p>
                        <p className="welcome">完善您的信息，以后就也可以通过用户名和密码进行登录了</p>
                        <input ref="name" className="login_input" type="text" placeholder="用户名4-12位,支持中文、数字、字母" id="user_name" onBlur={this.checkName.bind(this)} onChange={this.clear.bind(this,'name')} onFocus={this.warning.bind(this,'name')}/>
                        <p ref="error_msg_name" className="msg_error" >用户名一旦设置成功无法修改</p>
                        <input ref="password" className="login_input" type="password" placeholder="设置密码:6-16位,支持数字、字母、字符" id="password" onBlur={this.checkPass.bind(this)} onChange={this.clear.bind(this,'pass')}/>
                        <p ref="error_msg_pass" className="msg_error" >警告密码规则</p>
                        <input ref="passr" className="login_input" type="password" placeholder="请再次输入您的密码"  onBlur={this.checkPassRepeat.bind(this)} onChange={this.clear.bind(this,'passr')} />
                        <p ref="error_msg_passr" className="msg_error" >警告密码重复</p>

                        <p className="msg_register">点击[提交]，既代表您同意 <a onClick={this.popService}>《服务平台用户注册协议》</a></p>
                        <button  className="login_btn" id="register" onClick={this.checkRegister.bind(this)}>提 交</button>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = ContainerthirdLogin