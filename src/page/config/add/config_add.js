import React from 'react'
import './config_add.less'
import API from '../../../service/api'
import {Input, Button, message, Popconfirm, Table} from "antd";
import {configList} from "../../../service/config/api_config";


const {TextArea} = Input;

const PAGESIZE = 5;
export default class ConfigAdd extends React.Component {
    constructor(pros) {
        super(pros);
        const {location: {item: {namespance, version, originalUrl} = {}} = {}} = this.props;
        this.namespace = namespance;
        this.version = version;
        this.originalUrl = originalUrl;
        this.listDisplay = !!namespance;
        this.columns = [
            {
                title: 'version',
                dataIndex: 'version',
            },
            {
                title: 'createTime',
                dataIndex: 'createTime'
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const style = record.version === this.version ? {color: 'gray'} : null;
                    return <Popconfirm
                        title={`确定要还原到${record.version}吗？`}
                        disabled={record.version === this.version}
                        onConfirm={() => this.resetConifg(record)}
                    >
                        <a style={style}>还原</a>
                    </Popconfirm>
                }
            }

        ];
        this.loadConfigList();
        this.loadConfigText(originalUrl);
    }

    state = {
        configText: '',
        submit: false,
        list:[],
    };

    submit = () => {
        const {configText, submit} = this.state;
        if (!this.namespace) {
            message.error("空间不能为空")
            return;
        }
        API.addConfig({name_space: this.namespace, content: configText})
            .then(res => res.json())
            .then(result => {
                const {code, msg} = result;
                if (code === 0) {
                    message.success("添加成功");
                    this.loadConfigList();
                    this.setState({
                       submit:false
                    });
                } else {
                    message.success("添加失败：" + msg);
                }
            })
            .catch(e => {
                console.log(e)
                message.success("添加失败：" + e.toString());
            })
    };

    render() {
        const {configText, submit,list} = this.state;

        return <div className="addConfig">
            <div className="addConfig-left">
                <div className="addConfig-top">
                    <div className="addConfig-namespace">namespance</div>
                    <TextArea
                        className="addConfig-input"
                        onChange={({target: {value}}) => {
                            this.namespace = value;
                        }}
                        defaultValue={this.namespace}
                        placeHolder="请输入..."
                        autoSize={{maxRows: 1}}
                        disabled={this.namespace != null}
                    />
                </div>
                <div>
                    <TextArea
                        className="addConfig-input"
                        onChange={({target: {value}}) => {
                            this.setState({
                                configText: value,
                                submit:this.configText !== value
                            })
                        }}
                        value={configText}
                        placeHolder="请输入..."
                        autoSize={{minRows: 6, maxRows: 16}}
                    />
                </div>
                <div className='addConfig-btn'>
                    <Button type='primary'
                            onClick={this.submit}
                            disabled={!submit}
                    >
                        提交发布
                    </Button>
                </div>
            </div>
            {
                this.listDisplay ?
                    <div className='addConfig-right'>
                        <Table
                            columns={this.columns}
                            rowKey={item => item.id}
                            pagination={false}
                            size='small'
                            footer={() => (<div> 支持还原最近的{PAGESIZE}条</div>)}
                            dataSource={list}
                        />
                    </div>
                    : null
            }

        </div>
    }

    resetConifg(record) {
        this.loadConfigText(record.originalUrl);
    }

    loadConfigList = ()=>{
        if (!this.namespace){
            return;
        }
        API.configList({name_space:this.namespace,page_index:1,page_size:PAGESIZE})
            .then(res=>res.json())
            .then(result=>{
                const {code,msg,data:{list,total}={}} = result;
                this.setState({
                    list
                })
            }).catch(e=>{
                console.log(e);
        })
    }

    loadConfigText=(originUrl)=>{
        if (!originUrl) {
            return;
        }
        fetch(originUrl)
            .then(res=>res.text())
            .then(result=>{
                if (this.configText == null){
                    this.configText = result;
                }
                const submit = this.configText !== result;

                this.setState({
                    configText:result,
                    submit:submit
                })
            }).catch(e=>{
                console.log(e);
        })
    }

}