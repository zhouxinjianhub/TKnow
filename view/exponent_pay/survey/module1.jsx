
import React from 'react';
import PubSub from 'pubsub-js';

class ContainerSurveyModule1 extends React.Component {
	constructor(props) {
		super(props);
		this.JBView = false;
	}
	state = {
		title: '简报',
		content: ''
	};
	componentDidMount() {
		PubSub.subscribe('JBsub', (topic, data) => {
			if ( data ) {
				this.JBView = true;
				this.setState({
					statue: true,
					content: data
				});
			} else {
				this.JBView = false;
				this.setState({
					statue: false
				});
			}
			
		});
	}
	render() {
		if ( !this.JBView ) {
			return false;
		}
		return (
			<div className="survey-module">
			   <div className="survey-module-title">{ this.state.title || ''}</div>
			   <div className="survey-module-content">{ this.state.content || '' }</div>
			</div>
		)
	}
}

module.exports = ContainerSurveyModule1