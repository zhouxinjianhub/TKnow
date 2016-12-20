
import React from 'react';
import Paynav from './payNav';
import Survey from './survey';
import Indicator from './indicator';
import Report from './report';

import { hashHistory } from 'react-router';

import "./pay.less";

class ContainerPay extends React.Component {
	constructor(props) {
		super(props);
		if ( !$.isVipUser() ) {
			hashHistory.push('/exponent_free');
			return false;
		}
	}
	render() {
		let pageName = this.props.parent.params.splat;
		let pageRender = pageName && pageName.split('/')[0];
		return (
			<div className="container-pay">
			   <div className="pay-nav">
			   		<Paynav current={ pageRender }/>
			   </div>
			   {(()=>{
					switch( pageRender ){
						case "survey"   : return <Survey/>
						case "indicator"  : return <Indicator parent={ this.props.parent }/>
						case "report"  : return <Report parent={ this.props.parent } page={ pageName }/>
						default : history.go(-1)
					}
				})()}
			</div>
		)
	}
}

module.exports = ContainerPay