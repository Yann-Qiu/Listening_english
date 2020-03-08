import React , { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';

class Vip extends Component{

	constructor(props){
		super(props);
		this.state={
			login:true,
			fetchFinish:false
		}
	}

	componentDidMount(){
		axios.get('http://www.dell-lee.com/react/api/islogin.json', {withCredentials: true})
			.then((res)=>{
				this.setState({
					login:res.data.data.login,
					fetchFinish:true
				});
			})
	}

	render(){
		if(this.state.login)
		{
			if(this.state.fetchFinish)
				{
					return <div>vip</div>
				}else{
					message.error('Please login first');
					return <div>lodaing</div>
			}
		}

		else{
			return <Redirect  to='/' />
		}
	}
}

export default Vip;