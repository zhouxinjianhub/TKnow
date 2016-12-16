
import React from 'react';
import About from "../../view/about/about";			// 关于（天玑）
import Nav from 'nav';
import Footer from 'footer';

class AboutComponent extends React.Component {
	shouldComponentUpdate(nextProps,nextState) {
		return false;
	}
	render() {
		return (
			<div className="content">
				<Nav select_key={5}/>
				<About parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}
module.exports = AboutComponent