
import React from 'react';

class RegionalBar extends React.Component {
	constructor(props) {
		super(props);
		this.isPie = false;
		this.piedata = [];
	}
	componentDidMount() {
		this.getTradingDatas();
	}
	componentWillReceiveProps(nextProps){
        this.props = nextProps;
        this.getTradingDatas();
	}
	start(){
		// 基于准备好的dom，初始化echarts实例
        this.myChart1 = echarts.init(document.getElementById('pie1'));
        this.myChart2 = echarts.init(document.getElementById('pie2'));
        this.myChart1.showLoading('default',{
			text: ''
		});
        this.myChart2.showLoading('default',{
			text: ''
		});
	}
	getTradingDatas(){
		let config = {
			timeId: this.props.timeId,
			areaId: this.props.areaId
		}
		$.GetAjax('/v1/area/getTrading', config, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
            	this.piedata = data.data;
            	let formatData = $.getFormatCompany([this.piedata.networkTradingSum,this.piedata.stapleAndB2B,this.piedata.networkRetail,this.piedata.entityRetail,this.piedata.serviceRetail]);
            	this.formatDatas = formatData.value;
            	this.company = formatData.company;
            	this.isPie = true;
        		this.setState({
            		status: true
            	},()=>{
            		this.start();
            		this.renderChart1();
        			this.renderChart2();
            	});
            } else {
            	this.isPie = false;
            	this.setState({
            		status: false
            	});
            }
        });
	}
	renderChart1(){
		let option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{b} : {c}"+this.company+" ({d}%)"
		    },
		    series : [{
	            type: 'pie',
	            radius : ['80%', '40%'],
	            center: ['33%','50%'],
	            data:[
	                {
	                    value: this.formatDatas[1] || 0,
	                    name:'B2B及大宗',
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
	                    value: this.formatDatas[2] || 0, 
	                    name:'网络零售额',
	                    label: {
	                        normal: {
	                            formatter: this.formatDatas[0] + this.company,
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
	                }
	       //          ,{
	       //              value:100, 
	       //              name:'',
	       //              label: {
	       //                  normal: {
	       //                      show: false,
	       //                      position: 'inside'
	       //                  }
	       //              },
	       //              itemStyle: {
	       //              	normal: {
	       //              		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								//   offset: 0, color: '#a168ff'
								// }, {
								//   offset: 1, color: '#5883ff'
								// }], false)
	       //              	}
	       //              }
	       //          }
	            ]
	        }]
		};

		this.myChart1.hideLoading();
		this.myChart1.setOption(option);
		this.refs.pie1.style.opacity = 1;
		
	}
	renderChart2(){
		let option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{b} : {c}"+this.company+" ({d}%)"
		    },
		    series : [{
	            type: 'pie',
	            radius : ['80%', '40%'],
	            center: ['33%','50%'],
	            data:[
	                {
	                    value: this.formatDatas[3],
	                    name:'实物型',
	                    label: {
	                        normal: {
	                            formatter: '网络零售额',
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
								  offset: 0, color: '#fec630'
								}, {
								  offset: 1, color: '#ff8f2b'
								}], false)
	                    	}
	                    }
	                },{
	                    value: this.formatDatas[4],
	                    name:'服务型',
	                    label: {
	                        normal: {
	                            formatter: this.formatDatas[2] + this.company,
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
								  offset: 1, color: '#41b37e'
								}], false)
	                    	}
	                    }
	                }
	            ]
	        }]
		};

		this.myChart2.hideLoading();
		this.myChart2.setOption(option);
		this.refs.pie2.style.opacity = 1;

	}
	render() {
		if ( this.isPie == false ) {
			return null;
		}
		return (
			<div className="regional-pie">
				<div className="pie">
					<div className="pie-canvas">
						<div className="pie1" id="pie1"></div>
						<ul className="pie-legend" ref="pie1">
							<li className="blue-color">
								<div className="legend-left"></div>
								<div className="legend-right">
									<p>B2B及大宗</p>
									<p>{ this.formatDatas[1] }<span className="fontsmall">{this.company}</span></p>
								</div>
							</li>
							<li className="fee-color">
								<div className="legend-left"></div>
								<div className="legend-right">
									<p>网络零售额</p>
									<p>{ this.formatDatas[2] }<span className="fontsmall">{this.company}</span></p>
								</div>
							</li>
						</ul>
					</div>
					<p className="pie-title">数据解读</p>
					<p className="pie-content">{ this.piedata.tradingModel || "" }</p>
				</div>
				<div className="pie-line">
					<img className="top" src="./images/missangle.png"/>
					<img className="bottom" src="./images/missangle.png"/>
				</div>
				<div className="pie">
					<div className="pie-canvas">
						<div className="pie2" id="pie2"></div>
						<ul className="pie-legend" ref="pie2">
							<li className="yellow-color">
								<div className="legend-left"></div>
								<div className="legend-right">
									<p>实物型</p>
									<p>{ this.formatDatas[3] }<span className="fontsmall">{this.company}</span></p>
								</div>
							</li>
							<li className="green-color">
								<div className="legend-left"></div>
								<div className="legend-right">
									<p>服务型</p>
									<p>{ this.formatDatas[4] }<span className="fontsmall">{this.company}</span></p>
								</div>
							</li>
						</ul>
					</div>
					<p className="pie-title">数据解读</p>
					<p className="pie-content">{this.piedata.retailModel || ""}</p>
				</div>
			</div>
		)
	}
}

module.exports = RegionalBar