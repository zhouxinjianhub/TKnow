
import React from 'react';
import { Link } from 'react-router';
import "../style/footer.less";


class Footer extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log('底部加载完成');
	}
	render() {
		return (
			<div className="footer">
				<div className="f-cont">
					<ul>
						<li>
							<p>关于映潮</p>
							<Link to={{ pathname: "/"}} >公司官网</Link>
							<Link to={{ pathname: "/"}} >联系我们</Link>
							<Link to={{ pathname: "/"}} >意见反馈</Link>
						</li>
						<li>
							<p>数据服务</p>
							<Link to={{ pathname: "/"}} >地域</Link>
							<Link to={{ pathname: "/"}} >行业</Link>
							<Link to={{ pathname: "/"}} >资讯</Link>
						</li>
						<li>
							<p>数据产品</p>
							<Link to={{ pathname: "/"}} >映潮指数</Link>
							<Link to={{ pathname: "/"}} >天玑</Link>
							<Link to={{ pathname: "/"}} >天知道APP</Link>
						</li>
						<li>
							<p>版权信息</p>
							<p className="small-font">天知道 所展示数据内容版权归映潮科技所有，任何商业用途均需联系本公司。如未经授权用作他处，本公司将保留追究法律责任的权利。</p>
							<div className="third-href">
								<i className="wechart"></i>
								<i className="weibo"></i>
							</div>
						</li>
					</ul>
				</div>
				<div className="copyright">蜀ICP备12008686号&nbsp;Copyright&copy;&nbsp;2015-2016&nbsp;yingchaozhishu.com&nbsp;All&nbsp;Rights&nbsp;Reserved</div>
			</div>
		)
	}
}

module.exports = Footer