
import React from 'react';
import { Link ,hashHistory} from 'react-router';
import ReportIndex from './reportIndex';
import ReportDetail from './report/reportDetail';

class ContainerReport extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {

	}
	render() {
		// let name = this.props.parent.location.query.name;
		let pageName = this.props.parent.params.splat;
		let pageRender = pageName && pageName.split('/')[1];
		return (
			<div className="pay-section">
				{(()=>{
					switch( pageRender ){
						case "reportIndex"   : return <ReportIndex/>
						case "reportDetail"  : return <ReportDetail parent={ this.props.parent } page={ pageName }/>
						default : return ""
					}
				})()}
			</div>
		)
	}
}

module.exports = ContainerReport