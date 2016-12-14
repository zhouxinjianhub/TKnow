
import React from 'react';
import Module2_1 from "./module2-1";
import Module2_2 from "./module2-2";
import Module2_3 from "./module2-3";
import Module2_4 from "./module2-4";

class ContainerSurveyModule2 extends React.Component {
	constructor(props) {
		super(props);
		this.viewMoudle = false;
	}
	componentDidMount() {
		this.viewMoudle = true;
		this.setState({
			status: true,
			timeId: this.props.timeId,
			areaId: this.props.areaId
		});
	}
	componentWillReceiveProps(nextProps){
		this.props = nextProps;
		this.viewMoudle = true;
		this.setState({
			status: true,
			timeId: this.props.timeId,
			areaId: this.props.areaId
		});
	}
	render() {
		if ( !this.viewMoudle ) {
			return false;
		}
		return (
			<div className="survey-module">
			   <div className="survey-module-title">电子商务整体交易及走势</div>
			   <div className="survey-module-content">
			   		<Module2_1 timeId={this.state.timeId} areaId={this.state.areaId}/>
			   		<Module2_2 timeId={this.state.timeId} areaId={this.state.areaId}/>
			   		<Module2_3 timeId={this.state.timeId} areaId={this.state.areaId}/>
			   		<Module2_4 timeId={this.state.timeId} areaId={this.state.areaId}/>
			   </div>
			</div>
		)
	}
}

module.exports = ContainerSurveyModule2