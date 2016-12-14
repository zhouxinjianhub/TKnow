
import React from 'react';
import Index from "../../view/index/index";			// 首页
import Nav from 'nav';
import Footer from 'footer';

class IndexComponent extends React.Component {
	render() {
		return (
			<div className="content">
				<Index parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}
module.exports = IndexComponent