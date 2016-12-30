
import React from 'react';

class RegionalBar extends React.Component {
	constructor(props) {
		super(props);
		this.isBar = true;
		this.messagedata = [];
		this.bardata = [];
		this.categoryName = this.props.parent.location.query.categoryName ? this.props.parent.location.query.categoryName : ''; 
	}
	state = {
		status: true
	};
	componentDidMount() {
		this.getBarDatas();
	}
	componentWillReceiveProps(nextProps){
		this.props = nextProps;
		this.getBarDatas();
	}
	start(){
		// 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(this.refs.bar);
		this.myChart.showLoading('default',{
			text: ''
		});
	}
	getBarDatas(){
		let config = {
			timeId: this.props.timeId,
			areaId: this.props.areaId,
			categoryId:this.props.parent.location.query.categoryId ? this.props.parent.location.query.categoryId : ''
		}
		$.GetAjax('/v1/category/industryTendency', config, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
            	this.isBar = true;
            	this.bardata = data.data.list;
            	this.messagedata = data.data.one;
            	
            	this.setState({
            		status: true
            	},()=>{
            		this.renderBar();
            		this.start();
            	});
            } else {
            	this.isBar = false;
            	this.setState({
            		status: false
            	});
            }
        });
	}
	renderBar(){
		var xAxisData = [];
		var data = [];
		for (var i = 0; i < this.bardata.length; i++) {
			if ( this.bardata[i] ) {
				xAxisData.push(this.bardata[i].month+"月");
		    	data.push(this.bardata[i].indexValue);
			}
		}
		let getDatasArray = $.getFormatCompany(data);
		let getData = getDatasArray.value;
		let company = getDatasArray.company;

		let colors =  ['#fec630','#ff8f2b'] ;
		let option = {
			grid: [
		        {
		        	x: '3%',
		        	y: '12%',
		        	width: '94%',
		        	height: '74%'
		        }
		    ],
		    tooltip: {
		    	trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        },
		        formatter: (data)=>{
		        	return data[0].name ? this.categoryName + "网络零售额<br/>"+data[0].name+"  "+ (data[0].value + company) : "无数据";
		        }
		    },
		    xAxis: [{
		        data: xAxisData,
		        axisLabel: {
		            textStyle: {
		                color: '#4b4b4b',
		                fontSize: '14px',
		                fontFamily:'Microsoft Yahei ui'
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
		        name: this.categoryName+'网络零售额',
		        data: getData,
		        barWidth: '50%',
		        barMinHeight: 10,
		        itemStyle: {
		            normal: {
		                label: {
		                    show: false,
		                    position: 'top',
		                    formatter: '{c}\n'
		                },
		                barBorderRadius:10,
		                color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								  offset: 0, color: colors[0]
								}, {
								  offset: 1, color: colors[1]
								}], false),
		                // shadowColor: 'rgba(0, 0, 0, .5)',
		                // shadowBlur: 20
		            }
		        }
		    }]
		};
		
		setTimeout(()=>{
			this.myChart.hideLoading();
			this.myChart.setOption(option);
		},560);
		
	}
	render() {
		if ( this.isBar == false ) {
			return null;
		}
		let time = this.messagedata ? this.messagedata.timeName : ' ';
		let data = [];
		data.push(this.messagedata ? this.messagedata.networkTradingSum : ' ');
		// let data = this.messagedata ? this.messagedata.networkTradingSum : ' ';
		let yearOnyear = [];
		let trading = this.messagedata ? this.messagedata.tradingSumYearOnYear : ' ';
		if(trading !='' && trading != null){
			let data = (trading*100).toFixed(2);
			if(data>0){
				yearOnyear = "+"+data+"%";
			}else{
				yearOnyear =data+"%";
			}
		}else{
			yearOnyear = trading || '';
		}
		let resultData = $.getFormatCompany(data);
		return (
			<div className="tradeDetail-bar">
			    <div className="bar-checked">
			   		<input type="button" className="current" value="网络零售额" />
			   	</div>
			    <div className="bar-bar" ref="bar"></div>
			    <div className="bar-message">
			    	<p><span>{time}</span>&nbsp;<span>{this.categoryName}</span>网络零售额</p>
			    	<p><span>{resultData.value}</span><span>{resultData.company}</span>&nbsp;&nbsp;
			    	同比<span></span><span>{yearOnyear}</span></p>
			    </div>
			</div>
		)
	}
}

module.exports = RegionalBar