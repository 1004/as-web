import React from 'react'
import './config_list.less'
import API from '../../../service/api'
import {Table} from 'antd'
import NavigatorUtil,{RouterConfig as MENUS} from '../../../component/Navigator'


const PAGE_SIZE = 10;
export default class ConfigList extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "id",
                dataIndex: "id",
                key: "id",
                width: "10%"
            },
            {
                title: "namespance",
                dataIndex: "namespance",
                key: "namespance",
                width: "10%"
            },
            {
                title: "version",
                dataIndex: "version",
                key: "version",
                width: "10%"
            },
            {
                title: "createTime",
                dataIndex: "createTime",
                key: "createTime",
                width: "10%"
            },
            {
                title: "originalUrl",
                dataIndex: "originalUrl",
                key: "originalUrl",
                width: "20%"
            },
            {
                title: "jsonUrl",
                dataIndex: "jsonUrl",
                key: "jsonUrl",
                width: "20%"
            },
            {
                title: <div className="configlist-operation">操作</div>,
                dataIndex: "operate",
                key: "operate",
                width: "20%",
                render: (text, record) => (
                    <div className='configlist-operation' onClick={()=>this.editRecord(record)}>
                        <a>编辑</a>
                    </div>
                )
            },
        ];
    }

    state={
        list:[],
        total:0
    };

    componentDidMount() {
        this.loadData(1);
    }


    render() {
        const {list,total} = this.state;
        return <Table
          columns={this.columns}
          rowKey={item=>item.id}
          dataSource={list}
          scroll={{x:1000,y:1000}}
          pagination={
              {
                  total,
                  pageSize:PAGE_SIZE,
                  onChange:(page,pageSize)=>{
                      this.loadData(page);
                  }
              }
          }
        />
    }

    loadData=(page)=>{
        this.page = page;
        API.configList({page_index:page,page_size:PAGE_SIZE})
            .then(res=>res.json())
            .then(result=>{
                const {code,msg,data:{total,list}} = result;
                this.setState({
                    total,
                    list
                })
            }).catch(e=>{
                console.log(e);
        })
    };

    //编辑
    editRecord(record) {
        const {history} = this.props;
        NavigatorUtil.goto(MENUS.addConfig,history)({item:record})
    }
}