
import React from 'react';
import { Link } from 'react-router';

class Problem extends React.Component {
	render() {
		return (
			<div className="aboutme-content">
				<strong>1、页面显示不正常，怎么办？</strong>
				<p>答：您可以尝试：</p>
				<p>1> CTRL+F5，强制刷新页面试试看；</p>
				<p>2> CTRL+SHIFT+DELETE，清空全部缓存试试看。</p>
				<strong>2、主页字体过大、过小，怎么办？</strong>
				<p>答：您可以尝试：</p>
				<p>1> CTRL+鼠标滚轮，调节到100%或合适大小；</p>
				<p>2> CTRL+0，直接调整到100%。</p>
				<strong>3、部分内容模块无法加载，怎么办？</strong>
				<p>答：</p>
				<strong>4、其他问题</strong>
				<p>答：更多其他问题可以<Link to={{ pathname: "/aboutme/feedback"}} >点击此处</Link>向我们反馈，我们将尽快回复。</p>
			</div>
		)
	}
}

module.exports = Problem