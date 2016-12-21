
import React from 'react';
import PubSub from 'pubsub-js';

class ContainerSurveyModule2_1 extends React.Component {
	constructor(props) {
		super(props);
		this.viewMoudle = true;
		this.btnState = "p";

		this.parentData = false;
        this.childData = false;
        this.parentName = "";
        this.childName = "";
	}
	componentDidMount() {
		this._getDatas();
	}
	componentWillReceiveProps(nextProps){
        this.props = nextProps;
        this._getDatas();
	}
	start(){
		// 基于准备好的dom，初始化echarts实例
        this.echart = echarts.init(this.refs.chart);
        this.echart.showLoading('default',{
			text: ''
		});
	}
	_getDatas() {
		let option = {
			timeId: this.props.timeId,
			areaId: this.props.areaId
		};
		$.GetAjax('/v1/zhishu/inner/getIntegral', option, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
            	this.viewMoudle = true;
                this.parentData = data.data && data.data['parent'];
                this.childData = data.data && data.data['child'];
                this.parentName = data.data && data.data['parentAreaName'];
                this.childName = data.data && data.data['childAreaName'];
                this.setState({
                	status: true
                },()=>{
                	this.start();
                	PubSub.publish('JBsub',data.data.indexReport);
                	this.showChart( this.btnState == "p" ? this.parentData : this.childData );
                });

             } else {
             	PubSub.publish('JBsub', false);
                this.viewMoudle = false;
                this.props.addError();
                this.setState({
                	status: false
                });
             }
        });
	}
	showChart(chartData=[]) {
		let xAxisData = ['网络交易额','网络零售额'];
		let listDataName = ["大宗及B2B","网络零售额","实物型","服务型"];
		let tradeScale = chartData.tradingSumYearOnYear;
		let retailScale = chartData.retailYearOnYear;
		
		let formatData = $.getFormatCompany([chartData.networkTradingSum,chartData.stapleAndB2B,chartData.entityRetail,chartData.networkRetail,chartData.serviceRetail]);
		let company = formatData.company;
		if ( tradeScale ) {
			tradeScale = tradeScale >= 0 ? ("+"+tradeScale+"%") : (tradeScale+"%");
		}else{
			tradeScale = "-";
		}

		if ( retailScale ) {
			retailScale = retailScale >= 0 ? ("+"+retailScale+"%") : (retailScale+"%");
		}else{
			retailScale = "-";
		}
		
		var option = {
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        },
		        formatter: (data)=>{
		        	return data[0]['data'].name ? data[0]['data'].name+" "+(data[0]['data'].value+company)+"<br/>"+data[1]['data'].name+" "+(data[1]['data'].value+company) : "无数据";
		        }
		    },
		    grid: [{
	        	x: '3%',
	        	y: '20%',
	        	width: '94%',
	        	height: '70%'
	        }],
		    xAxis: [{
		        data: xAxisData,
		        axisLabel: {
		        	interval: 0,
		            textStyle: {
		                color: '#4b4b4b',
		                fontSize: '14'
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
                	value: formatData.value[1],
                	name: listDataName[0],
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
			                shadowColor: 'rgba(0, 0, 0, 0)',
			                shadowBlur: 20
			            }
			        }
                },
                {
                	value: formatData.value[2], 
                	name: listDataName[2],
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
			                shadowColor: 'rgba(0, 0, 0, 0)',
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
                	value: formatData.value[3], 
                	name: listDataName[1],
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
			                    formatter: formatData.value[0]+company+'\n同比'+tradeScale
			                },
			                barBorderRadius:[10,10,0,0],
			                color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									  offset: 0, color: '#46d2fb'
									}, {
									  offset: 1, color: '#49befc'
									}], false),
			                shadowColor: 'rgba(0, 0, 0, 0)',
			                shadowBlur: 20
			            }
			        }
			    },{
                	value: formatData.value[4], 
                	name: listDataName[3],
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
			                    formatter: formatData.value[3]+company+'\n同比'+retailScale
			                },
			                barBorderRadius:[10,10,0,0],
			                color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									  offset: 0, color: '#fec630'
									}, {
									  offset: 1, color: '#ff8f2b'
									}], false),
			                shadowColor: 'rgba(0, 0, 0, 0)',
			                shadowBlur: 20
			            }
			        }
                }]
		    }]
		};
		this.echart.hideLoading();
		this.echart.setOption(option);
	}
	changeNav(e) {
		if ( $(e.target).hasClass('disabled') ) {
			return false;
		}
		if ( $(e.target).hasClass('current') ) {
			return false;
		}else{
			$(e.target).parent().find('span').removeClass('current');
			$(e.target).addClass('current');

            this.btnState = $(e.target).data('label');

			this.showChart( this.btnState == "p" ? this.parentData : this.childData );
		}
	}
	render() {
		if ( !this.viewMoudle ) {
			return false;
		};
		return (
			<div className="survey-module-list" >
			   <div className="title">
			   		<p>网络交易额与网络零售额</p>

			   		<div className="nav-list">
			   			{(()=>{
			   				if ( this.parentName ) {
			   					return <span className={ this.parentData ? "current" : "current disabled" } onClick={this.changeNav.bind(this)} data-label="p">{this.parentName}</span>
			   				}
			   			})()}
			   			{(()=>{
			   				if ( this.childName ) {
			   					return <span className={ this.childData ? "" : "disabled" } onClick={this.changeNav.bind(this)} data-label="c">{this.childName}</span>
			   				}
			   			})()}
			   		</div>
			   </div>
			   <div className="echarts-box" ref="chart"></div>
			</div>
		)
	}
}

module.exports = ContainerSurveyModule2_1