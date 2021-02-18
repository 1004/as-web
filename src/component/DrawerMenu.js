import React from 'react'
import {Layout, Menu} from 'antd'
import './DrawerMenu.less';
import {withRouter} from 'react-router-dom'
import {
    HomeOutlined,
    AppstoreAddOutlined,
    ProjectOutlined,
    ShopOutlined,
    PicCenterOutlined,
    FileAddFilled,
    UserOutlined,
} from '@ant-design/icons'

const {Sider} = Layout;
const {SubMenu} = Menu;

// map

const MENUS = {
    home: {
        key: 'home',
        title: '首页',
    },
    user: {
        key: 'user',
        title: '用户管理'
    },
    category: {
        key: 'category',
        title: '类别管理',
    },
    addCategory: {
        key: 'addCategory',
        title: '添加类别',
    },
    config: {
        key: 'config',
        title: '配置中心',
    },
    configList: {
        key: 'configList',
        title: '配置列表',
    },
    addConfig: {
        key: 'addConfig',
        title: '添加配置'
    }
}


class Index extends React.Component {

    state = {
        selectedKeys: ['home']
    }

    onCollapse = collapsed => {
        this.setState({collapsed})
    }

    onSelect = selectKeys => {
        this.setState({
            selectedKeys: [selectKeys.key]
        })
        let pathName;
        switch (selectKeys.key) {
            case 'home':
                pathName = '/home';
                break;
            case 'user':
                pathName = '/user';
                break;
            case 'category':
                pathName = '/category';
                break;
            case 'addCategory':
                pathName = '/addCategory';
                break;
            case 'config':
                pathName = '/config';
                break;
            case 'configList':
                pathName = '/configList';
                break;
            case 'addConfig':
                pathName = '/addConifg';
                break;
        }
        const {history,onMenuSelect} = this.props;
        const menu = MENUS[selectKeys.key]
        if (pathName){
            history.push(pathName)
            onMenuSelect&&onMenuSelect(pathName,menu.title)
        }
    };

    menu() {
        return <Menu theme='dark' defaultSelectedKeys={this.state.selectedKeys} mode='inline'
                     onSelect={e => this.onSelect(e)}>
            <Menu.Item key={MENUS.home.key} icon={<HomeOutlined/>}>{MENUS.home.title}</Menu.Item>
            <Menu.Item key={MENUS.user.key} icon={<UserOutlined/>}>{MENUS.user.title}</Menu.Item>
            <SubMenu key={MENUS.category.key} title={MENUS.category.title} icon={<ProjectOutlined/>}>
                <Menu.Item key={MENUS.addCategory.key}
                           icon={<AppstoreAddOutlined/>}>{MENUS.addCategory.title}</Menu.Item>
            </SubMenu>
            <SubMenu key={MENUS.config.key} title={MENUS.config.title} icon={<PicCenterOutlined/>}>
                <Menu.Item key={MENUS.configList.key} icon={<ShopOutlined/>}>{MENUS.configList.title}</Menu.Item>
                <Menu.Item key={MENUS.addConfig.key} icon={<FileAddFilled/>}>{MENUS.addConfig.title}</Menu.Item>
            </SubMenu>
        </Menu>
    }

    //渲染
    render() {
        const {collapsed} = this.props; //从属性里取出collapsed
        const headerTitle = collapsed ? null : <div className='drawer-header-text-container'>
            <label className='drawer-header-text'>xxxx</label>
            <label className='drawer-header-text'>管理后台</label>
        </div>
        return <Sider collapsed={collapsed} collapsible onCollapse={this.onCollapse}>
            <div className='drawer-header'>
                <img className='drawer-logo' alt='logo'
                     src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=759934278,2888964925&fm=11&gp=0.jpg'/>
                {headerTitle}
            </div>
            {this.menu()}
        </Sider>
    }

}

export default withRouter(Index);

