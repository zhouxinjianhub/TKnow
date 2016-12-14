
import React from 'react';
import ReactDOM from 'react-dom';
import { Link ,hashHistory} from 'react-router';

import TradeIndex from './tradeIndex';
import TradeDetail from './tradeDetail';

class ContainerTrade extends React.Component {
	constructor(props) {
		super(props);		
	}
	render() {
		let tradeName = this.props.parent.params.tradeName;
		return (
			<div className="container-trade">
				{(()=>{
					switch( tradeName ){
						case "tradeIndex"   : return <TradeIndex/>
						case "tradeDetail"  : return <TradeDetail parent={this.props.parent}/>
						default : 	     return <TradeIndex/>
					}
				})()}
			</div>
		)
	}
}

module.exports = ContainerTrade