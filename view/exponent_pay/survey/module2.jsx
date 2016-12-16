
import React from 'react';
import Module2_1 from "./module2-1";
import Module2_2 from "./module2-2";
import Module2_3 from "./module2-3";
import Module2_4 from "./module2-4";

class ContainerSurveyModule2 extends React.Component {
	constructor(props) {
		super(props);
		this.viewMoudle = false;
		this.nodatasum = 0;
		this.accumulationodata = this.accumulationodata.bind(this);
	}
	componentDidMount() {
		this.nodatasum = 0;
		this.viewMoudle = true;
		this.setState({
			status: true,
			timeId: this.props.timeId,
			areaId: this.props.areaId
		});
	}
	componentWillReceiveProps(nextProps){
		this.nodatasum = 0;
		this.props = nextProps;
		this.viewMoudle = true;
		this.setState({
			status: true,
			timeId: this.props.timeId,
			areaId: this.props.areaId
		});
	}
	accumulationodata() {
		this.nodatasum++;
		if ( this.nodatasum == 4 ) {
			this.viewMoudle = false;
			this.setState({
				status: false
			})
		}
		
	}
	render() {
		if ( !this.viewMoudle ) {
			return false;
		}
		return (
			<div className="survey-module">
			   <div className="survey-module-title">电子商务整体交易及走势</div>
			   <div className="survey-module-content">
			   		<Module2_1 timeId={ this.state.timeId } areaId={ this.state.areaId } addError={ this.accumulationodata }/>
			   		<Module2_2 timeId={ this.state.timeId } areaId={ this.state.areaId } addError={ this.accumulationodata }/>
			   		<Module2_3 timeId={ this.state.timeId } areaId={ this.state.areaId } addError={ this.accumulationodata }/>
			   		<Module2_4 timeId={ this.state.timeId } areaId={ this.state.areaId } addError={ this.accumulationodata }/>
			   </div>
			</div>
		)
	}
}

module.exports = ContainerSurveyModule2