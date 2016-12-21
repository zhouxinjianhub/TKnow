
import React from 'react';

class ContainerSurveyModule3 extends React.Component {
	constructor(props) {
		super(props);
		this.viewMoudle = false;
		this.ajaxCont = ["networkTradingList","networkRetailList","entityRetailList","serviceRetailList"];
	}
	state = {
		t_data: {},
		type: 0
	}
	componentDidMount() {
		this._getDatas();
	}
	componentWillReceiveProps(nextProps){
        this.props = nextProps;
        this._getDatas();
	}
	_getDatas() {
		let option = {
			parent: true,
			timeId: this.props.timeId,
			areaId: this.props.areaId
		};
		$.GetAjax('/v1/zhishu/inner/electronicAnalysis', option, 'Get', true, (data,state)=>{
            if (state && data.code == 1) {
            	this.viewMoudle = true;
                this.setState({
                	type: 0,
                	t_data: data.data
                });

             } else {
                this.viewMoudle = false;
                this.setState({
                	t_data: {}
                });
             }
        });
	}
	changeNav(type,e) {
		if ( $(e.target).hasClass('current') ) {
			return false;
		}else{
			$(e.target).parent().find('span').removeClass('current');
			$(e.target).addClass('current');

			this.setState({
            	type: type
            });
		}
	}
	render() {
		if ( !this.viewMoudle ) {
			return false;
		};
		let [parentHTML=[],childHTML=[],childHTML2=[],tempNums=0] = [];
		childHTML.push(
			<div className="bold-list">
				<span>排名</span>
				<span>省市</span>
				<span>网络零售额(亿元)</span>
				<span>占比</span>
			</div>);
		childHTML2.push(
			<div className="bold-list">
				<span>排名</span>
				<span>省市</span>
				<span>网络零售额(亿元)</span>
				<span>占比</span>
			</div>)

		parentHTML.push(<div className="list-type">{ childHTML }</div>);
		parentHTML.push(<div className="list-type">{ childHTML2 }</div>);

		for ( let k = 0; k < 32; k++ ) {
			let data = this.state.t_data[this.ajaxCont[this.state.type]] || [];
			if ( tempNums < 16 ) {
				childHTML.push(
					<div className="small-list">
						<span>{ data[k] && (k < 10 ? "0"+(k+1) : k+1) || "-" }</span>
						<span>{ data[k] && data[k].name || "-" }</span>
						<span>{ data[k] && (Number(data[k].value).toFixed(2)) || "-" }</span>
						<span>{ data[k] && (data[k].scale*100).toFixed(2) + "%" || "-" }</span>
					</div>
				)
			}else{
				childHTML2.push(
					<div className="small-list">
						<span>{ data[k] && (k < 10 ? "0"+(k+1) : k+1) || "-" }</span>
						<span>{ data[k] && data[k].name || "-"}</span>
						<span>{ data[k] && (Number(data[k].value).toFixed(2)) || "-"}</span>
						<span>{ data[k] && (data[k].scale*100).toFixed(2) + "%" || "-" }</span>
					</div>
				)
			}
			tempNums ++;
		}
		return (
			<div className="survey-module">
				<div className="survey-module-title">全国31省市电子商务交易解析</div>
				<div className="survey-module-content">
					<div className="module3-nav">
						<span className={ this.state.type == 0 ? "current" : "" } onClick={this.changeNav.bind(this,0)}>网络交易额</span>
						<span className={ this.state.type == 1 ? "current" : "" } onClick={this.changeNav.bind(this,1)}>网络零售额</span>
						<span className={ this.state.type == 2 ? "current" : "" } onClick={this.changeNav.bind(this,2)}>实物型网络零售额</span>
						<span className={ this.state.type == 3 ? "current" : "" } onClick={this.changeNav.bind(this,3)}>服务型网络零售额</span>
					</div>
					<div className="module3-list">
						{ parentHTML }
					</div>
				</div>
			</div>
		)
	}
}

module.exports = ContainerSurveyModule3