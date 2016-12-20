
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
	}
	callbackNav(timeId,areaId){
		this.setState({
			timeId: timeId || '',
			areaId: areaId || 0 ,
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
			   	<Indicator1 />
			</div>
		)
	}
}

module.exports = ContainerIndicator