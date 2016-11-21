
import React from 'react';

class RegionalController extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		
	}
	render() {
		return (
			<div className="regional-nav">
			   <div>2016年8月</div>
			   <div>全国</div>
			   <div>地图模块</div>
			   <div><input type="button" value="查询数据详情"/></div>
			</div>
		)
	}
}

module.exports = RegionalController