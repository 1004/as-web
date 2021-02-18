import logo from './logo.svg';
import './App.less';

import {Layout} from 'antd'
import DrawerMenu from './component/DrawerMenu'
import Header from './component/Header'
import React from "react";
import {Switch, Route} from 'react-router-dom'
import Home from './page/home/home'
import User from './page/user/user'
import Category from './page/category/category'
import AddCategory from './page/category/add/category_add'
import Config from './page/config/config'
import AddConfig from './page/config/add/config_add'
import ConfigList from './page/config/list/config_list'


const {Content, Footer} = Layout


export default class Index extends React.Component {
    state = {
        title: '首页',
        collapsed: false
    };

    render() {
        const {collapsed, title} = this.state;
        return (
            <Layout className='App'>
                <DrawerMenu collapsed={collapsed} onMenuSelect={(pathName,title)=>{
                    this.setState({
                        title
                    })
                }}/>
                <Layout>
                    <Header title={title} toggle={(collapsed) => {
                        this.setState({collapsed})
                    }}/>
                    <Content className='App-content'>
                        <switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/addCategory' component={AddCategory}/>
                            <Route path='/config' component={Config}/>
                            <Route path='/addConifg' component={AddConfig}/>
                            <Route path='/configList' component={ConfigList}/>
                            <Route path='/user' component={User}/>
                        </switch>
                    </Content>
                    <Footer className='App-footer'>
                        我的管理后台 create by xky
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}


