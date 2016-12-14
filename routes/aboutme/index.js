
import React from 'react';
import Aboutme from "../../view/aboutme/index";		// 关于我们
import Nav from 'nav';
import Footer from 'footer';

class AboutMeComponent extends React.Component {
	render() {
		return (
			<div className="content">
				<Nav />
				<Aboutme parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}
module.exports = AboutMeComponent