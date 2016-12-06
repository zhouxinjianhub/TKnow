
import React from 'react';

class ContainerSurveyModule1 extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {

	}
	render() {
		return (
			<div className="survey-module">
				<div className="survey-module-title">全国31省市电子商务交易解析</div>
				<div className="survey-module-content">
					<div className="module3-nav">
						<span className="current">网络交易额</span>
						<span>网络零售额</span>
						<span>实物型网络零售额</span>
						<span>服务型网络零售额</span>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = ContainerSurveyModule1