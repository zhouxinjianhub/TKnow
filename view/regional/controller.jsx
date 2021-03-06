
import React from 'react';
import PubSub from 'pubsub-js';

class RegionalController extends React.Component {
	constructor(props) {
		super(props);

		this.HTMLDOM = [];
		this.HTMLDOM2 = [];
		this.HTMLDOM3 = [];
		this.datatimeId = '';
		this.datatimeName = '数据获取中';
		this.hover = true;
		this.datatimeList = [];

		this.HTMLDOMREGION = [];
		this.HTMLDOMREGION2 = [];
		this.HTMLDOMREGION3 = [];

		this.datatimeAreaIdTiny = 0;
		this.datatimeAreaId = 0;
		this.datatimeAreaNameTiny = '全国';
		this.datatimeAreaName = '全国';

		this.AreaNameTiny = '全国';
		this.AreaName = '全国';

		this.longAreaTime = '全国';
		this.datatimeAreaList = [];
		if ( $.isPhone() ) {
			this.datatimeId = this.props.location.query['timeId'];
			this.datatimeAreaId = this.props.location.query['areaId'];
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
			let config = {
				title: '映潮科技',
				desc: '猛戳打开查看地域的数据',
				link: location.href,
				imgUrl: './images/logo-white.png'
			};
			$.wechartShare(config);
		}
	}
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
	hoverList1(e) {
		this.HTMLDOM = [];
		this.HTMLDOM2 = [];
		this.HTMLDOM3 = [];
		this.refs.largeModule.style.display = 'block';

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
	closeHoverDatatime(e){
		this.refs.largeModule.style.display = 'none';
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
	getRegionData(id){
		let config = {
			timeId: id
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

		this.refs.regionModule.style.display = 'block';

		this.HTMLDOMREGION = [];
		this.HTMLDOMREGION2 = [];
		this.HTMLDOMREGION3 = [];

		let quanguo = this.datatimeAreaList[0] || [];
		let data = this.datatimeAreaList[0] && this.datatimeAreaList[0].children || [];
		let childHtml = [];

		childHtml.push(<li onClick={this.provinceClickChild.bind(this,'全国',quanguo.id,[])} className={quanguo.isHas ? "current" : "current disable"}>全国</li>);

        data.map((data,k) => {

	        childHtml.push(<li onClick={this.provinceClickChild.bind(this,k,data.id,data)} className={data.isHas ? "" : "disable"} data-region={data.name}>{data.abbr}</li>);
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
	provinceClickChild(type,areaid,child,e){
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
		this.AreaNameTiny = $(e.target).data('region');
		
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

			childHtml.push(<li onClick={this.cityClickChild.bind(this,'全省',areaid,[])} className="current">全省</li>);

	        childData.map((data,k) => {
		        childHtml.push(<li onClick={this.cityClickChild.bind(this,k,data.id,data)} className={data.isHas ? "" : "disable"} data-region={data.name}>{data.abbr}</li>);
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
	cityClickChild(type,areaid,child,e){
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
		this.AreaNameTiny = $(e.target).data('region');

		this.datatimeAreaIdTiny = areaid;
		let childData = [];

		if ( type == "全省" ) {
			childData = [];
		}else{
			childData = child.children;
		}

		if ( childData.length > 0 ) {

			let childHtml = [];

			childHtml.push(<li onClick={this.areaClickChild.bind(this,areaid)} className="current">全市</li>);

	        childData.map((data,k) => {
		        childHtml.push(<li onClick={this.areaClickChild.bind(this,data.id)} className={data.isHas ? "" : "disable"} data-region={data.name}>{data.abbr}</li>);
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
	areaClickChild(areaid,e){
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
		this.AreaNameTiny = $(e.target).data('region');
	}
	sublimeRegion(e){
		this.datatimeAreaId = this.datatimeAreaIdTiny;
		this.datatimeAreaName = this.datatimeAreaNameTiny;
		this.AreaName = this.AreaNameTiny;
		this.closeHoverRegion();
		this.setState({
			hover: true
		},()=>{
			this.setMaps();
		});
	}
	closeHoverRegion(e){
		this.refs.regionModule.style.display = 'none';
	}
	geterCode() {
		let configer = {
			timeId: this.datatimeId,
			areaId: this.datatimeAreaId
		};

		let params = encodeURIComponent(location.href + "?" +$.param(configer));
		let result = $.httpxhr + "/v1/system/qrCode?url=" + params;
		return result;
	}
	selectData(e){
		this.props.callback(this.datatimeId,this.datatimeAreaId);
	}	
	setMaps(){
		let mapName = this.AreaName;

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
		            itemStyle: {
	            		normal: {
	            			areaColor: '#49befc',
	            			color: '#49befc',
	            			borderColor: '#49befc'
	            		}
	            	}
		        }]
		    });
		    this.chart.hideLoading();
		});
	}
	render() {
		return (
			<div className="regional-nav">
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