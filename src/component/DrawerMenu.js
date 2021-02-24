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

import NavigatorUtil,{RouterConfig as MENUS,ROUTER_EVENT} from './Navigator'
import EventBus from 'react-native-event-bus'

const {Sider} = Layout;
const {SubMenu} = Menu;

// map

class Index extends React.Component {

    state = {
        selectedKeys: ['home']
    }

    componentDidMount() {
        EventBus.getInstance().addListener(ROUTER_EVENT,this.listener=(data)=>{
            const {key,title,pathname}=data;
            this.setState({
                selectedKeys:[key]
            })
            const {onMenuSelect}=this.props;
            onMenuSelect&&onMenuSelect(pathname,title);
        });
    }

    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.listener)
    }

    onCollapse = collapsed => {
        this.setState({collapsed})
    }

    onSelect = selectKeys => {
        this.setState({
            selectedKeys: [selectKeys.key]
        })
        const {history,onMenuSelect} = this.props;
        const menu = MENUS[selectKeys.key];
        NavigatorUtil.goto(menu,history)();
        onMenuSelect&&onMenuSelect(menu.pathname,menu.title);
    };

    menu() {
        let selectKeys = this.state.selectedKeys;
        return <Menu theme='dark' defaultSelectedKeys={selectKeys} mode='inline'
                     selectedKeys={selectKeys}
                     onSelect={e => this.onSelect(e)}>
            <Menu.Item key={MENUS.home.key} icon={<HomeOutlined/>}>{MENUS.home.title}</Menu.Item>
            <Menu.Item key={MENUS.user.key} icon={<UserOutlined/>}>{MENUS.user.title}</Menu.Item>
            <SubMenu key={MENUS.category.key} title={MENUS.category.title} icon={<ProjectOutlined/>}>
                <Menu.Item key={MENUS.CategoryList.key}
                           icon={<AppstoreAddOutlined/>}>{MENUS.CategoryList.title}</Menu.Item>
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

