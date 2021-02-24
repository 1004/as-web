import EventBus from 'react-native-event-bus'

export const RouterConfig ={
    home: {
        key: 'home',
        title: '首页',
        pathname:'/home',
    },
    user: {
        key: 'user',
        title: '用户管理',
        pathname:'/user',
    },
    category: {
        key: 'category',
        title: '类别管理',
        pathname:'',
    },
    addCategory: {
        key: 'addCategory',
        title: '添加类别',
        pathname:'/addCategory',
    },
    CategoryList: {
        key: 'CategoryList',
        title: '类别列表',
        pathname:'/category',
    },
    config: {
        key: 'config',
        title: '配置中心',
        pathname:'/config',
    },
    configList: {
        key: 'configList',
        title: '配置列表',
        pathname:'/configList',
    },
    addConfig: {
        key: 'addConfig',
        title: '添加配置',
        pathname:'/addConifg',
    }
};

export const ROUTER_EVENT = 'router_event';

export default class NavigatorUtil {
    static goto(routerConifg,history){
        const {title,pathname} = routerConifg;
        if (!history || !pathname) {
            console.log('history & pathname can not null')
            return;
        }
        EventBus.getInstance().fireEvent(ROUTER_EVENT,routerConifg);
        return params=>{
            history.push({
               pathname,
               ...(params || {})
            });
        }
    }
}