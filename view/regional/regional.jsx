
import React from 'react';

import Nav from "./controller";
import Pie from "./pie";
import Bar from "./bar";
import List from "./list";
import Comment from "../common/comment";
import PubSub from 'pubsub-js';

import "./regional.less";

class ContainerRegional extends React.Component {
	constructor(props) {
		super(props);
		this.isTopRoute = false;
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
		$.wechartShare();
	}
	render() {
		return (
			<div className="container-regional">
			    <Nav callback={this.callbackNav.bind(this)} location={this.props.parent.location}/>
			    
			    <Pie timeId={this.state.timeId} areaId={this.state.areaId}/>

				<Bar timeId={this.state.timeId} areaId={this.state.areaId}/>
			   	
			   	<List timeId={this.state.timeId} areaId={this.state.areaId}/>

			    <Comment module="region" option={{'page': 1,'pageSize': 10,'areaId': this.state.areaId}}/>
			    
			</div>
		)
	}
}

module.exports = ContainerRegional