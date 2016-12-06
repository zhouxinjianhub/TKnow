
import React from 'react';
import { Link } from 'react-router';
import "../style/footer.less";


class Footer extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		$.isMobile();
	}
	render() {
		return (
			<div className="footer">
				<div className="f-cont">
					<ul>
						<li>
							<Link to={{ pathname: "/aboutme/server"}} >服务声明</Link>
							<Link to={{ pathname: "/aboutme/about"}} >关于我们</Link>
							<Link to={{ pathname: "/aboutme/callme"}} >联系我们</Link>
							<Link to={{ pathname: "/aboutme/feedback"}} >意见反馈</Link>
							<Link to={{ pathname: "/aboutme/problem"}} >常见问题</Link>
						</li>
						<div className="third-href">
							<i className="wechart"></i>
							<i className="weibo"></i>
						</div>
					</ul>

				</div>
				<div className="copyright">
					<p>Copyright&copy;&nbsp;&nbsp;2015-2016&nbsp;&nbsp;yingchaozhishu.com&nbsp;&nbsp;All&nbsp;&nbsp;Rights&nbsp;&nbsp;Reserved&nbsp;&nbsp;&nbsp;&nbsp;蜀ICP备12008686号-1</p>
					<p>地址：成都市高新区吉泰五路88号香年广场T2-3312&nbsp;&nbsp;&nbsp;&nbsp;邮编：610000&nbsp;&nbsp;&nbsp;&nbsp;电话：028-83117030&nbsp;&nbsp;&nbsp;&nbsp;传真：028-83117030&nbsp;&nbsp;&nbsp;&nbsp;邮箱: service@yingchaozhishu.com</p>
				</div>
			</div>
		)
	}
}

module.exports = Footer