
import React from 'react';
import ReactDOM from 'react-dom';
import Aboutnav from './aboutNav';
import About from './about';
import Callme from './callme';
import Server from './server';
import Feedback from './feedback';
import Problem from './problem';

import { Link } from 'react-router';

import './index.less';

class ContainerAboutMe extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		
	}
	render() {
		let pageName = this.props.parent.params.name;
		return (
			<div className="container-aboutme">
				<div className="aboutme-nav">
					<Aboutnav current={ pageName }/>
				</div>
				{(()=>{
					switch( pageName ){
						case "about"   : return <About/>
						case "callme"  : return <Callme/>
						case "server"  : return <Server/>
						case "feedback": return <Feedback/>
						default : 	     return <Problem/>
					}
				})()}
			</div>
		)
	}
}

module.exports = ContainerAboutMe