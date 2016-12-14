
import React from 'react';
import Exponent_pay from "../../view/exponent_pay/pay";	// 付费版映潮指数
import Nav from 'nav';
import Footer from 'footer';

class ExponentPayComponent extends React.Component {
	render() {
		return (
			<div className="content">
				<Nav select_key={4}/>
				<Exponent_pay parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}
module.exports = ExponentPayComponent