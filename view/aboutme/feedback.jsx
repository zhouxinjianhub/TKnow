
import React from 'react';

class Feedback extends React.Component {
	focusCheck(e) {
		e.target.style.borderColor = '#49befc';
	}
	blurCheck(e) {
		e.target.style.borderColor = '#ccc';
	}
	render() {
		return (
			<div className="aboutme-feedback">
				<div className="aboutme-input">
					<b>意见建议</b>
					<textarea className="inputer" placeholder="请在此输入您得意见或建议。。。。。。。。。。。。" onFocus={this.focusCheck.bind(this)} onBlur={this.blurCheck.bind(this)}></textarea>
				</div>
				<div className="aboutme-input">
					<b>电子邮箱</b>
					<input type="text" className="inputer" onFocus={this.focusCheck.bind(this)} onBlur={this.blurCheck.bind(this)}/>
				</div>
				<div className="aboutme-input">
					<b>手机号码</b>
					<input type="text" className="inputer" onFocus={this.focusCheck.bind(this)} onBlur={this.blurCheck.bind(this)}/>
				</div>
				<p className="texter">请在此留下您的联系方式</p>
				<p className="texter">以便我们将处理结果通知您，您的私人信息将受到严格保密</p>
				<input type="button" value="发  送" className="aboutme-submit"/>
			</div>
		)
	}
}

module.exports = Feedback