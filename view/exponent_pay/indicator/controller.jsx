
import React from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';

class IndicController extends React.Component {
	constructor(props) {
		super(props);
		//地域
		this.HTMLDOMREGION1 = [];
		this.HTMLDOMREGION2 = [];
		this.HTMLDOMREGION3 = [];
		//指标
		this.HTMLDOMINDIC1 = [];
		//行业
		this.HTMLDOMTRADE1 = [];
		this.HTMLDOMTRADE2 = [];
		this.HTMLDOMTRADE3 = [];
		//时间
		this.HTMLDOMTIME1 = [];
		this.HTMLDOMTIME2 = [];
		this.HTMLDOMTIME3 = [];
		
		this.datatimeId = null;
		this.dataAreaId = null;
		this.dataIndicId = null;
		this.areaName = '-请选择-';
		this.datatimeName = '-请选择-';
		this.indicName = '-请选择-';//指标筛选栏默认显示
		
		this.tradeId = null;
		this.tradeName = '-请选择-';//行业筛选栏默认显示
		this.tradeList = [];//存放行业列表数据
		this.datatimeList = [];
		
		this.timeId = null;
		this.timeName = '-请选择-';//时间筛选栏默认显示
		this.timeIdTiny = 0;
		this.timeNameTiny = '';
		this.timeList = [];

		this.dataIndicList = [];//存放指标列表数据
		
		this.tradeIdTiny = 0;
		this.tradeNameTiny = '';

		this.datatimeAreaIdTiny = 0;
		this.datatimeAreaNameTiny = '全国';
		this.datatimeAreaList = [];//存放地域列表数据

	}
	componentDidMount() {
		this.getRegionData();
		this.getIndicData();
		this.getTradeData();
		this.getTimeData();
	}
	//获取时间
	getTimeData(){
		$.GetAjax('/v1/system/datatimeList', null, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
                this.timeList = data.data;
             } else {
                this.timeList = [];
             }
        });
	}
	//关闭时间选择下拉
	closeHoverTime() {
		ReactDOM.findDOMNode(this.refs.timeModule).style.display = 'none';
	}
	//请求用户开通的地域
	getRegionData(){
		$.GetAjax('/v1/zhishu/inner/getUserOpenAreaList', null, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
                this.datatimeAreaList = data.data;
             } else {
                this.datatimeAreaList = [];
             }
        });
	}
	//请求指标列表
	getIndicData(){
		$.GetAjax('/v1/zhishu/indexList', null, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
                this.dataIndicList = data.data;
             } else {
                this.dataIndicList = [];
             }
        });
	}
	//请求行业列表
	getTradeData(){
		$.GetAjax('/v1/category/treeCategoryList', null, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
                this.tradeList = data.data;
             } else {
                this.tradeList = [];
             }
        });
	}
	//关闭地域选择下拉
	closeHoverRegion(e){
		ReactDOM.findDOMNode(this.refs.regionModule).style.display = 'none';
	}
	//关闭指标选中下拉
	closeHoverIndic(){
		ReactDOM.findDOMNode(this.refs.indicModule).style.display = 'none';
	}
	//关闭行业指标下拉
	closeHoverTrade(){
		ReactDOM.findDOMNode(this.refs.tradeModule).style.display = 'none';
	}
	//关闭时间筛选下拉
	closeHoverTime(){
		ReactDOM.findDOMNode(this.refs.timeModule).style.display = 'none';
	}
	//鼠标进入地域选择
	regionHover(e){
		ReactDOM.findDOMNode(this.refs.regionModule).style.display = 'block';

		this.HTMLDOMREGION1 = [];

        this.datatimeAreaList.map((data,k) => {
	        this.HTMLDOMREGION1.push(<li onClick={this.chooseArea.bind(this,data.id)} className="" data-region={data.name}>{data.name}</li>);
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
			this.closeHoverRegion();
		});
	}
	//鼠标进入指标选择
	IndicHover(e){
		ReactDOM.findDOMNode(this.refs.indicModule).style.display = 'block';

		this.HTMLDOMINDIC1 = [];
		
		this.dataIndicList.map((data,k) => {
	        this.HTMLDOMINDIC1.push(<li onClick={this.chooseIndic.bind(this,data.id)} className="" data-region={data.name}>{data.name}</li>);
        });

        this.setState({
			hover: true
		});

	}
	chooseIndic(id,e){
		let hasClassDis = $(e.target).hasClass('disable');
		if ( hasClassDis ) {
			return false;
		}
		$(e.target).parent().find('li').removeClass('current');
		$(e.target).addClass('current');
		this.indicName = $(e.target).data('region');
		this.dataIndicId = id;
		this.setState({
			status: true
		},()=>{
			this.closeHoverIndic();
		});
	}
	//鼠标进入行业筛选
	hoverTrade(e) {
		this.HTMLDOMTRADE1 = [];
		this.HTMLDOMTRADE2 = [];
		this.HTMLDOMTRADE3 = [];
		ReactDOM.findDOMNode(this.refs.tradeModule).style.display = 'block';

		let quanguo = this.tradeList || [];
		let data = this.tradeList || [];
		let childHtml = [];
        data.map((data,k) => {
	        childHtml.push(<li onClick={this.provinceClickChild.bind(this,k,data.id,data)} className="">{data.abbr}</li>);
        });
        
		this.HTMLDOMTRADE1.push(
			<div className="region province">
				<p onClick={this.provinceClick.bind(this,"provinceul")}><span id="provinceP">{quanguo[0].abbr}</span><i className="iconfont icon-down"></i></p>
				<ul id="provinceul" data-open="false"> { childHtml } </ul>
			</div>
		);

        this.setState({
			hover: true
		});
	}
	provinceClick(domId,e){
		if ( $('#'+domId).data('open') == false ) {
			$('#'+domId).data('open',true);
			$('#'+domId).show();
		}else{
			$('#'+domId).data('open',false);
			$('#'+domId).hide();
		}
	}
	provinceClickChild(type,id,child,e){
		$('#provinceul').data('open',false);
		$('#provinceul').hide();
		$('#provinceP').html(e.target.innerHTML);
		this.datatimeAreaNameTiny = e.target.innerHTML;

		$('#provinceul li').removeClass('current');
		$(e.target).addClass('current');
		let childData = [];

		this.tradeIdTiny = id;
		childData = child.chilren;

		if ( childData.length > 0 ) {

			let childHtml = [];

	        childData.map((data,k) => {
		        childHtml.push(<li onClick={this.cityClickChild.bind(this,k,data.id,data)} className="">{data.abbr}</li>);
	        });
	        
			this.HTMLDOMTRADE2.push(
				<div className="region city">
					<p onClick={this.provinceClick.bind(this,"cityul")}><span id="cityP">{childData[0].abbr}</span><i className="iconfont icon-down"></i></p>
					<ul id="cityul" data-open="false"> { childHtml } </ul>
				</div>
			);
		}

		this.setState({
			hover: true
		});
	}
	cityClickChild(type,id,child,e){
		let hasClassDis = $(e.target).hasClass('disable');
		if ( hasClassDis ) {
			return false;
		}
		$('#cityul').data('open',false);
		$('#cityul').hide();
		$('#cityP').html(e.target.innerHTML);

		$('#cityul li').removeClass('current');
		$(e.target).addClass('current');

		this.tradeIdTiny = id;
		this.tradeNameTiny = e.target.innerHTML;

		let childData = [];
		childData = child.chilren;
		if ( childData.length > 0 ) {

			let childHtml = [];

	        childData.map((data,k) => {
		        childHtml.push(<li onClick={this.areaClickChild.bind(this,data.id)} className="">{data.abbr}</li>);
	        });
	        
			this.HTMLDOMTRADE3.push(
				<div className="region area">
					<p onClick={this.provinceClick.bind(this,"areaul")}><span id="areaP">{childData[0].abbr}</span><i className="iconfont icon-down"></i></p>
					<ul id="areaul" data-open="false"> { childHtml } </ul>
				</div>
			);
		}

		this.setState({
			hover: true
		});
	}
	areaClickChild(id,e){
		let hasClassDis = $(e.target).hasClass('disable');
		if ( hasClassDis ) {
			return false;
		}
		$('#areaul').data('open',false);
		$('#areaul').hide();
		$('#areaP').html(e.target.innerHTML);

		$('#areaul li').removeClass('current');
		$(e.target).addClass('current');

		this.tradeIdTiny = id;
		this.tradeNameTiny = e.target.innerHTML;
	}
	
	//鼠标进入时间筛选
	hoverTime(e) {
		this.HTMLDOMTIME1 = [];
		this.HTMLDOMTIME2 = [];
		this.HTMLDOMTIME3 = [];
		ReactDOM.findDOMNode(this.refs.timeModule).style.display = 'block';

		// let year = this.timeList || [];
		let data = this.timeList || [];
		let childHtml = [];
        data.map((data,k) => {
	        childHtml.push(<li onClick={this.yearClickChild.bind(this,k,data.id,data)} className="">{data.aliasname}</li>);
        });
        
		this.HTMLDOMTIME1.push(
			<div className="region year">
				<p onClick={this.yearClick.bind(this,"yearul")}><span id="yearP">{data[0].aliasname}</span><i className="iconfont icon-down"></i></p>
				<ul id="yearul" data-open="false"> { childHtml } </ul>
			</div>
		);

        this.setState({
			hover: true
		});
	}
	yearClick(domId,e){
		if ( $('#'+domId).data('open') == false ) {
			$('#'+domId).data('open',true);
			$('#'+domId).show();
		}else{
			$('#'+domId).data('open',false);
			$('#'+domId).hide();
		}
	}
	yearClickChild(type,id,child,e){
		$('#yearul').data('open',false);
		$('#yearul').hide();
		$('#yearP').html(e.target.innerHTML);
		this.datatimeAreaNameTiny = e.target.innerHTML;

		$('#yearul li').removeClass('current');
		$(e.target).addClass('current');
		let childData = [];

		this.timeIdTiny = id;
		childData = child.children;
		if ( childData.length > 0 ) {

			let childHtml = [];

	        childData.map((data,k) => {
		        childHtml.push(<li onClick={this.monthClickChild.bind(this,k,data.id,data)} className="">{data.simplealiasname}</li>);
	        });
	        
			this.HTMLDOMTIME2.push(
				<div className="region month">
					<p onClick={this.yearClick.bind(this,"monthul")}><span id="monthP">{childData[0].simplealiasname}</span><i className="iconfont icon-down"></i></p>
					<ul id="monthul" data-open="false"> { childHtml } </ul>
				</div>
			);
		}

		this.setState({
			hover: true
		});
	}
	monthClickChild(type,id,child,e){
		let hasClassDis = $(e.target).hasClass('disable');
		if ( hasClassDis ) {
			return false;
		}
		$('#monthul').data('open',false);
		$('#monthul').hide();
		$('#monthP').html(e.target.innerHTML);

		$('#monthul li').removeClass('current');
		$(e.target).addClass('current');

		this.timeIdTiny = id;
		this.timeNameTiny = e.target.innerHTML;

		let childData = [];
		childData = child.children;
		if ( childData.length > 0 ) {

			let childHtml = [];

	        childData.map((data,k) => {
		        childHtml.push(<li onClick={this.lastClickChild.bind(this,data.id)} className="">{data.aliasname}</li>);
	        });
	        
			this.HTMLDOMTIME3.push(
				<div className="region timelast">
					<p onClick={this.yearClick.bind(this,"timelastul")}><span id="timelastP">{childData[0].aliasname}</span><i className="iconfont icon-down"></i></p>
					<ul id="timelastul" data-open="false"> { childHtml } </ul>
				</div>
			);
		}

		this.setState({
			hover: true
		});
	}
	lastClickChild(id,e){
		let hasClassDis = $(e.target).hasClass('disable');
		if ( hasClassDis ) {
			return false;
		}
		$('#timelastul').data('open',false);
		$('#timelastul').hide();
		$('#timelastP').html(e.target.innerHTML);

		$('#timelastul li').removeClass('current');
		$(e.target).addClass('current');

		this.timeIdTiny = id;
		this.timeNameTiny = e.target.innerHTML;
	}
	//时间筛选确定按钮
	sublimeTime(e){
		this.timeId = this.timeIdTiny;
		this.timeName = this.timeNameTiny;
		this.closeHoverTime();
		this.setState({
			hover: true
		});
	}
	//行业筛选确定按钮
	sublimeTrade(e){
		this.tradeId = this.tradeIdTiny;
		this.tradeName = this.tradeNameTiny;
		this.closeHoverTrade();
		this.setState({
			hover: true
		});
	}
	//确定选择地域
	sublimeRegion(){
		this.datatimeAreaId = this.datatimeAreaIdTiny;
		this.datatimeAreaName = this.datatimeAreaNameTiny;
		this.closeHoverRegion();
		this.setState({
			hover: true
		});
	}
	//确定选择指标
	sublimeIndic(){

	}
	selectData(){
		this.props.callback(this.timeId,this.dataAreaId,this.tradeId,this.dataIndicId);
	}
	render() {
		return (
			<div className="Indicator-nav pay-section-nav">
				<div className="select-module nav-small-area" onMouseLeave={this.closeHoverRegion.bind(this)}>
			   		<span className="titles" onMouseEnter={this.regionHover.bind(this)}>{ this.areaName }</span>
			   		<i className="iconfont icon-down"></i>
			   		<div className="nav-list-region-checked" ref="regionModule">
	   					{ this.HTMLDOMREGION1 }
			   		</div>
			   	</div>

				<div className="select-module" onMouseLeave={this.closeHoverIndic.bind(this)}>
			   		<span className="titles" onMouseEnter={this.IndicHover.bind(this)}>{ this.indicName }</span>
			   		<i className="iconfont icon-down"></i>
			   		<div className="nav-list-indic" ref="indicModule">
	   					{ this.HTMLDOMINDIC1 }
			   		</div>
			   	</div>

			   	<div className="select-module" onMouseLeave={this.closeHoverTrade.bind(this)}>
			   		<span className="titles" onMouseEnter={this.hoverTrade.bind(this)}>{ this.tradeName }</span>
			   		<i className="iconfont icon-down"></i>
			   		<div className="nav-list-region" ref="tradeModule">
	   					{ this.HTMLDOMTRADE1 }{ this.HTMLDOMTRADE2 }{ this.HTMLDOMTRADE3 }
	   					<input type="button" value="确定" className="areaButton" onClick={this.sublimeTrade.bind(this)}/>
			   		</div>
			   	</div>
				
				<div className="select-module" onMouseLeave={this.closeHoverTime.bind(this)}>
			   		<span className="titles" onMouseEnter={this.hoverTime.bind(this)}>{ this.timeName ? this.timeName : "" }</span>
			   		<i className="iconfont icon-down"></i>
			   		<div className="nav-list-region" ref="timeModule">
	   					{ this.HTMLDOMTIME1 }{ this.HTMLDOMTIME2 }{ this.HTMLDOMTIME3 }
	   					<input type="button" value="确定" className="areaButton" onClick={this.sublimeTime.bind(this)}/>
			   		</div>
			   	</div>

			   	<div className="button-module"><input type="button" value="查询" onClick={this.selectData.bind(this)}/></div>
			</div>
		)
	}
}

module.exports = IndicController