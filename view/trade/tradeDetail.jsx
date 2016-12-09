
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
		areaId: 0,
		categoryId: 4, //行业Id
		categoryName:'在线旅游'
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
			<div className="trade-detail">
			    <Nav callback={this.callbackNav.bind(this)} categoryName={this.state.categoryName}/>
			    <Map timeId={this.state.timeId} areaId={this.state.areaId} categoryId={this.state.categoryId} categoryName={this.state.categoryName}/>

				<Bar timeId={this.state.timeId} areaId={this.state.areaId} categoryId={this.state.categoryId} categoryName={this.state.categoryName}/>
			   	
			    <List timeId={this.state.timeId} areaId={this.state.areaId} categoryId={this.state.categoryId} categoryName={this.state.categoryName}/>

			    <Comment module="region" option={{'page': 1,'pageSize': 10,'areaId': this.state.areaId}}/>
			    {/*<iframe src="/1.pdf" width="1100" height="500"></iframe>*/}
			</div>
		)
	}
}

module.exports = ContainerRegional