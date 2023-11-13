import React, { useEffect } from 'react'
import { Modal, Input, Form } from 'antd';
export default function Upmodal(props) {
  const [form] = Form.useForm();//表单数据
  useEffect(() => {
    /* console.log(props.upData); */
    props.setUpshow(props.upshow)
  })
  const handleOk = () => {
    props.upData.name = form.getFieldsValue().name
    props.uplists(props.upData)
    props.setUpshow(false)
  }
  const handCancel = () => {
    props.setUpshow(false)
  }
  return (
    <div>
      <Modal title="修改分类" centered open={props.upshow} onOk={handleOk} onCancel={handCancel}>
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 30 }} form={form}>
          {/*   <Form.Item> <span>所属分类：</span></Form.Item>
              <Form.Item label='' name="parentId">
                <Select disabled defaultValue={1} options={[{ value: 1, label: 111 }, { value: 2, label: 222 }]} />
              </Form.Item> */}
          <Form.Item><span>分类名称：</span></Form.Item>
          <Form.Item label='' name='name'>
            <Input placeholder="请输入分类名称" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
