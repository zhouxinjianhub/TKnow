
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import './index.less';

class ContainerIndex extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.logo).ondragstart=function (){return false};
	}
	render() {
		return (
			<div className="container-index">
				<div className="regist"><Link to="/login" >登录/注册</Link></div>
				<div className="logo">
					<img src="../../images/logo.png" ref="logo"/>
				</div>
				<div className="list">
					<p className="list-title">数据服务</p>
					<ul>
						<li><Link to={{ pathname: "/regional"}} >
							<div className="list-dv diyu">

							</div>
							<p>地域维度</p>
						</Link></li>
						<li><Link to={{ pathname: "/trade"}} >
							<div className="list-dv hangye"></div>
							<p>行业维度</p>
						</Link></li>
						<li><Link to={{ pathname: "/info"}} >
							<div className="list-dv news"></div>
							<p>数据资讯</p>
						</Link></li>
					</ul>
					<p className="list-title">映潮产品</p>
					<ul>
						<li><Link to={{ pathname: "/"}} >
							<div className="list-dv yczs"></div>
							<p>映潮指数</p>
						</Link></li>
						<li><Link to={{ pathname: "/"}} >
							<div className="list-dv tianji"></div>
							<p>天玑</p>
						</Link></li>
						<li><Link to={{ pathname: "/"}} >
							<div className="list-dv app"></div>
							<p>手机APP</p>
						</Link></li>
					</ul>
				</div>
			</div>
		)
	}
}

module.exports = ContainerIndex