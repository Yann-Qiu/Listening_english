import React,{ Component } from 'react';
import { List } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

class PageList extends Component{

	constructor(props){
		super(props);
		this.state={
			list:[]
		}
	}

	componentDidMount(){
		const id = this.props.match.params.id;
		let url = 'http://www.dell-lee.com/react/api/list.json';
		if(id){
			url = url + '?id=' + id;
		}
		axios.get(url)
		.then(res=>{
			this.setState({
				list: res.data.data
			})
		})
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		axios.get('http://www.dell-lee.com/react/api/list.json?id=' + nextProps.match.params.id)
		.then(res=>{
			this.setState({
				list: res.data.data
			})
		})
	}

	render(){
		return (
			<List
			style={{background:"#fff"}}
		      bordered
		      dataSource={this.state.list}
		      renderItem={item => (
		        <List.Item>
		          <Link to={`/detail/${item.id}`}>
		          	{item.title}
		          </Link>
		        </List.Item>
		      )}
		    />
			)
	}
}

export default PageList;