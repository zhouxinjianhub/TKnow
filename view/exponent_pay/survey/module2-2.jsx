
import React from 'react';

class ContainerSurveyModule2_2 extends React.Component {
	constructor(props) {
		super(props);
		this.viewMoudle = true;
		this.commonData = false;
		this.parentData = [];
		this.childData = [];
	}
	componentDidMount() {
		this._getDatas();
	}
	componentWillReceiveProps(nextProps){
        this.props = nextProps;
        this._getDatas();
	}
	start() {
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
		$.GetAjax('/v1/zhishu/monthlyTrade', option, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
            	this.viewMoudle = true;
                this.parentData = data.data && data.data['parent'];
                this.childData = data.data && data.data['child'];
                this.commonData = data.data;

                
                this.setState({
                	status: true
                },()=>{
                	this.start();
                	this.showChart();
                	this.showPie();
                });

             } else {
                this.viewMoudle = false;
                this.props.addError();
                this.setState({
                	status: false
                });
             }
        });
	}
	showChart() {
		let legendData = [this.commonData.parentAreaName,this.commonData.childAreaName];
		let xAxis = [];
		let parentData = [];
		let childData = [];
		this.parentData.map((datas,k)=>{
			xAxis.push(datas.month < 10 ? "0"+datas.month+"月" : datas.month+"月");
			parentData.push(datas.indexValue);
		});
		this.childData.map((datas,k)=>{
			xAxis.push(datas.month < 10 ? "0"+datas.month+"月" : datas.month+"月");
			childData.push(datas.indexValue);
		});
		var option = {
		    tooltip : {
		        trigger: 'axis',
		        formatter: (data)=>{
		        	let result = data[0].name ? data[0].name+"网络零售额<br/>"+data[0].seriesName+" "+data[0].value+"万元 "+"环比+"+data[0].value+"<br/>"+
		        				data[1].seriesName+" "+data[1].value+"万元 "+"环比+"+data[1].value : "无数据";
		        	return result;
		        }
		    },
		    legend: {
		        data:legendData,
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
	            data : xAxis,
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
	            name: legendData[1],
	            type:'line',
	            stack: 'k',
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
	            data: childData
	        },{
	            name:legendData[0],
	            type:'line',
	            stack: 'k',
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
	            data: parentData
	        }]
		};
		this.echart.hideLoading();
		this.echart.setOption(option);
		
	}
	showPie() {
		this.echartspie = echarts.init(this.refs.pie);
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
	            	value: this.commonData && this.commonData.childSum, 
	            	name: this.commonData.childAreaName || "",
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
	            	value: this.commonData && this.commonData.parentSum,
	            	name: this.commonData.parentAreaName || "",
	            	itemStyle: {
		            	normal: {
		            		color: '#ddd'
		            	}
		            }
	            }]
	        }]
		};
		this.echartspie.setOption(option);
	}
	render() {
		if ( !this.viewMoudle ) {
			return false;
		}
		return (
			<div className="survey-module-list">
			   <div className="title">
			   		<p>月度网络交易额及环比增长率</p>
			   </div>
			   <div className="echarts-box" ref="chart"></div>
			   <ul className="module2-list">
			   		{(()=>{
			   			
			   			if ( !this.commonData ) {
			   				return false;
			   			}else{
			   				let HTMLDOMS = [];
			   				let option = [{
				   				title: this.commonData.parentAreaName,
				   				type: '网络零售额',
				   				total: this.commonData.parentSum+'<span>万元</span>'
				   			},{
				   				title: this.commonData.childAreaName,
				   				type: '网络零售额',
				   				total: this.commonData.childSum+'<span>万元</span>'
				   			},{
				   				title: this.commonData.childAreaName+"在"+this.commonData.parentAreaName,
				   				type: '占比',
				   				total: this.commonData.childScale+"%",
				   				pie: <div className="module2-pie" ref="pie"></div>
				   			}];

			   				option.map((d,i)=>{
			   					HTMLDOMS.push(<li>
			   									{ d.title && <p dangerouslySetInnerHTML={{__html: d.title}}/> || '' }
			   									{ d.type && <p dangerouslySetInnerHTML={{__html: d.type}}/> || '' }
			   									{ d.total && <p dangerouslySetInnerHTML={{__html: d.total}}/> || '' }
									   			{ d.pie || ''}
									   		</li>)
			   				})
			   				return HTMLDOMS;
			   			}
			   			
			   		})()}
			   		
			   </ul>
			</div>
		)
	}
}

module.exports = ContainerSurveyModule2_2