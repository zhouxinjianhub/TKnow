
import React from 'react';
import PubSub from 'pubsub-js';
import ReactDOM from 'react-dom';

class TradeMap extends React.Component {
	constructor(props) {
		super(props);
		this.isBar = true;
		this.datatimeAreaName = '全国';
	}
	state = {
		btnCurrent: 's'
	};
	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
        this.myChartMap = echarts.init(document.getElementById('map'));
        this.myChartBar = echarts.init(document.getElementById('bar'));
        this.myChartMap.showLoading('default',{
			text: ''
		});
        this.myChartBar.showLoading('default',{
			text: ''
		});
		this.renderMap();
		this.renderBar();
	}
	changeMap(key,e){
		if ( key == this.state.btnCurrent ) {
			return false;
		};
		this.myChartMap.showLoading('default',{
			text: ''
		});
		this.myChartBar.showLoading('default',{
			text: ''
		});
		this.setState({
			btnCurrent: key
		},()=>{
			// this.getBarDatas(key);
			this.renderMap();
			this.renderBar();
		})
	}
	randomData(){
		return  Math.round(Math.random()*1400);
	}
	renderMap(){
		let mapName = this.datatimeAreaName;
		if ( this.datatimeAreaName == "全国" ) {
			mapName = "中国";
		};
		let series = [];
		$.get('../../map/'+mapName+'.json', myJson => {
		});
		
		let option = {
			 
		    tooltip: {
		        trigger: 'item'
		    },
		    visualMap: {
		    	orient: 'horizontal',
		        min: 0,
		        max: 2500,
		        left: 'left',
		        top: 'bottom',
		        text: ['低','指数：高'],           // 文本，默认为数值文本
		        calculable: true,
		        color: ["#E7DAFF","#667CFD"],
		        type: 'piecewise',
		        itemWidth:7,
		        itemHeight:14,
		        itemGap:1,
		        splitNumber:7,
		        left:'20px',
		        textStyle:{
		        	color:'#d1d6e1',
		        	fontSize:'16px',
		        }
		    },
		    series : [{
		     	name: '在线旅游热度指数',
	            type: 'map',
	            mapType: mapName,
	            roam: false,
	            label: {
	                normal: {
	                    show: false
	                },
	                emphasis: {
	                    show: true
	                }
	            },
				itemStyle:{
					normal:{
						borderColor:'#fff',
						borderWidth:2
					}
				},
	            data:[
	                {name: '北京',value: this.randomData() },
	                {name: '天津',value: this.randomData() },
	                {name: '上海',value: this.randomData() },
	                {name: '重庆',value: this.randomData() },
	                {name: '河北',value: this.randomData() },
	                {name: '河南',value: this.randomData() },
	                {name: '云南',value: this.randomData() },
	                {name: '辽宁',value: this.randomData() },
	                {name: '黑龙江',value: this.randomData() },
	                {name: '湖南',value: this.randomData() },
	                {name: '安徽',value: this.randomData() },
	                {name: '山东',value: this.randomData() },
	                {name: '新疆',value: this.randomData() },
	                {name: '江苏',value: this.randomData() },
	                {name: '浙江',value: this.randomData() },
	                {name: '江西',value: this.randomData() },
	                {name: '湖北',value: this.randomData() },
	                {name: '广西',value: this.randomData() },
	                {name: '甘肃',value: this.randomData() },
	                {name: '山西',value: this.randomData() },
	                {name: '内蒙古',value: this.randomData() },
	                {name: '陕西',value: this.randomData() },
	                {name: '吉林',value: this.randomData() },
	                {name: '福建',value: this.randomData() },
	                {name: '贵州',value: this.randomData() },
	                {name: '广东',value: this.randomData() },
	                {name: '青海',value: this.randomData() },
	                {name: '西藏',value: this.randomData() },
	                {name: '四川',value: this.randomData() },
	                {name: '宁夏',value: this.randomData() },
	                {name: '海南',value: this.randomData() },
	                {name: '台湾',value: this.randomData() },
	                {name: '香港',value: this.randomData() },
	                {name: '澳门',value: this.randomData() }
	            ]
		    }]

		};
		setTimeout(()=>{
			this.myChartMap.hideLoading();
			this.myChartMap.setOption(option);
		},600);
	}
	renderBar(){
		let option = {
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'value',
		        boundaryGap: [0, 0.01],
		        axisLine:{
		            show:false
		        },
		        axisTick:{
		            show:false
		        },
		        axisLabel:{
		            show:false
		        },  
		        splitLine:{
		            show:false
		        }
		    },
		    yAxis: {
		        type: 'category',
		         axisLine:{
		            show:false
		        },
		        axisTick:{
		            show:false
		        },
		        axisLabel:{
		            show:true
		        },
		        splitLine:{
		            show:false
		        },
		        data: ['10.          巴西','9.            印尼','8.            美国','7.            印度','6.            巴西','5.            印尼','4.            美国','3.            印度','2.            中国','1.            世界人口(万)']
		    },
		    series: [   
		        {
		            name: '2011年', 
		            type: 'bar',
		            data: [1, 2, 3, 4, 5,6,7,8,9,10],
		            barWidth: 16,
			        barMinHeight: 16,
		            itemStyle:{
		                normal:{
		                    label: {
			                    show: false,
			                    position: 'top',
			                    formatter: '{c}\n'
			                },
			                barBorderRadius:60,
		                    color:'#a168ff'
		                }
		            }
		        }
		    ]
		};
		setTimeout(()=>{
			this.myChartBar.hideLoading();
			this.myChartBar.setOption(option);
		},600);
	}
	render() {
		if ( this.isBar == false ) {
			return null;
		}
		return (    
			<div className="trade-map">
			    <div className="map-checked">
			   		<input type="button" className={ this.state.btnCurrent === 's' ? "current" : "" }  onClick={this.changeMap.bind(this,'s')} value="在线旅游热度指数" />
			   		<input type="button" className={ this.state.btnCurrent === 'f' ? "current" : "" }  onClick={this.changeMap.bind(this,'f')} value="旅游观光景区热度指数" />
			   	</div>
			    <div className="map" id="map"></div>
			    <div className="bar" id="bar"></div>
			</div>
		)
	}
}

module.exports = TradeMap