import React,{ Component} from 'react';
import ReactDom from 'react-dom';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import {BrowserRouter, Route, Switch } from 'react-router-dom'; 
import './style.css';
import AppHeader from './components/Header/index.js';
import PageList from './components/Containers/List/index.js';
import Detail from './components/Containers/Detail/index.js';
import Login from './components/Login/index.js';
import Vip from './components/Containers/Vip/index.js';

const { Header, Footer, Content } = Layout;

class App extends Component{
	render(){
		return (
			<BrowserRouter>
				<Layout style={{minWidth: 1300,height: '100%'}}>
			      <Header className="header">
			      	<AppHeader />
			      </Header>
			      <Content className="content">
			      	<Login />
		      		<Switch>
		      			<Route path='/vip' component={Vip} />
		      			<Route path='/detail/:id' component={Detail} />
			      		<Route path='/:id?' component={PageList} />
			      	</Switch>
			      </Content>
			      <Footer className="footer">@copyright YF-Qiu 2018</Footer>
			    </Layout>
			</BrowserRouter>
			)
	}
} 

ReactDom.render(<App />, document.getElementById('root'))