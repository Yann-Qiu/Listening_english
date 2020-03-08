import React,{ Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';
import { Modal, Button } from 'antd';
import { Input } from 'antd';
import { message } from 'antd';

class Login extends Component{

	constructor(props){
		super(props);
		this.state = {
			login:false,
			modal:false,
			user:'',
			password:''
		}
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.changeUser = this.changeUser.bind(this);
		this.changepwd = this.changepwd.bind(this);
		this.checkLogin = this.checkLogin.bind(this);
		this.logout = this.logout.bind(this);
	}

	showModal(){
		this.setState(
		{
			modal:true
		})
	}

	hideModal(){
	    this.setState({
	      modal: false,
	    });
  	};

  	changeUser(e){
  		this.setState({user:e.target.value})
  	}

  	changepwd(e){
  		this.setState({password:e.target.value})
  	}

  	checkLogin(){
  		const {user ,password} = this.state;
  		const url = `http://www.dell-lee.com/react/api/login.json?user=${user}&password=${password}`;
  		axios.get(url ,{withCredentials: true})
		.then((res)=>{
			console.log(res);
			const login = res.data.data.login;
			if(login){
				message.success('login success');
				this.setState({login:true})
				this.hideModal();
			}
			else
				message.error('login error!Try again');
		})
  	}
  	logout(){
  		axios.get('http://www.dell-lee.com/react/api/logout.json', {withCredentials: true})
		.then((res)=>{
			const data = res.data.data;
			if(data.logout){
				this.setState({login: false});
				message.success('logout success');
			}
		})
  	}

	render(){	
		const login = this.state.login	;
		return ( 
			<div>
			{
				login ? 
				<Link to="/">
			  		<Button type="primary" onClick={this.logout} >logout</Button>
			  	</Link>
			  	: <Button type="primary" onClick={this.showModal} >login</Button>
			}
			<Link to='/vip'>
				<Button type="primary" >vip</Button>
			</Link>
			<Modal
	          title="Login"
	          visible={this.state.modal}
	          onOk={this.checkLogin}
	          onCancel={this.hideModal}
	        >
	          <Input placeholder="请输入用户名" value={this.state.user} onChange = {this.changeUser}/>
	          <Input style={{marginTop:"10px"}} placeholder="请输入密码"  type="password" 
	          			value={this.state.password} onChange = {this.changepwd}/>
	        </Modal>
			</div>)
	}



	componentDidMount(){
		axios.get('http://www.dell-lee.com/react/api/islogin.json', {withCredentials: true})
		.then((res)=>{
			this.setState({login:res.data.data.login});
		})
	}
}

export default Login;