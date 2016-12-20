
import React from 'react';
import { Link ,hashHistory} from 'react-router';
import ReportIndex from './reportIndex';
import ReportDetail from './report/reportDetail';

class ContainerReport extends React.Component {
	constructor(props) {
		super(props);
	}
	state={
		detailData : '',
	}
	componentDidMount() {

	}
	setDetailData(data){
		this.setState({
			detailData: data || '',
		})
	}
	render() {
		let pageName = this.props.parent.params.splat;
		let pageRender = pageName && pageName.split('/')[1]||"reportIndex";
		return (
			<div className="pay-section">
				{(()=>{
					switch( pageRender ){
						case "reportDetail"  : return <ReportDetail parent={ this.props.parent } page={ pageName } detailData={this.state.detailData}/>
						default : return <ReportIndex setDetailData={this.setDetailData.bind(this)} />
					}
				})()}
			</div>
		)
	}
}

module.exports = ContainerReport