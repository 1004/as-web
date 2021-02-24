import React from 'react'
import './config_add.less'
import API from '../../../service/api'
import {Input, Button, message} from "antd";

const {TextArea} = Input;

export default class ConfigAdd extends React.Component {
    constructor(pros){
        super(pros);
        const {location:{item:{namespance}={}}={}} = this.props;
        this.namespace = namespance;
    }
    state = {
        configText: '',
        submit: false
    }

    submit = () => {
        const {configText, submit} = this.state;
        if (!this.namespace){
            message.error("空间不能为空")
            return;
        }
        API.addConfig({name_space: this.namespace, content: configText})
            .then(res => res.json())
            .then(result => {
                const {code, msg} = result;
                if (code === 0) {
                    message.success("添加成功");
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
        const {configText, submit} = this.state;

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
                                configText: value
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
                    >
                        提交发布
                    </Button>
                </div>
            </div>
        </div>
    }
}