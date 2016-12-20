
import React from 'react';

class SurveyController extends React.Component {
	constructor(props) {
		super(props);
		this.HTMLDOM = [];
		this.HTMLDOM2 = [];
		this.HTMLDOM3 = [];

		this.REGIONHTML = [];

		this.datatimeId = null;
		this.dataAreaId = null;
		this.areaName = '-请选择-';
		this.timeName = '-请选择-';
		this.datatimeList = [];
		this.dataAreaList = [];
	}
	componentDidMount() {
		this.getRegionData();
		this.getTimeData();
	}
	getRegionData(id){

		$.GetAjax('/v1/zhishu/inner/getUserOpenAreaList', null, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
                this.dataAreaList = data.data;
             } else {
                this.dataAreaList = [];
             }
        });
	}
	getTimeData(){
		$.GetAjax('/v1/system/datatimeList', null, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
                this.datatimeList = data.data;
             } else {
                this.datatimeList = [];
             }
        });
	}
	showAreaList(e){

		this.refs.regionModule.style.display = 'block';
		this.REGIONHTML = [];

        this.dataAreaList.map((data,k) => {
	        this.REGIONHTML.push(<li onClick={this.chooseArea.bind(this,data.id)} className="" data-region={data.name}>{data.name}</li>);
        });

        this.setState({
			hover: true
		});
	}
	chooseArea(id,e){
		let hasClassDis = $(e.target).hasClass('disable');
		if ( hasClassDis ) {
			return false;
		}
		$(e.target).parent().find('li').removeClass('current');
		$(e.target).addClass('current');
		this.areaName = $(e.target).data('region');
		this.dataAreaId = id;
		this.setState({
			status: true
		},()=>{
			this.closehoverarea();
		});
	}
	showChart() {
		if ( this.dataAreaId == null ) {
			layer.open({
				title: '映潮指数',
				content: '<div>请选择地域</div>',
				scrollbar: false
			});
			return false;
		}
		if ( this.datatimeId == null ) {
			layer.open({
				title: '映潮指数',
				content: '<div>请选择时间</div>',
				scrollbar: false
			});
			return false;
		}
		this.props.callback(this.dataAreaId,this.datatimeId);
	}
	closehoverarea(e){
		this.refs.regionModule.style.display = 'none';
	}
	closehovertime(e){
		this.refs.timeModule.style.display = 'none';
	}
	hoverList1(e) {
		this.HTMLDOM = [];
		this.HTMLDOM2 = [];
		this.HTMLDOM3 = [];
		this.refs.timeModule.style.display = 'block';

		let check_1_HTML = [];
		for ( let i in this.datatimeList ) {
			check_1_HTML.push(<p onMouseEnter={this.hoverList2.bind(this,i)} className="one_hover"><span>{this.datatimeList[i].aliasname}</span><i className="iconfont icon-right"></i></p>);
		}
		this.HTMLDOM.push(<div className='check-1'>{ check_1_HTML }</div>);

		this.setState({
			hover: true
		},()=>{
			$(".one_hover").removeClass('current');
			$('.nav-list-datatime').css({
				width: '215px'
			});
		})
		
	}

	hoverList2(key,e){
		this.HTMLDOM2 = [];
		this.HTMLDOM3 = [];
		let check_2_HTML = [];
		let data = this.datatimeList[key].children;

		for ( let i in data ) {
			let config = {
				parent: key,
				key: i
			}
			check_2_HTML.push(<p onMouseEnter={this.hoverList3.bind(this,config)} className="two_hover"><span>{data[i].simplealiasname}</span><i className="iconfont icon-right"></i></p>);
		}
		this.HTMLDOM2.push(<div className='check-2'>{ check_2_HTML }</div>);

		this.setState({
			hover: true
		},()=>{
			$(".one_hover").removeClass('current');
			$('.one_hover').eq(key).addClass('current');
			$(".two_hover").removeClass('current');
			$('.nav-list-datatime').css({
				width: '315px'
			});
		})
		
	}
	hoverList3(config,e){
		this.HTMLDOM3 = [];
		let check_3_HTML = [];
		let data = this.datatimeList[config.parent].children[config.key].children;
		for ( let i in data ) {
			check_3_HTML.push(<span onMouseEnter={this.hoverList4.bind(this,i)} onClick={this.chooseDataTime.bind(this,data[i].id,data[i].aliasname)} className="three_hover">{data[i].aliasname}</span>);
		}
		this.HTMLDOM3.push(<div className='check-3'>{ check_3_HTML }</div>);

		this.setState({
			hover: true
		},()=>{
			$(".two_hover").removeClass('current');
			$('.two_hover').eq(config.key).addClass('current');
			$(".three_hover").removeClass('current');
			$('.nav-list-datatime').css({
				width: '715px'
			});
		})

		
	}
	hoverList4(key,e){
		this.setState({
			hover: true
		},()=>{
			$(".three_hover").removeClass('current');
			$('.three_hover').eq(key).addClass('current');
		})
		
	}
	chooseDataTime(id,name,e){
		this.datatimeId = id;
		this.closehovertime();
		this.timeName = name;
		this.setState({
			hover: true
		});
	}
	render() {
		return (
			<div className="pay-section-nav">
			    <div className="select-module nav-small-area" onMouseLeave={this.closehoverarea.bind(this)}>
			   		<span className="titles" onMouseEnter={this.showAreaList.bind(this)}>{ this.areaName }</span>
			   		<i className="iconfont icon-down"></i>
			   		<ul className="nav-list-region-checked" ref="regionModule">
			   			{ this.REGIONHTML }
			   		</ul>
			   	</div>

			   	<div className="select-module nav-large-time" onMouseLeave={this.closehovertime.bind(this)}>
		   			<span className="titles" onMouseEnter={this.hoverList1.bind(this)}>{ this.timeName }</span>
			   		<i className="iconfont icon-down"></i>
			   		<div className="nav-list-datatime" ref="timeModule">
	   					{ this.HTMLDOM }{ this.HTMLDOM2 }{ this.HTMLDOM3 }
			   		</div>
			   	</div>
			   	<div className="button-module"><input type="button" value="查询" onClick={this.showChart.bind(this)}/></div>
			</div>
		)
	}
}

module.exports = SurveyController