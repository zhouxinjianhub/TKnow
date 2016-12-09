
import React from 'react';

class RegionalBar extends React.Component {
	constructor(props) {
		super(props);
		this.isBar = true;
		this.messagedata = [];
		this.bardata = false;
	}
	componentDidMount() {
    	// 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('bar-bar'));
		this.myChart.showLoading('default',{
			text: ''
		});
		this.getBarDatas();
	}
	componentWillReceiveProps(nextProps){
		this.props = nextProps;
		this.getBarDatas();
	}
	getBarDatas(){
		let config = {
			timeId: this.props.timeId,
			areaId: this.props.areaId,
			categoryId:this.props.categoryId
		}
		$.GetAjax('/v1/category/industryTendency', config, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
            	this.isBar = true;
            	this.bardata = data.data.list;
            	this.messagedata = data.data.one;
            	this.renderBar();
            	this.setState({
            		status: true
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
				xAxisData.push(this.bardata[i].categoryName);
		    	data.push(this.bardata[i].indexValue);
			}
		}
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
		    tooltip: {},
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
		        barWidth: 40,
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
		                shadowColor: 'rgba(0, 0, 0, .5)',
		                shadowBlur: 20
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
		let data = this.messagedata ? this.messagedata.networkRetail : ' ';
		let trading = this.messagedata ? this.messagedata.tradingSumYearOnYear : ' ';
		return (
			<div className="tradeDetail-bar">
			    <div className="bar-checked">
			   		<input type="button" className="current" value="网络零售额" />
			   	</div>
			    <div className="bar-bar" id="bar-bar"></div>
			    <div className="bar-message">
			    	<p><span>{time}</span><span></span>网络零售额</p>
					<p><span>{data}</span>元&nbsp;&nbsp;同比上升<span>{trading}</span>%</p>
			    </div>
			</div>
		)
	}
}

module.exports = RegionalBar