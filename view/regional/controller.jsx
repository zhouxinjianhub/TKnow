
import React from 'react';
import ReactDOM from 'react-dom';

class RegionalController extends React.Component {
	constructor(props) {
		super(props);
		this.HTMLDOM = [];
		this.HTMLDOM2 = [];
		this.HTMLDOM3 = [];
		this.hover = true;
	}
	componentDidMount() {
		this.datas = [];
		$.GetAjax('/v1/system/datatimeList', null, 'Get', true, (data,state)=>{
            if (state && data.code == 0) {
                this.datas = data.data;
                console.log(data);
             } else {
                
             }
        }); 
	}
	
	hover1(e) {
		e.preventDefault();
		this.HTMLDOM = [];
		ReactDOM.findDOMNode(this.refs.largeModule).style.display = 'block';

		let check_1_HTML = [];
		for ( let i in this.datas ) {
			check_1_HTML.push(<span onMouseOverCapture={this.hover2.bind(this,i)} className="one_hover" data-id={this.datas[i].id}>{this.datas[i].aliasname}<i className="iconfont icon-right"></i></span>);
		}
		this.HTMLDOM.push(<div className='check-1'>{ check_1_HTML }</div>);

		this.setState({
			hover: true
		},()=>{
			$('.nav-list-module').css({
				width: '213px'
			})
		})
		
	}
	out1(e){
		ReactDOM.findDOMNode(this.refs.largeModule).style.display = 'none';
	}
	hover2(key,e){
		this.HTMLDOM2 = [];
		let check_2_HTML = [];
		let data = this.datas[key].children;
		for ( let i in data ) {
			let config = {
				parent: key,
				key: i
			}
			check_2_HTML.push(<span onMouseOverCapture={this.hover3.bind(this,config)} className="two_hover">{data[i].simplealiasname}<i className="iconfont icon-right" data-stop='true'></i></span>);
		}
		this.HTMLDOM2.push(<div className='check-2'>{ check_2_HTML }</div>);
		this.setState({
			hover: true
		},()=>{
			$(".one_hover").removeClass('current');
			$('.one_hover').eq(key).addClass('current');
			$(".two_hover").removeClass('current');
			this.HTMLDOM3 = [];
			$('.nav-list-module').css({
				width: '329px'
			});
		})
	}
	hover3(config,e){
		this.HTMLDOM3 = [];
		console.log(e.target);
		if ( e.target.getAttribute("data-stop") ) {
			return false;
		}
		let check_3_HTML = [];
		let data = this.datas[config.parent].children[config.key].children;
		for ( let i in data ) {
			check_3_HTML.push(<span onMouseOverCapture={this.hover4.bind(this,i)} className="three_hover">{data[i].simplealiasname}</span>);
		}
		this.HTMLDOM3.push(<div className='check-3'>{ check_3_HTML }</div>);
		this.setState({
			hover: true
		},()=>{
			$(".two_hover").removeClass('current');
			$('.two_hover').eq(config.key).addClass('current');
			$('.nav-list-module').css({
				width: '681px'
			});
		})
	}
	hover4(key,e){
		this.setState({
			hover: true
		},()=>{
			$(".three_hover").removeClass('current');
			$('.three_hover').eq(key).addClass('current');
		})
	}
	render() {
		return (
			<div className="regional-nav">
			   <div className="select-module" onMouseOverCapture={this.hover1.bind(this)} onMouseOutCapture={this.out1.bind(this)}>
			   		<span>2016年8月累计</span>
			   		<i className="iconfont icon-down"></i>
			   		<div className="nav-list-module" ref="largeModule">
	   					{ this.HTMLDOM }{ this.HTMLDOM2 }{ this.HTMLDOM3 }
			   		</div>
			   	</div>
			   <div className="select-module"><span>全国</span><i className="iconfont icon-down"></i></div>
			   <div className="map-module">地图模块</div>
			   <div className="button-module"><input type="button" value="查询数据详情"/></div>
			   <div className="share-module"><i className="iconfont icon-share"></i></div>
			</div>
		)
	}
}

module.exports = RegionalController