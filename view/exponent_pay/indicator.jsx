
import React from 'react';

import Indicator1 from './indicator/indicator1';

class ContainerIndicator extends React.Component {
	constructor(props) {
		super(props);
		//地域
		this.HTMLDOMREGION1 = [];
		this.HTMLDOMREGION2 = [];
		this.HTMLDOMREGION3 = [];
		//指标
		this.HTMLDOMINDIC = ['零售额','交易额'];
		//行业
		this.HTMLDOMTRADE = [];
		//时间
		this.HTMLDOMTIME1 = [];
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
			   <div className="Indicator-nav">
					<div className="select-module">
				   		<span className="titles">成都市</span>
				   		<i className="iconfont icon-down"></i>
				   		<div className="nav-list-region" ref="regionModule">
		   					{ this.HTMLDOMREGION1 }{ this.HTMLDOMREGION2 }{ this.HTMLDOMREGION3 }
				   		</div>
				   	</div>

					<div className="select-module">
				   		<span className="titles">交易额</span>
				   		<i className="iconfont icon-down"></i>
				   		<div className="nav-list-region" ref="indicModule">
				   			<span>交易额</span>
				   			<span>交易额</span>
		   					{ this.HTMLDOMINDIC }
				   		</div>
				   	</div>

				   	<div className="select-module">
				   		<span className="titles">服装鞋包</span>
				   		<i className="iconfont icon-down"></i>
				   		<div className="nav-list-region" ref="tradeModule">
		   					{ this.HTMLDOMTRADE }
				   		</div>
				   	</div>

				   	<div className="select-module" >
				   		<span className="titles">2016年一季度</span>
				   		<i className="iconfont icon-down"></i>
				   		<div className="nav-list-page" ref="pageModule">
				   			{ this.HTMLDOMTIME1 }{ this.HTMLDOMTIME2 }{ this.HTMLDOMTIME3 }
		   					<input type="button" value="确定" className="areaButton" onClick={this.sublimeRegion.bind(this)}/>
				   		</div>
				   	</div>
				   	<div className="button-module"><input type="button" value="查询" onClick={this.selectData.bind(this)}/></div>
				</div>
			    

			   	<Indicator1 />
			</div>
		)
	}
}

module.exports = ContainerIndicator