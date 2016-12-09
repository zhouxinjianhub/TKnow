
import React from 'react';
import Paynav from './payNav';
import Survey from './survey';
import Indicator from './indicator';
import Report from './report';

import "./pay.less";

class ContainerPay extends React.Component {
	render() {
		let pageName = this.props.parent.params.name;
		return (
			<div className="container-pay">
			   <div className="pay-nav">
			   		<Paynav current={ pageName }/>
			   </div>
			   {(()=>{
					switch( pageName ){
						case "survey"   : return <Survey/>
						case "indicator"  : return <Indicator/>
						case "report"  : return <Report/>
						default : 	     history.go(-1)
					}
				})()}
			</div>
		)
	}
}

module.exports = ContainerPay