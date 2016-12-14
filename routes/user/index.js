
import React from 'react';
import User from "../../view/user/user";			// 个人中心
import Nav from 'nav';
import Footer from 'footer';

class UserComponent extends React.Component {
	render() {
		return (
			<div className="content">
				<Nav />
				<User parent={this.props}/>
				<Footer/>
			</div>
		)
	}
}
module.exports = UserComponent