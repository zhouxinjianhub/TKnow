
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
		this.myChart1.showLoading();
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
	                    name:'B2B',
	                    label: {
	                        normal: {
	                            formatter: '网络交易额',
	                            position: 'center',
	                            textStyle: {
	                            	color: '#4b4b4b',
	                                fontSize: 16
	                            }
	                        }
	                    },
	                    itemStyle: {
	                    	normal: {
	                    		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								  offset: 0, color: '#46d2fb'
								}, {
								  offset: 1, color: '#49befc'
								}], false)
	                    	}
	                    }
	                },{
	                    value:310, 
	                    name:'大宗交易',
	                    label: {
	                        normal: {
	                            formatter: '\n1698.36亿元',
	                            position: 'center',
	                            textStyle: {
	                            	color: '#4b4b4b',
	                                fontSize: 18
	                            }
	                        }
	                    },
	                    itemStyle: {
	                    	normal: {
	                    		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								  offset: 0, color: '#ffac68'
								}, {
								  offset: 1, color: '#ff599e'
								}], false)
	                    	}
	                    }
	                },{
	                    value:100, 
	                    name:'',
	                    label: {
	                        normal: {
	                            show: false,
	                            position: 'inside'
	                        }
	                    },
	                    itemStyle: {
	                    	normal: {
	                    		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								  offset: 0, color: '#a168ff'
								}, {
								  offset: 1, color: '#5883ff'
								}], false)
	                    	}
	                    }
	                }
	            ]
	        }]
		};
		setTimeout(()=>{
			this.myChart1.hideLoading();
			this.myChart1.setOption(option);
		},3000);
		
	}
	renderChart2(){
		this.myChart2.showLoading();
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
	                    value:535, 
	                    name:'实务型',
	                    label: {
	                        normal: {
	                            formatter: '网络零售额',
	                            position: 'center',
	                            textStyle: {
	                            	color:'#4b4b4b',
	                                fontSize: 16
	                            }
	                        }
	                    },
	                    itemStyle: {
	                    	normal: {
	                    		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								  offset: 0, color: '#fec630'
								}, {
								  offset: 1, color: '#ff8f2b'
								}], false)
	                    	}
	                    }
	                },{
	                    value:310,
	                    name:'服务型',
	                    label: {
	                        normal: {
	                            formatter: '\n123.123亿元',
	                            position: 'center',
	                            textStyle: {
	                            	color: '#4b4b4b',
	                                fontSize: 18
	                            }
	                        }
	                    },
	                    itemStyle: {
	                    	normal: {
	                    		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								  offset: 0, color: '#95cb5f'
								}, {
								  offset: 1, color: '#41b371'
								}], false)
	                    	}
	                    }
	                }
	            ]
	        }]
		};
		setTimeout(()=>{
			this.myChart2.hideLoading();
			this.myChart2.setOption(option);
		},3000);
	}
	render() {
		return (
			<div className="regional-pie">
				<div className="pie pie-jiaoyi">
					<div className="pie-canvas">
						<div className="pie1" id="pie1"></div>
						<ul className="pie-legend">
							<li>
								<div className="legend-left"></div>
								<div className="legend-right">
									<p>B2B</p>
									<p>123.123<span className="fontsmall">万元</span></p>
								</div>
							</li>
							<li>
								<div className="legend-left"></div>
								<div className="legend-right">
									<p>B2B</p>
									<p>123.123<span className="fontsmall">万元</span></p>
								</div>
							</li>
							<li>
								<div className="legend-left"></div>
								<div className="legend-right">
									<p>B2B</p>
									<p>123.123<span className="fontsmall">万元</span></p>
								</div>
							</li>
						</ul>
					</div>
					<p className="pie-title">数据解读</p>
					<p className="pie-content">数据解读</p>
				</div>
				<div className="pie pie-lingshou">
					<div className="pie-canvas">
						<div className="pie2" id="pie2"></div>
						<ul className="pie-legend">
							<li>
								<div className="legend-left"></div>
								<div className="legend-right">
									<p>B2B</p>
									<p>123.123<span className="fontsmall">万元</span></p>
								</div>
							</li>
							<li>
								<div className="legend-left"></div>
								<div className="legend-right">
									<p>B2B</p>
									<p>123.123<span className="fontsmall">万元</span></p>
								</div>
							</li>
						</ul>
					</div>
					<p className="pie-title">数据解读</p>
					<p className="pie-content">数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读数据解读</p>
				</div>
			</div>
		)
	}
}

module.exports = RegionalBar