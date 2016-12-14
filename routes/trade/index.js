
import React from 'react';
import Trade from "../../view/trade/trade";			// 行业
import Nav from 'nav';
import Footer from 'footer';

class TradeComponent extends React.Component {
	render() {
		return (
			<div className="content">
				<Nav select_key={2}/>
				<Trade parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}
module.exports = TradeComponent