
import React from 'react';
import ReactDOM from 'react-dom';

class ContainerSurveyModule2_1 extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.echart = echarts.init(ReactDOM.findDOMNode(this.refs.chart));
		let xAxisData = ['网络交易额','网络零售额'];
		var option = {
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        },
		        formatter: (data)=>{
		        	return data[0]['data'].name+" "+data[0]['data'].value+"<br/>"+data[1]['data'].name+" "+data[1]['data'].value;
		        }
		    },
		    grid: [
		        {
		        	x: '3%',
		        	y: '12%',
		        	width: '94%',
		        	height: '74%'
		        }
		    ],
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
		    series : [{
	            name:'',
	            type:'bar',
	            stack: 'A',
	            barWidth: '50%',
	            data:[{
                	value:335,
                	name:'直达',
		            itemStyle: {
			            normal: {
			                label: {
			                    show: false
			                },
			                barBorderRadius:[0,0,10,10],
			                color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									  offset: 0, color: '#ffac68'
									}, {
									  offset: 1, color: '#ff599e'
									}], false),
			                shadowColor: 'rgba(0, 0, 0, .5)',
			                shadowBlur: 20
			            }
			        }
                },
                {
                	value:679, 
                	name:'营销广告',
		            itemStyle: {
			            normal: {
			                label: {
			                    show: false,
			                    position: 'top',
			                    formatter: '{c}\n'
			                },
			                barBorderRadius:[0,0,10,10],
			                color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									  offset: 0, color: '#95cb5f'
									}, {
									  offset: 1, color: '#41b37e'
									}], false),
			                shadowColor: 'rgba(0, 0, 0, .5)',
			                shadowBlur: 20
			            }
			        }
			    }]
	        },{
	            name:'',
	            type:'bar',
	            stack: 'A',
	            barWidth: '50%',
	            data:[{
                	value:440, 
                	name:'aaaaa',
                	label: {
	                    normal: {
	                    	show: true,
	                    	textStyle: {
	                    		color: '#4b4b4b',
	                    		fontSize: '14'
	                    	}
	                    }
	                },
		            itemStyle: {
			            normal: {
			                label: {
			                    show: true,
			                    position: 'top',
			                    formatter: '{c}亿元\n同比+30%\n'
			                },
			                barBorderRadius:[10,10,0,0],
			                color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									  offset: 0, color: '#46d2fb'
									}, {
									  offset: 1, color: '#49befc'
									}], false),
			                shadowColor: 'rgba(0, 0, 0, .5)',
			                shadowBlur: 20
			            }
			        }
			    },
                {
                	value:526, 
                	name:'xxxxxxx',
                	label: {
	                    normal: {
	                    	show: true,
	                    	textStyle: {
	                    		color: '#4b4b4b',
	                    		fontSize: '14'
	                    	}
	                    }
	                },
		            itemStyle: {
			            normal: {
			                label: {
			                    show: false,
			                    position: 'top',
			                    formatter: '{c}亿元\n同比+30%\n'
			                },
			                barBorderRadius:[10,10,0,0],
			                color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									  offset: 0, color: '#fec630'
									}, {
									  offset: 1, color: '#ff8f2b'
									}], false),
			                shadowColor: 'rgba(0, 0, 0, .5)',
			                shadowBlur: 20
			            }
			        }
                }]
		    }]
		};
		this.echart.setOption(option);
	}
	render() {
		return (
			<div className="survey-module-list">
			   <div className="title">
			   		<p>网络交易额与网络零售额</p>
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

module.exports = ContainerSurveyModule2_1