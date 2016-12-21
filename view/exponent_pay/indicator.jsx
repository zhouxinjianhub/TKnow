
import React from 'react';
import Nav from "./indicator/controller";		//头部筛选模块
import Indicator1 from './indicator/indicator1';

class ContainerIndicator extends React.Component {
	constructor(props) {
		super(props);
		this.isTopRoute = true;
	}
	state = {
		timeId: '',
		areaId: 0,
		tradeId:'',
		IndicId:'',
	}
	callbackNav(timeId,areaId,tradeId,IndicId){
		this.setState({
			timeId: timeId || '',
			areaId: areaId || 0 ,
			tradeId:tradeId || '',
			IndicId:IndicId || '',
		})
	}
	componentDidMount() {
		PubSub.subscribe('getNavYearId', (topic, data) => {
			this.state.timeId = data; 
		});
	}
	render() {
		return (
			<div className="pay-section">
				<Nav callback={this.callbackNav.bind(this)}  location={this.props.parent.location} parent={this.props.parent}/>
			   	<Indicator1 timeId={this.state.timeId} areaId={this.state.areaId} tradeId={this.state.tradeId} IndicId={this.state.IndicId}/>
			</div>
		)
	}
}

module.exports = ContainerIndicator