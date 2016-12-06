
import React from 'react';

import Nav from "./controller";		//头部筛选模块
import Map from "./map";
import Bar from "./bar";		//柱状图模块
import List from "./list";		//热门榜单列表模块
import Comment from "../common/comment";		//评论回复模块
import PubSub from 'pubsub-js';

import "./tradeDetail.less";

class ContainerRegional extends React.Component {
	constructor(props) {
		super(props);
		this.isTopRoute = true;
	}
	state = {
		timeId: '',
		areaId: 0
	}
	callbackNav(timeId,areaId){
		this.setState({
			timeId: timeId || '',
			areaId: areaId || 0
		})
	}
	componentDidMount() {
		PubSub.subscribe('getNavYearId', (topic, data) => {
			this.state.timeId = data;
		});
	}
	render() {
		return (
			<div className="container-detail">
			    <Nav callback={this.callbackNav.bind(this)}/>
			    <Map />

				<Bar timeId={this.state.timeId} areaId={this.state.areaId}/>
			   	
			   	<List timeId={this.state.timeId} areaId={this.state.areaId}/>

			    <Comment module="region" option={{'page': 1,'pageSize': 10,'areaId': this.state.areaId}}/>
			    {/*<iframe src="/1.pdf" width="1100" height="500"></iframe>*/}
			</div>
		)
	}
}

module.exports = ContainerRegional