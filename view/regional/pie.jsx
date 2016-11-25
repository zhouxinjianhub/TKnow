
import React from 'react';

class RegionalBar extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
        this.myChart1 = echarts.init(document.getElementById('pie1'));
        this.myChart2 = echarts.init(document.getElementById('pie2'));
        this.renderChart1();
        this.renderChart2();
	}
	renderChart1(){
		let option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    series : [{
	            type: 'pie',
	            radius : ['85%', '40%'],
	            data:[
	                {
	                    value:335, 
	                    name:'占有率',
	                    label: {
	                        normal: {
	                            formatter: '网络零售额',
	                            position: 'center',
	                            textStyle: {
	                            	color: '#4b4b4b',
	                                fontSize: 16
	                            }
	                        }
	                    }
	                },{
	                    value:310, 
	                    name:'占位',
	                    label: {
	                        normal: {
	                            formatter: '\n1698.36亿元',
	                            position: 'center',
	                            textStyle: {
	                            	color: '#4b4b4b',
	                                fontSize: 18
	                            }
	                        }
	                    }
	                }
	            ]
	        }]
		};
		this.myChart1.setOption(option);
	}
	renderChart2(){
		let option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    series : [{
	            type: 'pie',
	            radius : ['85%', '40%'],
	            data:[
	                {
	                    value:335, 
	                    name:'占有率',
	                    label: {
	                        normal: {
	                            formatter: '网络零售额',
	                            position: 'center',
	                            textStyle: {
	                            	color:'#4b4b4b',
	                                fontSize: 16
	                            }
	                        }
	                    }
	                },{
	                    value:310, 
	                    name:'占位',
	                    label: {
	                        normal: {
	                            formatter: '\n1698.36亿元',
	                            position: 'center',
	                            textStyle: {
	                            	color: '#4b4b4b',
	                                fontSize: 18
	                            }
	                        }
	                    }
	                }
	            ]
	        }]
		};
		this.myChart2.setOption(option);
	}
	render() {
		return (
			<div className="regional-pie">
				<div className="pie pie-jiaoyi">
					<div className="pie-canvas">
						<div className="pie1" id="pie1"></div>
					</div>
					<p className="pie-title">数据解读</p>
					<p className="pie-content">数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读</p>
				</div>
				<div className="pie pie-lingshou">
					<div className="pie-canvas">
						<div className="pie2" id="pie2"></div>
					</div>
					<p className="pie-title">数据解读</p>
					<p className="pie-content">数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读</p>
				</div>
			</div>
		)
	}
}

module.exports = RegionalBar