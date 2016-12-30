
import React from 'react';
import PubSub from 'pubsub-js';
import ReactDOM from 'react-dom';

class TradeMap extends React.Component {
	constructor(props) {
		super(props);
		this.istradeMap = true;
		this.bardatalen = 0;
		this.categoryName = this.props.parent.location.query.categoryName ? this.props.parent.location.query.categoryName : ''; 
		// this.datatimeAreaName = '全国';
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
            		let navconfig = {
            			timeName: this.bardata.timeName || "数据获取中",
            			timeId: this.bardata.timeId || ""
            		}
            		//发布
            		PubSub.publish('getNavYear',navconfig);
            		PubSub.publish('getNavYearId',this.bardata.timeId || "");
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
		let name =[];//初始名称
		let value = [];//初始值

		let resultArr = [];//转换后数组；
		let resultValue = [] ;
		let maxData;
		let unit = '';
		for (let i = 0; i < this.bardata.length; i++) {
			if ( this.bardata[i] ) {
				let areaLen = this.props.areaId.toString().length;//获取当前选中的是国、省、市级别

				let shortName;
				if(areaLen == 1){//全国
					shortName = this.bardata[i].shortName;
				}else if(areaLen == 2){//省
					shortName = this.bardata[i].areaName;
				}else{//市
					shortName = this.bardata[i].areaName;
				}
				let indexValue = this.bardata[i].indexValue;
				name.push(shortName);
				value.push(indexValue);
			}
		}
		let resultData = $.getFormatCompany(value);
		unit = resultData.company ? resultData.company : '';
		resultValue = resultData.value;
		
		maxData = resultData.value[0];
		for(let i = 0;i < name.length; i++){
			// let mapvalue= resultData.value[i] ? resultData.value[i] : '';
			resultArr.push({name:name[i], value:resultValue[i]},)
			
		}
		let mapName = this.props.areaLongName || this.props.datatimeAreaName;
		if ( mapName == "全国" ) {
			mapName = "中国";
		};
		let series = [];
		$.get('../map/'+mapName+'.json', myJson => {
			echarts.registerMap(mapName, myJson);
			
			let option = {
			    tooltip: {
			        trigger: 'item',
			        formatter: (resultValue)=>{
			        	return resultValue.data.name ? this.categoryName + "交易额<br/>"+resultValue.data.name+"  "+ (( resultValue.data.value? resultValue.data.value+ unit:"无数据") ) : "无数据";
			        }
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
			     	name: this.categoryName+'交易额',
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
		            data:resultArr
		            // [{name:"贵州",value:5000},
		            // 	{name:"四川",value:500},
		            // ]

			    }]
			};
			setTimeout(()=>{
				this.myChartMap.hideLoading();
				this.myChartMap.setOption(option);
			},600);
		});

		
		
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
			}
			else{
				name = '';
				value = '';
				yAxisData.push(name);
				BarData.push(value);
			}
		}
		let BarDatasum = $.getFormatCompany( BarData,true);
		let company = BarDatasum.company;

		let colors =  ['#a168ff','#5883ff'] ;
		let option = {
		    tooltip: {
		    	show:true,
		    	showContent:true,
				formatter: (BarData)=>{
		        	return BarData.name ? BarData.name+"  "+ (BarData.value + company) : "无数据";
		        }
		    },
		    grid: {
		        left: '3%',
		        height:'100%',
		        top:'0%',
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
		            data:BarDatasum.value,
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
			   		<input type="button" className="current"  value={this.props.parent.location.query.categoryName+"交易额"} />
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