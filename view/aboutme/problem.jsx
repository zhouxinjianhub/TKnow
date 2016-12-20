
import React from 'react';
import { Link } from 'react-router';

class Problem extends React.Component {
	render() {
		return (
			<div className="aboutme-content">
				<strong>1、无法注册怎么办？</strong>
				<p>答：您可以尝试：</p>
				<p>1> 手机号码或用户名是否被系统提示已经注册过，如已注册，请直接登录；</p>
				<p>2> 由于浏览器兼容问题导致无法注册，请尝试使用其他浏览器打开。</p>
				<strong>2、无法登录怎么办？</strong>
				<p>答：您可以尝试：</p>
				<p>1> 如您忘记密码，请点击“忘记密码”，按照页面提示找回密码；</p>
				<p>2> 如您忘记用户名或者手机号码已更换，您可以选择重新注册，或者联系我们，我们会及时为您处理；</p>
				<p>3> 如仍无法解决，建议您重新注册。</p>
				<strong>3、忘记密码怎么办？</strong>
				<p>答：您可以尝试：</p>
				<p>1> 您可以通过登录页的“找回密码”功能，使用您已注册的手机号码找回密码；</p>
				<p>2> 如您的手机号码未注册，请跳转到注册页面注册并重新设置密码。</p>
				<strong>4、我可以修改我的用户名和手机号码吗？</strong>
				<p>答：您可以尝试：</p>
				<p>1> 天知道暂不支持修改用户名；</p>
				<p>2> 天知道支持修改您已经绑定的手机号码。</p>
				<strong>5、如何绑定/解绑我的手机号码/微信/QQ？</strong>
				<p>绑定：</p>
				<p>1> 如您未注册，请先注册或使用第三方应用（微信/QQ）登录，我们将自动绑定您的手机号码或第三方应用账号；</p>
				<p>2> 如您已注册，请在个人中心页面点击“立即绑定”绑定您的手机号码/微信/QQ。</p>
				<p>解绑：</p>
				<p>请在个人中心页面点击“解绑”解绑您已绑定的手机号码/微信/QQ。</p>
				<strong>6、为什么我无法评论？</strong>
				<p>1> 注册账号并登陆成功后即可发表评论；</p>
				<p>1> 如您已登录，请按页面提示操作。</p>
				<strong>7、为什么我的评论内容被删除了？</strong>
				<p>您很可能发布了不符合法律法规、或含有广告信息、或对其他用户进行了辱骂等恶意攻击的评论。如果您发表的评论并没有涉及这些内容，请联系我们。 </p>
				<strong>8、为什么分享不成功？</strong>
				<p>1> 网络原因，请检查您使用的设备网络是否正常；</p>
				<p>2> 目前天知道支持手机端微信分享，其他第三方应用暂不支持；</p>
				<strong>9、为什么我分享的链接打不开/乱码？</strong>
				<p>1> 网络原因，请检查您使用的设备网络是否正常；</p>
				<p>2> 可能是第三方应用不兼容，请换个应用重新重试；</p>
				<p>3> 您的分享链接或已失效，请重新分享。</p>
				<strong>10、我的留言信息/反馈意见什么时候会被查看？</strong>
				<p>您的留言信息/反馈意见我们都及时查看并记录，部分需要回馈的信息，我们会安排工作人员及时与您联系。</p>
				<strong>11、IE浏览器登录出现异常如何处理？</strong>
				<p>为了获得更好的用户体验，请使用火狐、谷歌、360浏览器极速模式及IE9及以上版本等浏览器。</p>
				<strong>12、如何购买数据产品？</strong>
				<p>您可以在您想购买的数据产品（映潮指数或天玑）页面留言，我们会在第一时间与您联系；</p>
				<p>您也可以直接拨打下方的咨询电话或通过联系我们页面的联系方式，咨询相关数据产品的购买流程。</p>
			</div>
		)
	}
}

module.exports = Problem