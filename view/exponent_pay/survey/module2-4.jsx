
import React from 'react';
import ReactDOM from 'react-dom';

class ContainerSurveyModule2_4 extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.echarts = echarts.init(ReactDOM.findDOMNode(this.refs.chart));

		var option = {
		    tooltip: {},
		    grid: [{
		        top: 0,
		        width: '50%',
		        left: 0,
		        containLabel: true
		    }],
		    legend: {
            	orient:'vertical',
            	top:'20%',
            	right: 0,
            	itemGap:30,
                data:['直达', '营销广告','搜索引擎']
            },
		    xAxis: [{
		        type: 'value',
		        show: false,
		        axisLine:{
					show:false
				},
				axisTick:{
					show:false
				},
				splitLine: {
				    show: false
				}
		    }],
		    yAxis: [{
		        type: 'category',
		        data:['直达', '营销广告','搜索引擎'],
		        axisLine:{
					show:false
				},
				axisTick:{
					show:false
				},
				splitLine: {
				    show: false
				}
		    }],
		    series: [{
		        type: 'bar',
		        z: 3,
		        label: {
		            normal: {
		                position: 'right',
		                show: true
		            }
		        },
		        data:[
	                {value:335, name:'直达', selected:true},
	                {value:679, name:'营销广告'},
	                {value:1548, name:'搜索引擎'}
	            ]
		    }, {
		        type: 'pie',
		        radius: ['20%', '70%'],
		        center: ['70%', '50%'],
		        label: {
	                normal: {
	                    show: false
	                }
	            },
		        data:[
	                {value:335, name:'直达', selected:true},
	                {value:679, name:'营销广告'},
	                {value:1548, name:'搜索引擎'}
	            ]
		    }]
		}
		this.echarts.setOption(option);
	}
	render() {
		return (
			<div className="survey-module-list">
			   <div className="title">
			   		<p>服务型网络零售行业解析</p>
			   		<div className="nav-list">
			   			<span className="current">全国</span>
			   			<span>四川</span>
			   		</div>
			   </div>
			   <div className="echarts-box" ref="chart"></div>
			</div>
		)
	}
}

module.exports = ContainerSurveyModule2_4