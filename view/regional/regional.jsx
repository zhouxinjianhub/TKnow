
import React from 'react';

import Nav from "./controller";
import Pie from "./pie";
import Bar from "./bar";
import List from "./list";

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
			   <Pie />
			   <Bar />
			   <List />
			</div>
		)
	}
}

module.exports = ContainerRegional