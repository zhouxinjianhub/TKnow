
import React from 'react';
import PubSub from 'pubsub-js';
import ReactDOM from 'react-dom';

class RegionalBar extends React.Component {
	constructor(props) {
		super(props);
		this.isPie = true;
		this.piedata = [];
	}
	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
        this.myChart1 = echarts.init(document.getElementById('pie1'));
        this.myChart2 = echarts.init(document.getElementById('pie2'));
        this.myChart1.showLoading('default',{
			text: ''
		});
        this.myChart2.showLoading('default',{
			text: ''
		});
        this.getTradingDatas();
	}
	componentWillReceiveProps(nextProps){
		this.myChart1.showLoading();
        this.myChart2.showLoading();
        this.props = nextProps;
        this.getTradingDatas();
	}
	getTradingDatas(){
		let config = {
			timeId: this.props.timeId,
			areaId: this.props.areaId
		}
		$.GetAjax('/v1/area/getTrading', config, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
            	this.piedata = data.data
            	this.renderChart1();
        		this.renderChart2();
        		this.setState({
            		status: false
            	},()=>{
            		let navconfig = {
            			timeName: this.piedata.timeName || "数据获取中",
            			timeId: this.piedata.timeId || ""
            		}
            		PubSub.publish('getNavYear',navconfig);
            		PubSub.publish('getNavYearId',this.piedata.timeId || "");
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
		        formatter: "{b} : {c} ({d}%)"
		    },
		    series : [{
	            type: 'pie',
	            radius : ['80%', '40%'],
	            center: ['33%','50%'],
	            data:[
	                {
	                    value: this.piedata.stapleAndB2B || 0,
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
	                    value: this.piedata.networkRetail || 0, 
	                    name:'网络零售额',
	                    label: {
	                        normal: {
	                            formatter: '\n'+(this.piedata.networkTradingSum || 0) +"万元",
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

		setTimeout(()=>{
			this.myChart1.hideLoading();
			this.myChart1.setOption(option);
			ReactDOM.findDOMNode(this.refs.pie1).style.opacity = 1;
		},560);
		
	}
	renderChart2(){
		let option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    series : [{
	            type: 'pie',
	            radius : ['80%', '40%'],
	            center: ['33%','50%'],
	            data:[
	                {
	                    value: this.piedata.entityRetail || 0,
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
	                    value: this.piedata.serviceRetail || 0, 
	                    name:'服务型',
	                    label: {
	                        normal: {
	                            formatter: '\n'+(this.piedata.networkRetail || 0) +"万元",
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

		setTimeout(()=>{
			this.myChart2.hideLoading();
			this.myChart2.setOption(option);
			ReactDOM.findDOMNode(this.refs.pie2).style.opacity = 1;
		},560);

	}
	render() {
		if ( this.isPie == false ) {
			return null;
		}
		return (
			<div className="regional-pie">
				<div className="pie pie-jiaoyi">
					<div className="pie-canvas">
						<div className="pie1" id="pie1"></div>
						<ul className="pie-legend" ref="pie1">
							<li className="blue-color">
								<div className="legend-left"></div>
								<div className="legend-right">
									<p>B2B及大宗</p>
									<p>{this.piedata.stapleAndB2B || ""}<span className="fontsmall">万元</span></p>
								</div>
							</li>
							<li className="fee-color">
								<div className="legend-left"></div>
								<div className="legend-right">
									<p>网络零售额</p>
									<p>{this.piedata.networkRetail || ""}<span className="fontsmall">万元</span></p>
								</div>
							</li>
						</ul>
					</div>
					<p className="pie-title">数据解读</p>
					<p className="pie-content">{this.piedata.tradingModel || ""}</p>
				</div>
				<div className="pie pie-lingshou">
					<div className="pie-canvas">
						<div className="pie2" id="pie2"></div>
						<ul className="pie-legend" ref="pie2">
							<li className="yellow-color">
								<div className="legend-left"></div>
								<div className="legend-right">
									<p>实物型</p>
									<p>{this.piedata.entityRetail || ""}<span className="fontsmall">万元</span></p>
								</div>
							</li>
							<li className="green-color">
								<div className="legend-left"></div>
								<div className="legend-right">
									<p>服务型</p>
									<p>{this.piedata.serviceRetail || ""}<span className="fontsmall">万元</span></p>
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