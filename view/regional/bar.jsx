
import React from 'react';
import echarts from "echarts";

class RegionalBar extends React.Component {
	constructor(props) {
		super(props);
	}
	renderBar(){
		var xAxisData = [];
		var data = [];
		for (var i = 1; i < 16; i++) {
		    xAxisData.push('5月' + i + '日');
		    data.push(Math.round(Math.random() * 500) + 200);
		}
		let option = {
			grid: [
		        {
		        	x: '4%',
		        	y: '12%',
		        	width: '92%',
		        	height: '74%'
		        }
		    ],
		    legend: {
		        data:['xxxxx'],
		        right: '5%'
		    },
		    xAxis: [{
		        data: xAxisData,
		        axisLabel: {
		            textStyle: {
		                color: 'red'
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
		        name: 'xxxxx',
		        data: data,
		        barWidth: 40,
		        itemStyle: {
		            normal: {
		              label: {
		                    show: true,
		                    position: 'top',
		                    formatter: '{c}\n'
		                },
		                barBorderRadius:10,
		                color: '#03a9f4',
		                shadowColor: 'rgba(0, 0, 0, .5)',
		                shadowBlur: 20
		            }
		        }
		    }]
		};
		this.myChart.setOption(option);
	}
	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('bar'));
		this.renderBar();
	}
	render() {
		return (
			<div className="regional-bar">
			   <p className="title">地域行业分布</p>
			   <div className="change-open">实务型服务型</div>
			   <div className="bar" id="bar"></div>
			</div>
		)
	}
}

module.exports = RegionalBar