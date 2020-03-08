import React,{ Component } from 'react'
import { Card } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';

class Detail extends Component{

	constructor(props){
		super(props);
		this.state={
			title:'',
			content:''
		}
	}

	render(){
		let current = this.props.match.params.id;
		let prev = parseInt(current - 1);
		let next = parseInt(current) +  parseInt(1);
			return (
				<Card title={this.state.title} style={{ width: '100%'}}>
			      <div className="detail" dangerouslySetInnerHTML={{__html:this.state.content}}></div>
			      <Link to={`/detail/${prev}`}><div className="prev">prev</div></Link>
			      <Link to={`/detail/${next}`}><div className="next">next</div></Link>
			    </Card>
				)
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		axios.get('http://www.dell-lee.com/react/api/detail.json?id=' + nextProps.match.params.id)
		.then(res=>{
			this.setState({
				title:res.data.data.title,
				content:res.data.data.content
			})
		})
	}

	componentDidMount(){
		axios.get("http://www.dell-lee.com/react/api/detail.json?id=" + this.props.match.params.id)
		.then((res)=>{
			this.setState({
				title:res.data.data.title,
				content:res.data.data.content
			})
		})
	}
}

export default Detail;