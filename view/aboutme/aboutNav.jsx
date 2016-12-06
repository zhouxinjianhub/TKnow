
import React from 'react';
import { Link } from 'react-router';

class ContainerAboutMeNav extends React.Component {
	render() {
		return (
			<ul>
				<li className={ this.props.current == "server" ? "current" : "" }><Link to={{ pathname: "/aboutme/server"}} >服务声明</Link><i className="iconfont icon-right"></i></li>
				<li className={ this.props.current == "about" ? "current" : "" }><Link to={{ pathname: "/aboutme/about"}} >关于我们</Link><i className="iconfont icon-right"></i></li>
				<li className={ this.props.current == "callme" ? "current" : "" }><Link to={{ pathname: "/aboutme/callme"}} >联系我们</Link><i className="iconfont icon-right"></i></li>
				<li className={ this.props.current == "feedback" ? "current" : "" }><Link to={{ pathname: "/aboutme/feedback"}} >意见反馈</Link><i className="iconfont icon-right"></i></li>
				<li className={ this.props.current == "problem" ? "current" : "" }><Link to={{ pathname: "/aboutme/problem"}} >常见问题</Link><i className="iconfont icon-right"></i></li>
			</ul>
		)
	}
}

module.exports = ContainerAboutMeNav