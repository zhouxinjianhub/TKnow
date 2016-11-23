
import React from 'react';

class RegionalBar extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
        // this.myChart = echarts.init(document.getElementById('bar'));
	}
	render() {
		return (
			<div className="regional-pie">
				<div className="pie pie-jiaoyi">
					<div className="pie-canvas"></div>
					<p className="pie-title">数据解读</p>
					<p className="pie-content">数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读</p>
				</div>
				<div className="pie pie-lingshou">
					<div className="pie-canvas"></div>
					<p className="pie-title">数据解读</p>
					<p className="pie-content">数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读</p>
				</div>
			</div>
		)
	}
}

module.exports = RegionalBar