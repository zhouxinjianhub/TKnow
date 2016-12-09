
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
            	this.renderBar(this.state.btnCurrent);
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
	renderBar(type){
		var xAxisData = [];
		var data = [];
		let bardata = type == 's' ? this.entity : this.service;
		bardata.map((d,k)=>{
			xAxisData.push(d.name);
		    data.push(d.value);
		});
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
	changeBar(key,e){
		if ( key == this.state.btnCurrent ) {
			return false;
		};
		this.myChart.showLoading('default',{
			text: ''
		});
		this.setState({
			btnCurrent: key
		},()=>{
			this.renderBar(key);
		})
	}
	componentDidMount() {
    	// 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(this.refs.bar);
		this.myChart.showLoading('default',{
			text: ''
		});
		this.getBarDatas();
	}
	componentWillReceiveProps(nextProps){
		this.myChart.showLoading('default',{
			text: ''
		});
		this.props = nextProps;
		this.getBarDatas();
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