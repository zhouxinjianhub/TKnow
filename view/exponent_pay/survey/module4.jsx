
import React from 'react';
import ReactDOM from 'react-dom';

class ContainerSurveyModule1 extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.echart = echarts.init(ReactDOM.findDOMNode(this.refs.chart));
		var xAxisData = [];
		var data = [];
		for (var i = 0; i < 12; i++) {
			xAxisData.push('服装鞋包');
	    	data.push(666);
		}
		let colors = ['#fec630','#ff8f2b'];
		let option = {
			grid: [
		        {
		        	x: '3%',
		        	y: '3%',
		        	width: '94%',
		        	height: '90%'
		        }
		    ],
		    tooltip: {
		    	trigger: 'axis',
		    	axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    xAxis: [{
		        data: xAxisData,
		        axisLabel: {
		            textStyle: {
		                color: '#4b4b4b',
		                fontSize: '14px'
		            }
		        },
				axisLine:{
					show:false
				},
				axisTick:{
					show:false
				},
				splitLine: {
				    show: false
				}
		    },{
		        // 辅助 x 轴
		        show: false,
		        data: xAxisData
		    }],
		    yAxis: {
		      	show: false,
		        axisLine: {
		            show: false
		        }
		    },
		    series: [{
		        type: 'bar',
		        name: '',
		        data: data,
		        barWidth: 30,
		        barMinHeight: 10,
		        itemStyle: {
		            normal: {
		                label: {
		                    show: false,
		                    position: 'top',
		                    formatter: '{c}\n'
		                },
		                barBorderRadius:10,
		                color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								  offset: 0, color: colors[0]
								}, {
								  offset: 1, color: colors[1]
								}], false),
		                shadowColor: 'rgba(0, 0, 0, .5)',
		                shadowBlur: 20
		            }
		        }
		    }]
		};
		this.echart.setOption(option);
	}
	render() {
		return (
			<div className="survey-module">
				<div className="survey-module-title">四川省各市州电子商务交易解析</div>
				<div className="survey-module-content">
					<div className="module4-nav">
						<span className="current">网络交易额</span>
						<span>网络零售额</span>
						<span>实物型网络零售额</span>
						<span>服务型网络零售额</span>
					</div>
				</div>
				<div className="module-echarts" ref="chart"></div>
			</div>
		)
	}
}

module.exports = ContainerSurveyModule1