import React from 'react'
import './category.less'

import Api from '../../service/api'
import {Table} from 'antd'

const PAGE_SIZE = 2;
export default class Category extends React.Component {
    constructor(props) {
        super(props);
        //设置表头
        this.columns = [
            {
                title: '类别id',
                dataIndex: 'categoryId'
            },
            {
                title: '类别名字',
                dataIndex: 'categoryName'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime'
            },
        ];
    }

    componentDidMount() {
        this.setState({
            loading: true,
        });
        this.loadData(1);
    }

    state = {
        loading: false,
        code: 0,
        msg: '',
        data: [],
        total: 0
    };

    render() {
        const {loading, data, total} = this.state;
        return <Table columns={this.columns} loading={loading} rowKey={item =>item.categoryId}
                      dataSource={data} pagination={
            {
                total,
                pageSize: PAGE_SIZE,
                onChange:(page,pageSize)=>{
                    this.loadData(page)
                }
            }

        }
        />
    }


    //加载数据
    loadData = (pageIndex) => {
        this.pageIndex = pageIndex;
        Api.categoryList({pageSize: PAGE_SIZE, page_index: pageIndex}).then(res => res.json()).then(result => {
            const {code, msg, data: {list, total, totalPage}} = result;
            this.setState({
                code,
                msg,
                data: list,
                loading: false,
                total: total
            })
        }).catch(e => {
            this.setState({
                loading: false,
            })
            console.log(e);
        })
    }
}
