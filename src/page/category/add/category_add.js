import React from 'react'
import './category_add.less'
import api from '../../../service/api'//export default模块
import {Form, Input, Button, Alert} from 'antd'//模块内export变量

export default class CategoryAdd extends React.Component {

    state = {
        isFinish: false,
        isSuccess: false,
        msg: ''
    };


    render() {
        const layout = {
            wrapperCol: {span: 10},
        };

        const CATEGORY_NAME = "类别名字";
        const {isFinish, isSuccess, msg} = this.state;

        const showAlert = isFinish ?
            <Alert message={isSuccess ? "添加成功" : msg} type={isSuccess ? "success" : "error"}/> : '';

        return <div>
            {showAlert}
            <Form className="addCategory"
                  {...layout}
                  name="basic"
                  onFinish={(v) => {
                      this.onFinish(
                          v
                      )
                  }}
            >
                <Form.Item label={CATEGORY_NAME} name="categroy_name"
                           rules={[{required: true, message: '请输入分类名字!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        添加分类
                    </Button>
                </Form.Item>
            </Form>
        </div>
    }

    onFinish = (v) => {
        console.log(v.categroy_name);
        this.addCategory(v.categroy_name);
    }


    addCategory = (category_name) => {
        api.addCategoryName({categroy_name: category_name}).then(
            res => res.json()
        ).then(result => {
            const {code, msg} = result;
            this.setState({
                isFinish: true,
                isSuccess: code === 0,
                msg
            })
        }).catch(e => {
            console.log(e);
        })
    }
}