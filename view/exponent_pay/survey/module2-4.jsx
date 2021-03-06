
import React from 'react';

class ContainerSurveyModule2_4 extends React.Component {
	constructor(props) {
		super(props);
		this.viewMoudle = true;
		this.btnState = "c";

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
	start() {
		this.echart = echarts.init(this.refs.chart);
		this.echart.showLoading('default',{
			text: ''
		});
	}
	_getDatas() {
		let option = {
			type: 10, // 9实物型， 10服务型
			timeId: this.props.timeId,
			areaId: this.props.areaId
		};
		$.GetAjax('/v1/zhishu/inner/industryAnalysis', option, 'Get', true, (data,state)=>{
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
                	this.showChart( this.btnState == "p" ? this.parentData : this.childData );
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
	showChart(chartData=[]){
		let xAxisData = [];
		let data = $.extend(true,[],chartData);
		let temp = [];
		chartData.map((d,k)=>{
			xAxisData.push(d.name);
			temp.push(d.value);
		});
		let getDatasArray = $.getFormatCompany(temp);
		let getData = getDatasArray.value;
		this.company = getDatasArray.company;
		getData.map((d,k)=>{
			data[k].value = d;
		});
		let ii = 0;
		let option = {
		    tooltip: {
		    	trigger: 'axis',
		    	axisPointer : {
		            type : 'shadow'
		        },
		        formatter: (data)=>{
		        	return data[0].name ? "第"+(data[0].dataIndex+1)+"位"+"  "+data[0].name+"<br/>"+(data[0].value+this.company)+"  "+"占比"+(data[0].data['scale']*100).toFixed(2)+"%" : "无数据";
		        }
		    },
		    color: ['#15a45c','#35b055','#68c448','#98d63c','#caea31','#ecf728'],
		    grid: [{
		        top: 0,
		        width: '50%',
		        height: '100%',
		        left: 0,
		        containLabel: true
		    }],
		    legend: {
            	orient:'vertical',
            	top:'15%',
            	right: 0,
            	itemGap:21,
            	itemWidth: 16,
            	itemHeight: 16,
                data: xAxisData,
                formatter: function (name) {
                	ii++;
				    return name+"\n"+(data[ii-1]['scale']*100).toFixed(2)+"%";
				}
            },
		    xAxis: [{
		        type: 'value',
		        show: false,
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
		    yAxis: [{
		        type: 'category',
		        data: xAxisData,
		        inverse :true,
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
		    }],
		    series: [{
		        type: 'bar',
		        z: 3,
		        barWidth: '50%',
		        barMinHeight: 10,
		        itemStyle: {
		            normal: {
		                label: {
		                    show: false
		                },
		                barBorderRadius:10,
		                color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [{
								  offset: 0, color: '#95cb5f'
								}, {
								  offset: 1, color: '#41b37e'
								}], false)
		            }
		        },
		        data:data
		    }, {
		        type: 'pie',
		        radius: ['30%', '70%'],
		        center: ['70%', '50%'],
	            itemStyle: {
		            normal: {
		                label: {
		                    show: false
		                }
		            }
		        },
		        data:data
		    }]
		}
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
			this.start();
			this.showChart( this.btnState == "p" ? this.parentData : this.childData );
		}
	}
	render() {
		if ( !this.viewMoudle ) {
			return false;
		}
		return (
			<div className="survey-module-list">
			   <div className="title">
			   		<p>服务型网络零售行业解析</p>

			   		<div className="nav-list">
			   			{(()=>{
			   				if ( this.parentName ) {
			   					return <span className={ this.parentData ? "" : " disabled" } onClick={this.changeNav.bind(this)} data-label="p">{this.parentName}</span>
			   				}
			   			})()}
			   			{(()=>{
			   				if ( this.childName ) {
			   					return <span className={ this.childData ? "current" : "current disabled" } onClick={this.changeNav.bind(this)} data-label="c">{this.childName}</span>
			   				}
			   			})()}
			   		</div>
			   </div>
			   <div className="echarts-box" ref="chart"></div>
			</div>
		)
	}
}

module.exports = ContainerSurveyModule2_4