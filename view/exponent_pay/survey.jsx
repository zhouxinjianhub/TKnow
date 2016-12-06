
import React from 'react';
import Module1 from './survey/module1';
import Module2 from './survey/module2';
import Module3 from './survey/module3';
import Module4 from './survey/module4';

class ContainerSurvey extends React.Component {
	constructor(props) {
		super(props);
		this.HTMLDOMREGION = [];
		this.HTMLDOMREGION2 = [];
		this.HTMLDOMREGION3 = [];

		this.HTMLDOMTIME = [];
		this.HTMLDOMTIME2 = [];
		this.HTMLDOMTIME3 = [];
	}
	componentDidMount() {

	}
	closeHoverDatatime() {

	}
	hoverList1() {

	}
	sublimeRegion(){

	}
	selectData(){

	}
	render() {
		return (
			<div className="pay-section">
				<div className="pay-section-nav">
					<div className="select-module">
				   		<span className="titles">成都市</span>
				   		<i className="iconfont icon-down"></i>
				   		<div className="nav-list-region" ref="regionModule">
		   					{ this.HTMLDOMREGION }{ this.HTMLDOMREGION2 }{ this.HTMLDOMREGION3 }
				   		</div>
				   	</div>
				   	<div className="select-module" >
				   		<span className="titles">2016年一季度</span>
				   		<i className="iconfont icon-down"></i>
				   		<div className="nav-list-page" ref="pageModule">
				   			{ this.HTMLDOMTIME }{ this.HTMLDOMTIME2 }{ this.HTMLDOMTIME3 }
		   					<input type="button" value="确定" className="areaButton" onClick={this.sublimeRegion.bind(this)}/>
				   		</div>
				   	</div>
				   	<div className="button-module"><input type="button" value="查询" onClick={this.selectData.bind(this)}/></div>
				</div>
			    
			   	<Module1 />
			   	<Module2 />
			   	<Module3 />
			   	<Module4 />
			</div>
		)
	}
}

module.exports = ContainerSurvey