
import React from 'react';

class RegionalBar extends React.Component {
	constructor(props) {
		super(props);
		this.isBar = true;
		this.entity = []; // 实物型数据
		this.service = []; // 服务型数据
	}
	state = {
		btnCurrent: 's'
	};
	getBarDatas(type){
		let config = {
			timeId: this.props.timeId,
			areaId: this.props.areaId
		}
		$.GetAjax('/v1/area/getIndustryDistribute', config, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
            	this.isBar = true;
            	this.entity = data.data && data.data['entity'];
            	this.service = data.data && data.data['service'];
            	this.setState({
            		status: true
            	},()=>{
            		this.start();
            		this.renderBar(this.state.btnCurrent);
            	});
            } else {
            	this.isBar = false;
            	this.setState({
            		status: false
            	});
            }
        });
	}
	renderBar(type){
		var xAxisData = [];
		var data = [];
		let bardata = type == 's' ? this.entity : this.service;
		bardata.map((d,k)=>{
			xAxisData.push(d.name);
		    data.push(d.value);
		});
		let getDatasArray = $.getFormatCompany(data);
		let getData = getDatasArray.value;
		let company = getDatasArray.company;
		let colors = this.state.btnCurrent == 's' ? ['#fec630','#ff8f2b'] : ['#95cb5f','#41b371'];
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
		    	axisPointer : {
		            type : 'shadow'
		        },
		        formatter: (data)=>{
		        	return data[0].name ? data[0].name+"  "+ (data[0].value + company) : "无数据";
		        }
		    },
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
		    series: [{
		        type: 'bar',
		        name: '',
		        data: getData,
		        barWidth: '50%',
		        barMinHeight: 10,
		        itemStyle: {
		            normal: {
		                label: {
		                    show: false
		                },
		                barBorderRadius:10,
		                color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								  offset: 0, color: colors[0]
								}, {
								  offset: 1, color: colors[1]
								}], false)
		            }
		        }
		    }]
		};
		
		this.myChart.hideLoading();
		this.myChart.setOption(option);
	
	}
	changeBar(key,e){
		if ( key == this.state.btnCurrent ) {
			return false;
		};
		this.start();
		this.setState({
			btnCurrent: key
		},()=>{
			this.renderBar(key);
		})
	}
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
	render() {
		if ( this.isBar == false ) {
			return null;
		}
		return (
			<div className="regional-bar">
			    <div className="bar-checked">
			   		<input type="button" className={ this.state.btnCurrent === 's' ? "current" : "" } value="实务型" onClick={this.changeBar.bind(this,'s')}/>
			   		<input type="button" className={ this.state.btnCurrent === 'f' ? "current" : "" } value="服务型" onClick={this.changeBar.bind(this,'f')}/>
			   	</div>
			    <div className="bar" ref="bar"></div>
			</div>
		)
	}
}

module.exports = RegionalBar