import React, { forwardRef, useImperativeHandle } from 'react'
import { Form, Input } from 'antd'
//ref在函数组件中用法
const AddForm = forwardRef((props, ref) => {
    const [form] = Form.useForm();//表单数据
    /*  useEffect(() => {
         props.getFormData(form.getFieldValue())
     }, [form]) */
    const getFormData = () => {
       return form.getFieldValue(); 
    }
    //暴露子组件方法getFormData
    useImperativeHandle(ref, () => ({
        getFormData
    }))
    return (
        <Form name="basic" form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
            <Form.Item label='角色名称' name="name" rules={
                [{ required: true, message: '请输入角色名称!' },{ min: 2, message: '角色名称不少于2位' },]
                }>
                <Input placeholder="请输入角色名称" />
            </Form.Item>
        </Form>
    )
})
export default AddForm