
import React from 'react';
import Info from "../../view/info/info";			// 咨讯
import Nav from 'nav';
import Footer from 'footer';

class InfoComponent extends React.Component {
	render() {
		return (
			<div className="content">
				<Nav select_key={3}/>
				<Info parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}

module.exports = InfoComponent