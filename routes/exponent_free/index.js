
import React from 'react';
import Exponent_free from "../../view/exponent_free/free";	// 未付费版映潮指数
import Nav from 'nav';
import Footer from 'footer';

class ExponentFreeComponent extends React.Component {
	render() {
		return (
			<div className="content">
				<Nav select_key={4}/>
				<Exponent_free parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}
module.exports = ExponentFreeComponent