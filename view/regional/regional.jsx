
import React from 'react';

import Nav from "./controller";
import Pie from "./pie";
import Bar from "./bar";
import List from "./list";
import Comment from "../common/comment";

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
			   <Comment module="info" option={{'page': 1,'pageSize': 10,'informationId': 1}}/>
			</div>
		)
	}
}

module.exports = ContainerRegional