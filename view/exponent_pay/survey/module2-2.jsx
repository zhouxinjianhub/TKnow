
import React from 'react';
import ReactDOM from 'react-dom';

class ContainerSurveyModule2_2 extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.echarts = echarts.init(ReactDOM.findDOMNode(this.refs.chart));
		var option = {
		    tooltip : {
		        trigger: 'axis',
		        formatter: (data)=>{
		        	console.log(data);
		        	let result = data[0].name+"网络零售额<br/>"+data[0].seriesName+" "+data[0].value+"亿元 "+"环比+"+data[0].value+"<br/>"+
		        				data[1].seriesName+" "+data[1].value+"亿元 "+"环比+"+data[1].value;
		        	return result;
		        }
		    },
		    legend: {
		        data:['全国','四川'],
		        align: 'left',
        		left: 240
		    },
		    grid: {
		        left: 210,
		        top: 0,
		        right: 20,
		        bottom: 20,
		        containLabel: true
		    },
		    xAxis : [{
	            type : 'category',
	            boundaryGap : false,
	            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
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
		    yAxis : [{
	            show: false
	        }],
		    series : [{
	            name:'全国',
	            type:'line',
	            stack: '总量',
	            itemStyle: {
	            	normal: {
	            		color: '#ff599e',
	            		borderColor: '#ff599e',
	            		areaStyle : {
	            			color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								  offset: 0, color: '#ffac68'
								}, {
								  offset: 1, color: '#ff599e'
								}], false)
	            		}
	            	}
	            },
	            data:[320, 332,320, 332,320, 332,320, 332,320, 332,320, 332]
	        },{
	            name:'四川',
	            type:'line',
	            stack: '总量',
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            itemStyle: {
	            	normal: {
	            		color: '#41b37e',
	            		borderColor: '#41b37e',
	            		areaStyle : {
	            			color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								  offset: 0, color: '#95cb5f'
								}, {
								  offset: 1, color: '#41b37e'
								}], false)
	            		}
	            	}
	            },
	            data:[820, 932,320, 332,320, 332,320, 332,320, 332,320, 332]
	        }]
		};
		this.echarts.setOption(option);
		this.showPie();
	}
	showPie() {
		this.echartspie = echarts.init(ReactDOM.findDOMNode(this.refs.pie));
		var option = {
		    series: [{
	            name:'访问来源',
	            type:'pie',
	            radius: ['25%', '75%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[{
	            	value:35, 
	            	name:'四川'
	            },{
	            	value:310,
	            	name:'全国'
	            }]
	        }]
		};
		this.echartspie.setOption(option);
	}
	render() {
		return (
			<div className="survey-module-list">
			   <div className="title">
			   		<p>月度网络交易额及环比增长率</p>
			   		<div className="nav-list">
			   			<span className="current">全国</span>
			   			<span>四川</span>
			   		</div>
			   </div>
			   <div className="echarts-box" ref="chart"></div>
			   <ul className="module2-list">
			   		<li>
			   			<p>全国</p>
			   			<p>网络零售额</p>
			   			<p>247,269,22<span>亿元</span></p>
			   		</li>
			   		<li>
			   			<p>四川省</p>
			   			<p>网络零售额</p>
			   			<p>247,269,00<span>亿元</span></p>
			   		</li>
			   		<li>
			   			<p>四川省在全国</p>
			   			<p>占比</p>
			   			<p>13.88%</p>
			   			<div className="module2-pie" ref="pie"></div>
			   		</li>
			   </ul>
			</div>
		)
	}
}

module.exports = ContainerSurveyModule2_2