
import React from 'react';

import Nav from './survey/controller';
import Module1 from './survey/module1';
import Module2 from './survey/module2';
import Module3 from './survey/module3';
import Module4 from './survey/module4';

class ContainerSurvey extends React.Component {
	constructor(props) {
		super(props);
		this.loadStart = false;
	}
	loadShowStart(timeId,areaId){
		this.loadStart = true;
		this.setState({
			timeId: timeId,
			areaId: areaId
		},()=>{
			this.loadStart = false;
		})
	}
	componentDidMount() {
		
	}
	render() {
		return (
			<div className="pay-section">
				<Nav callback={ this.loadShowStart.bind(this) }/>
			    {(()=>{
			    	let	childDom = [];
			    	if ( this.loadStart ) {
			    		childDom.push(<Module1 />);
			    		childDom.push(<Module2 timeId={this.state.timeId} areaId={this.state.areaId}/>);
			    		childDom.push(<Module3 timeId={this.state.timeId} areaId={this.state.areaId}/>);
			    		childDom.push(<Module4 timeId={this.state.timeId} areaId={this.state.areaId}/>);
			    	}
			    	return childDom;
			    })()}
			   	
			</div>
		)
	}
}

module.exports = ContainerSurvey