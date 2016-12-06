
import React from 'react';
import { Link } from 'react-router';

class ContainerAboutMeNav extends React.Component {
	render() {
		return (
			<ul>
				<li className={ this.props.current == "survey" ? "current" : "" }><Link to={{ pathname: "/exponent_pay/survey"}} >数据概况</Link><i className="iconfont icon-right"></i></li>
				<li className={ this.props.current == "indicator" ? "current" : "" }><Link to={{ pathname: "/exponent_pay/indicator"}} >数据指标</Link><i className="iconfont icon-right"></i></li>
				<li className={ this.props.current == "report" ? "current" : "" }><Link to={{ pathname: "/exponent_pay/report"}} >数据报告</Link><i className="iconfont icon-right"></i></li>
			</ul>
		)
	}
}

module.exports = ContainerAboutMeNav