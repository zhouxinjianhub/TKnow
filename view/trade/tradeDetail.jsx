
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
		datatimeAreaName:'全国'
	}
	callbackNav(timeId,areaId,datatimeAreaName){
		this.setState({
			timeId: timeId || '',
			areaId: areaId || 0 ,
			datatimeAreaName : datatimeAreaName || '全国'
		})
	}
	componentDidMount() {
		//订阅
		PubSub.subscribe('getNavYearId', (topic, data) => {
			this.state.timeId = data;
		});
	}
	render() {
		let categoryId = this.props.parent.location.query.categoryId ?  this.props.parent.location.query.categoryId : '' ;
		return (
			<div className="trade-detail">
			    <Nav callback={this.callbackNav.bind(this)}  location={this.props.parent.location} parent={this.props.parent}/>
			    <Map datatimeAreaName={this.state.datatimeAreaName} timeId={this.state.timeId} areaId={this.state.areaId} parent={this.props.parent} />

				<Bar timeId={this.state.timeId} areaId={this.state.areaId} parent={this.props.parent}/>
			   	
			    <List timeId={this.state.timeId} areaId={this.state.areaId} parent={this.props.parent}/>

			    <Comment module="trade" option={{'page': 1,'pageSize': 10,'areaId': this.state.areaId,'categoryId':categoryId}}/>
			</div>
		)
	}
}

module.exports = ContainerRegional