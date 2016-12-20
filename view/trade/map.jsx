
import React from 'react';
import PubSub from 'pubsub-js';
import ReactDOM from 'react-dom';

class TradeMap extends React.Component {
	constructor(props) {
		super(props);
		this.istradeMap = true;
		this.bardatalen = 0;
		this.datatimeAreaName = '全国';
	}
	componentDidMount() {
		this.getMapDatas();
	}
	componentWillReceiveProps(nextProps){
		this.props = nextProps;
		this.getMapDatas();
	}
	getRef(){
		// 基于准备好的dom，初始化echarts实例
        this.myChartMap = echarts.init(this.refs.map);
        this.myChartBar = echarts.init(this.refs.bar);
        this.myChartMap.showLoading('default',{
			text: ''
		});
        this.myChartBar.showLoading('default',{
			text: ''
		});
	}
	getMapDatas(){
		let config = {
			timeId: this.props.timeId ,
			areaId: this.props.areaId,
			categoryId:this.props.parent.location.query.categoryId ? this.props.parent.location.query.categoryId : ''
		}
		$.GetAjax('/v1/category/getSaleList', config, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
            	this.istradeMap = true;
            	this.bardata = data.data;
            	this.bardatalen = data.data.length;
            	this.setState({
            		status: true
            	},()=>{
            		this.renderMap();
            		this.renderBar();
            		this.getRef();
            	});
            } else {
            	this.istradeMap = false;
            	this.setState({
            		status: false
            	});
            }
        });
	}
	renderMap(){
		//后台数据从大到小传入
		let mapData=[];
		let name;
		let value;
		let maxData;
		for (var i = 0; i < this.bardata.length; i++) {
			maxData = this.bardata[0].indexValue;
			if ( this.bardata[i] ) {
				name = this.bardata[i].shortName;
				value = this.bardata[i].indexValue;
		    	mapData.push({name:name , value:value},);
			}
		}
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
		    	inverse :true,
		        min: 0,
		        max: maxData,
		        left: 'left',
		        top: 'bottom',
		        text: ['指数：高','低'],           // 文本，默认为数值文本
		        calculable: true,
		        inRange: {
	                 color: ["#e6daff","#5b83ff"],
	            },
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
	                    show: false
	                }
	            },
				itemStyle:{
					normal:{
						borderColor:'#fff',
						borderWidth:2,
						areaColor :'#edeff5'
					},
					emphasis:{
						borderColor:'#fff',
						borderWidth:2,
						areaColor :'#5b83ff'
						// color :'rgba(75, 75, 75, 0)',
					}
				},
	            data:mapData
	            // [{name:"贵州",value:5000},
	            // 	{name:"四川",value:500},
	            // ]

		    }]
		};
		setTimeout(()=>{
			this.myChartMap.hideLoading();
			this.myChartMap.setOption(option);
			
		},600);
	}
	renderBar(){
		let yAxisData=[];
		let BarData = [];
		let name;
		let value;
		for (let i = 0; i < 10; i++) {
			if ( this.bardata[i] ) {
				name = this.bardata[i].shortName;
				value = this.bardata[i].indexValue;
				yAxisData.push(name);
				BarData.push(value);
			}else{
				name = '';
				value = '';
				yAxisData.push(name);
				BarData.push(value);
			}
		}

		let colors =  ['#a168ff','#5883ff'] ;
		let option = {
		    tooltip: {
		    	show:true,
		    	showContent:true,
		        /*trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }*/
		    },
		    grid: {
		        left: '3%',
		        height:'100%',
		        top:'0%',
		        // right: '4%',
		        bottom: '0%',
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
		        inverse :true,
		        axisLine:{
		            show:false
		        },
		        axisTick:{
		            show:false
		        },
		        axisLabel:{
		            show:true,
		            margin:30
		        },
		        splitLine:{
		            show:false
		        },
		        data:yAxisData
		    },
		    series: [   
		        {
		            name: '热度指数', 
		            type: 'bar',
		            data:BarData,
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
		                    color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
								  offset: 0, color: colors[0]
								}, {
								  offset: 1, color: colors[1]
								}], false),
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
		if ( this.istradeMap == false ) {
			return null;
		}
		let result=[];
		for(let i = 1; i < this.bardatalen || i == this.bardatalen;i++){
			result.push(i);
		}
		return (    
			<div className="tradeDetail-map">
			    <div className="map-checked">
			   		<input type="button" className="current"  value={this.props.parent.location.query.categoryName+"热度指数"} />
			   	</div>
			    <div className="Detail-map" ref="map"></div>
			    <div className="Detail-place" id="">
				{
					result.map((data,k) => {
						if(data<11){
							return  <span >{data+'.'}</span>
						}else{
							return  null;
						}
						
				        		
		        	})
				}
			    </div>
			    <div className="Detail-bar" ref="bar"></div>
			</div>
		)
	}
}

module.exports = TradeMap