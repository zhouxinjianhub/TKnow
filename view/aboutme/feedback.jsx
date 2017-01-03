
import React from 'react';

class Feedback extends React.Component {
	focusCheck(e) {
		e.target.style.borderColor = '#49befc';
	}
	blurCheck(e) {
		e.target.style.borderColor = '#ccc';
	}
	sublimeBtn(e) {
		let textareaVal = this.refs.feedarea.value.trim();
		let emailVal = this.refs.feedemail.value.trim();
		let phoneVal = this.refs.feedphone.value.trim();
		let errorCont = "";

		if ( !$.regTest('null',textareaVal) ) {
			errorCont+="意见或建议不能为空<br/>";
			$(this.refs.feedarea).val("").css({
				borderColor: 'red'
			});
		}

		if ( !$.regTest('email',emailVal) ) {
			errorCont+="电子邮箱格式不正确<br/>";
			$(this.refs.feedemail).val("").css({
				borderColor: 'red'
			});
		}

		if ( !$.regTest('phone',phoneVal) ) {
			errorCont+="手机号码格式不正确<br/>";
			$(this.refs.feedphone).val("").css({
				borderColor: 'red'
			});
		}

		if ( errorCont ) {
			layer.open({
				title: '意见反馈',
				content: '<div>'+errorCont+'</div>',
				// scrollbar: false
			});
			return false;
		}

		e.target.value = "正在提交";
		this._addFeedback({
			content: textareaVal,
			email: emailVal,
			phone: phoneVal
		},e.target);
	}
	_addFeedback(option,target) {
		$.GetAjax('/v1/tianji/addFeedback',option,'GET',false,(data,state)=>{
			if ( state && data.code == 1 ) {
				layer.msg('反馈成功，我们会尽快与您联系！', {icon: 6});
				target.value = "发送";
			}else{
				layer.msg('反馈失败');
				target.value = "重新反馈";
			}
		});
	}
	render() {
		return (
			<div className="aboutme-feedback">
				<div className="aboutme-input">
					<b>意见建议</b>
					<textarea className="inputer" placeholder="请在此输入您得意见或建议。。。。。。。。。。。。" onFocus={this.focusCheck.bind(this)} onBlur={this.blurCheck.bind(this)} ref="feedarea"></textarea>
				</div>
				<div className="aboutme-input">
					<b>电子邮箱</b>
					<input type="text" className="inputer" placeholder="必填" onFocus={this.focusCheck.bind(this)} onBlur={this.blurCheck.bind(this)} ref="feedemail"/>
				</div>
				<div className="aboutme-input">
					<b>手机号码</b>
					<input type="text" className="inputer" placeholder="必填" onFocus={this.focusCheck.bind(this)} onBlur={this.blurCheck.bind(this)} ref="feedphone"/>
				</div>
				<p className="texter">请在此留下您的联系方式</p>
				<p className="texter">以便我们将处理结果通知您，您的私人信息将受到严格保密</p>
				<input type="button" value="发  送" className="aboutme-submit" onClick={this.sublimeBtn.bind(this)}/>
			</div>
		)
	}
}

module.exports = Feedback