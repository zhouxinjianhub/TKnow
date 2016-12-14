
import React from 'react';

class ContainerSurveyModule4 extends React.Component {
	constructor(props) {
		super(props);
		this.viewMoudle = false;
		this.dataList = void 0;
	}
	componentDidMount() {
		this.echart = echarts.init(this.refs.chart);
		this.refs.lastChart.style.display = 'none';
		this._getDatas();
	}
	componentWillReceiveProps(nextProps){
		this.echart.showLoading();
        this.props = nextProps;
        this._getDatas();
	}
	_getDatas() {
		let option = {
			timeId: this.props.timeId,
			areaId: this.props.areaId
		};
		$.GetAjax('/v1/zhishu/electronicAnalysis', option, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
            	this.viewMoudle = true;
            	this.dataList = data.data;
            	this.showChart(this.dataList["networkTradingList"] || [],0);
            	this.refs.lastChart.style.display = 'block';
                this.setState({
                	status: true
                });

             } else {
                this.viewMoudle = false;
                this.setState({
                	status: false
                });
             }
        });
	}
	showChart(chartData,type) {
		let xAxisData = [];
		let data = chartData;
		chartData.map((d,k)=>{
			xAxisData.push(d.name);
		});

		let colors = [{
			start: '#ba5bd5',
			end: '#9761f1'
		},{
			start: '#ffac68',
			end: '#ff599e'
		},{
			start: '#fec630',
			end: '#ff8f2b'
		},{
			start: '#95cb5f',
			end: '#41b37e'
		}];
		let option = {
			grid: [
		        {
		        	x: '3%',
		        	y: '3%',
		        	width: '94%',
		        	height: '84%'
		        }
		    ],
		    tooltip: {
		    	trigger: 'axis',
		    	axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        },
		        formatter: (data)=>{
		        	return data[0].name ? data[0].name+"  "+data[0].value+"万元" : "无数据";
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
		        barWidth: '50%',
		        barMinHeight: 10,
		        itemStyle: {
		            normal: {
		                label: {
		                    show: false
		                },
		                barBorderRadius:10,
		                color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								  offset: 0, color: colors[type].start
								}, {
								  offset: 1, color: colors[type].end
								}], false)
		            }
		        }
		    }]
		};
		this.echart.hideLoading();
		this.echart.setOption(option);
	}
	changeNav(type,e) {
		let ajaxCont = ["networkTradingList","networkRetailList","entityRetailList","serviceRetailList"];
		if ( $(e.target).hasClass('current') ) {
			return false;
		}else{
			$(e.target).parent().find('span').removeClass('current');
			$(e.target).addClass('current');

			this.echart.showLoading();
			this.showChart(this.dataList[ajaxCont[type]] || [],type);
		}
	}
	render() {
		return (
			<div className="survey-module" ref="lastChart">
				<div className="survey-module-title">四川省各市州电子商务交易解析</div>
				<div className="survey-module-content">
					<div className="module4-nav">
						<span className="current" onClick={this.changeNav.bind(this,0)}>网络交易额</span>
						<span onClick={this.changeNav.bind(this,1)}>网络零售额</span>
						<span onClick={this.changeNav.bind(this,2)}>实物型网络零售额</span>
						<span onClick={this.changeNav.bind(this,3)}>服务型网络零售额</span>
					</div>
					<div className="module-echarts" ref="chart"></div>
				</div>
				
			</div>
		)
	}
}

module.exports = ContainerSurveyModule4