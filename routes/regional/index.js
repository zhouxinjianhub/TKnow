
import React from 'react';
import Regional from "../../view/regional/regional";// 地域
import Nav from 'nav';
import Footer from 'footer';

class RegionalComponent extends React.Component {
    componentDidMount() {
      	return false;
    }
	render() {
		return (
			<div className="content">
				<Nav select_key={1}/>
				<Regional parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}
module.exports = RegionalComponent