
import React from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';

class RegionalController extends React.Component {
	constructor(props) {
		super(props);
		this.HTMLDOM = [];
		this.HTMLDOM2 = [];
		this.HTMLDOM3 = [];
		this.datatimeId = '';
		this.datatimeName = '数据获取中';//时间筛选栏默认显示
		this.hover = true;
		this.datatimeList = [];

		this.HTMLDOMREGION = [];
		this.HTMLDOMREGION2 = [];
		this.HTMLDOMREGION3 = [];

		this.datatimeAreaIdTiny = 0;
		this.datatimeAreaId = 0;
		this.datatimeAreaNameTiny = '全国';
		this.datatimeAreaName = '全国';//地域筛选栏默认显示
		this.areaLongName = '全国';
		this.datatimeAreaList = [];
		//判断是手机端
		if ( $.isPhone() ) {
			this.datatimeId = this.props.location.query['timeId'];
			this.datatimeAreaId = this.props.location.query['areaId'];
			this.datatimeAreaName = this.props.location.query['datatimeAreaName'];
			// console.log(this.props.location);
		}
	}
	componentDidMount() {
		if ( !$.isPhone() ) {
			this.getData();
			this.chart = echarts.init(document.getElementById('maps'));
			this.chart.showLoading('default',{
				text: ''
			});
			this.setMaps();

		}else{
			$(".tradeDetail-nav").css('display', 'none');
			let config = {
				title:'映潮科技',//分享标题
				desc: '猛戳打开查看行业的数据',//分享内容
				link: location.href,//分享地址
				imgUrl: './images/logo-white.png'//分享图片
			};
			$.wechartShare(config);
		}
	}
	//获取时间
	getData(){
		$.GetAjax('/v1/system/datatimeList', null, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
                this.datatimeList = data.data;
                this.datatimeName = data.timeName;
                this.datatimeId = data.timeId;
                this.setState({
					status: true
				},()=>{
					this.getRegionData(this.datatimeId);
					PubSub.publish('getNavYearId',data.data.timeId || 0);
				});
             } else {
                this.datatimeList = [];
             }
        });
	}
	
	//鼠标离开时间筛选
	closeHoverDatatime(e){
		ReactDOM.findDOMNode(this.refs.largeModule).style.display = 'none';
	}
	//鼠标进入时间筛选第一层
	hoverList1(e) {
		this.HTMLDOM = [];
		this.HTMLDOM2 = [];
		this.HTMLDOM3 = [];
		ReactDOM.findDOMNode(this.refs.largeModule).style.display = 'block';

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
				width: '213px'
			});
		});
	}
	//鼠标进入时间筛选第二层
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
			check_2_HTML.push(<p onMouseEnter={this.hoverList3.bind(this,config)} className="two_hover"><span>{data[i].simplealiasname}</span><i className="iconfont icon-right" data-stop='true'></i></p>);
		}
		this.HTMLDOM2.push(<div className='check-2'>{ check_2_HTML }</div>);
		this.setState({
			hover: true
		},()=>{
			$(".one_hover").removeClass('current');
			$('.one_hover').eq(key).addClass('current');
			$(".two_hover").removeClass('current');
			$('.nav-list-datatime').css({
				width: '329px'
			});
		})
	}
	//鼠标进入时间筛选第三层
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
				width: '741px'
			});
		})
	}
	//鼠标进入时间筛选第四层
	hoverList4(key,e){
		this.setState({
			hover: true
		},()=>{
			$(".three_hover").removeClass('current');
			$('.three_hover').eq(key).addClass('current');
		});
	}
	chooseDataTime(id,name,e){
		this.datatimeId = id;
		this.closeHoverDatatime();
		this.datatimeName = name;
		this.setState({
			hover: true
		},()=>{
			this.getRegionData(this.datatimeId);
		});
	}
	//请求有数据的地域
	getRegionData(id){
		let config = {
			timeId: id,
			categoryId:this.props.parent.location.query.categoryId ? this.props.parent.location.query.categoryId : ''
		};
		$.GetAjax('/v1/system/datatimeAreaList', config, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
                this.datatimeAreaList = data.data;
             } else {
                this.datatimeAreaList = [];
             }
        });
	}
	regionHover(e){

		ReactDOM.findDOMNode(this.refs.regionModule).style.display = 'block';

		this.HTMLDOMREGION = [];
		this.HTMLDOMREGION2 = [];
		this.HTMLDOMREGION3 = [];

		let quanguo = this.datatimeAreaList[0] || [];
		let data = this.datatimeAreaList[0] && this.datatimeAreaList[0].children || [];
		let childHtml = [];

		childHtml.push(<li onClick={this.provinceClickChild.bind(this,'全国',quanguo.id,'全国',[])} className={quanguo.isHas ? "current" : "current disable"}>全国</li>);

        data.map((data,k) => {
	        childHtml.push(<li onClick={this.provinceClickChild.bind(this,k,data.id,data.name,data)} className={data.isHas ? "" : "disable"}>{data.abbr}</li>);
        });
        
		this.HTMLDOMREGION.push(
			<div className="region province">
				<p onClick={this.provinceClick.bind(this,"provinceul")}><span id="provinceP">全国</span><i className="iconfont icon-down"></i></p>
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
	provinceClickChild(type,areaid,name,child,e){
		if(name!=""&&name!=null){
			this.areaLongName = name;
		}

		let hasClassDis = $(e.target).hasClass('disable');
		if ( hasClassDis ) {
			return false;
		}
		this.HTMLDOMREGION2 = [];
		this.HTMLDOMREGION3 = [];
		$('#provinceul').data('open',false);
		$('#provinceul').hide();
		$('#provinceP').html(e.target.innerHTML);
		this.datatimeAreaNameTiny = e.target.innerHTML;

		$('#provinceul li').removeClass('current');
		$(e.target).addClass('current');
		let childData = [];
		if ( type == "全国" ) {
			this.datatimeAreaIdTiny = 0;
			childData = [];
		}else{
			this.datatimeAreaIdTiny = areaid;
			childData = child.children;
		}

		if ( childData.length > 0 ) {

			let childHtml = [];

			childHtml.push(<li onClick={this.cityClickChild.bind(this,'全省',areaid,[],[])} className="current">全省</li>);

	        childData.map((data,k) => {
		        childHtml.push(<li onClick={this.cityClickChild.bind(this,k,data.id,data.name,data)} className={data.isHas ? "" : "disable"}>{data.abbr}</li>);
	        });
	        
			this.HTMLDOMREGION2.push(
				<div className="region city">
					<p onClick={this.provinceClick.bind(this,"cityul")}><span id="cityP">全省</span><i className="iconfont icon-down"></i></p>
					<ul id="cityul" data-open="false"> { childHtml } </ul>
				</div>
			);
		}

		this.setState({
			hover: true
		});
	}
	cityClickChild(type,areaid,name,child,e){
		if(name!=""&&name!=null){
			this.areaLongName = name;
		}
		
		let hasClassDis = $(e.target).hasClass('disable');
		if ( hasClassDis ) {
			return false;
		}
		this.HTMLDOMREGION3 = [];
		$('#cityul').data('open',false);
		$('#cityul').hide();
		$('#cityP').html(e.target.innerHTML);

		$('#cityul li').removeClass('current');
		$(e.target).addClass('current');

		this.datatimeAreaNameTiny = e.target.innerHTML;
		this.datatimeAreaIdTiny = areaid;
		let childData = [];

		if ( type == "全省" ) {
			childData = [];
		}else{
			childData = child.children;
		}

		if ( childData.length > 0 ) {

			let childHtml = [];

			childHtml.push(<li onClick={this.areaClickChild.bind(this,areaid,[])} className="current">全市</li>);

	        childData.map((data,k) => {
		        childHtml.push(<li onClick={this.areaClickChild.bind(this,data.id,data.name)} className={data.isHas ? "" : "disable"}>{data.abbr}</li>);
	        });
	        
			this.HTMLDOMREGION2.push(
				<div className="region area">
					<p onClick={this.provinceClick.bind(this,"areaul")}><span id="areaP">全市</span><i className="iconfont icon-down"></i></p>
					<ul id="areaul" data-open="false"> { childHtml } </ul>
				</div>
			);
		}

		this.setState({
			hover: true
		});
	}
	areaClickChild(areaid,name,e){
		if(name!=""&&name!=null){
			this.areaLongName = name;
		}
		let hasClassDis = $(e.target).hasClass('disable');
		if ( hasClassDis ) {
			return false;
		}
		$('#areaul').data('open',false);
		$('#areaul').hide();
		$('#areaP').html(e.target.innerHTML);

		$('#areaul li').removeClass('current');
		$(e.target).addClass('current');

		this.datatimeAreaIdTiny = areaid;
		this.datatimeAreaNameTiny = e.target.innerHTML;
	}
	sublimeRegion(e){
		this.datatimeAreaId = this.datatimeAreaIdTiny;
		this.datatimeAreaName = this.datatimeAreaNameTiny;
		this.closeHoverRegion();
		this.setState({
			hover: true
		},()=>{
			this.setMaps();
		});
	}
	//关闭地域选择下拉
	closeHoverRegion(e){
		ReactDOM.findDOMNode(this.refs.regionModule).style.display = 'none';
	}
	selectData(e){
		this.props.callback(this.datatimeId,this.datatimeAreaId,this.datatimeAreaName,this.areaLongName);
	}
	//加载地图轮廓
	setMaps(){
		let mapName = this.areaLongName;

		if ( this.datatimeAreaName == "全国" ) {
			mapName = "中国";
		};
		$.get('./map/'+mapName+'.json', myJson => {
		    echarts.registerMap(mapName, myJson);
		    this.chart.setOption({
		        series: [{
		            type: 'map',
		            map: mapName,
		            silent: true,
		            itemStyle:{
						normal:{
							borderColor:'#49befc',
							color: '#49befc',
							areaColor :'#49befc'
						},
						emphasis:{
							borderColor:'#49befc',
							color: '#49befc',
							areaColor :'#49befc'
						}
					},
		        }]
		    });
		    this.chart.hideLoading();
		});
	}
	//分享功能
	geterCode() {
		let configer = {
			timeId: this.datatimeId,
			areaId: this.datatimeAreaId,
			datatimeAreaName:this.areaLongName || this.datatimeAreaName,
		};
		//location.href地址上已有行业Id和行业名称
		let params = encodeURIComponent(location.href +"&"+$.param(configer));
		let result = $.httpxhr + "/v1/system/qrCode?url=" + params;
		return result;
	}
	render() {
		return (
			<div className="tradeDetail-nav">

			    <div className="select-module" onMouseLeave={this.closeHoverDatatime.bind(this)}>
			   		<span className="titles" onMouseEnter={this.hoverList1.bind(this)}>{ this.datatimeName }</span>
			   		<i className="iconfont icon-down"></i>
			   		<div className="nav-list-datatime" ref="largeModule">
	   					{ this.HTMLDOM }{ this.HTMLDOM2 }{ this.HTMLDOM3 }
			   		</div>
			   	</div>

			    <div className="select-module" onMouseLeave={this.closeHoverRegion.bind(this)}>
			   		<span className="titles" onMouseEnter={this.regionHover.bind(this)}>{ this.datatimeAreaName ? this.datatimeAreaName : "全国" }</span>
			   		<i className="iconfont icon-down"></i>
			   		<div className="nav-list-region" ref="regionModule">
			   			{ this.HTMLDOMREGION }{ this.HTMLDOMREGION2 }{ this.HTMLDOMREGION3 }
	   					<input type="button" value="确定" className="areaButton" onClick={this.sublimeRegion.bind(this)}/>
			   		</div>
			   	</div>
			   <div className="map-module" id="maps"></div>
			   <div className="category-module" id="">{this.props.parent.location.query.categoryName ? this.props.parent.location.query.categoryName : ''}</div>
			   <div className="button-module"><input type="button" value="查询数据" onClick={this.selectData.bind(this)}/></div>
			   <div className="share-module">
			  		<i className="iconfont icon-share"></i>
			  		<img src={ this.geterCode() }/>
			   </div>
			</div>
		)
	}
}

module.exports = RegionalController