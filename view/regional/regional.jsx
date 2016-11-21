
import React from 'react';

import Nav from "./controller";
import Pie from "./pie";
import Bar from "./bar";

import "./regional.less";

class ContainerRegional extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		// require.ensure([], require => {
			
		// }, 'regional')
	}
	render() {
		return (
			<div className="container-regional">
			   <Nav />
			   <Bar />
			</div>
		)
	}
}

module.exports = ContainerRegional