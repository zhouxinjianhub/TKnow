
import React from 'react';

class RegionalController extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log('地域控制器加载完成');
	}
	render() {
		return (
			<div className="regional-nav">
			   <div className="select-module"><span>2016年8月累计</span><i className="iconfont icon-down"></i></div>
			   <div className="select-module"><span>全国</span><i className="iconfont icon-down"></i></div>
			   <div className="map-module">地图模块</div>
			   <div className="button-module"><input type="button" value="查询数据详情"/></div>
			   <div className="share-module"><i className="iconfont icon-share"></i></div>
			</div>
		)
	}
}

module.exports = RegionalController