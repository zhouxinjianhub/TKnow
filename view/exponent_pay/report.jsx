
import React from 'react';
import { Link ,hashHistory} from 'react-router';
import "./report.less";

class TabComponent extends React.Component{
	constructor(props) {
		super(props);
	}
	componentDidMount() {

	}
	render() {
		return (
			<div className="wrap" id="wrap">
			    <ul className="tabClick">
			        <li className="active">月报</li>
			        <li>季度报</li>
			        <li>半年报</li>
			        <li>年报</li>
			    </ul>
			    <div className="lineBorder">
			        <div className="lineDiv"></div>
			    </div>
			    <div className="tabCon">
			        <div className="tabBox">
			            <div className="tabList">
			            1</div>
			            <div className="tabList">
			            2</div>
			            <div className="tabList">
			            3</div>
			            <div className="tabList">
			            4</div>
			        </div>
			    </div>
			</div>
		)
	}

}

class ContainerReport extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {

	}
	render() {
		return (
			<div className="pay-section">
			   <TabComponent/>
			</div>
		)
	}
}

module.exports = ContainerReport