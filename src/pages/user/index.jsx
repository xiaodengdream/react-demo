import React, { useState, useEffect } from 'react'
import { Modal, Card, Button, Table, Input, Form, Select, message, Popconfirm } from 'antd'
import ajax from '../../api/ajax'
import formateDate from '../../utils/formateData'
import './index.less'
export default function User() {
  const [loading, setLoading] = useState()//加载数据进度条
  const [userInfo, setUserInfo] = useState([])//所有user信息
  const [addOpen, setAddOpen] = useState(false);//新增user对话框状态
  const [userStatu, setUserStatu] = useState(1)//判断form新增数据(1是新增) 还是更新数据(2是更新)
  const [form] = Form.useForm();//表单数据
  const [messageApi, contextHolder] = message.useMessage();//使用message
  //定义select数据
  const options = [{ label: '经理', value: '经理' }, { label: '老板', value: '老板' }, { label: '普通', value: '普通' }]
  //获取所有user信息
  const getUsers = async () => {
    const param = {
      url: '/api/user',
      type: 'GET',
    }
    setLoading(true)
    let userData = await ajax(param)
    if (userData.data.users) {
      userData.data.users.forEach((item) => {
        item.createTime = formateDate(item.createTime)
      })
      setTimeout(() => {
        setLoading(false)
        setUserInfo(userData.data.users)
      }, 1000);
    }
  }
  //新增user用户
  const createUser = async (data) => {
    const param = {
      url: '/api/user/add',
      type: 'POST',
      data: data
    }
    let userData = await ajax(param)
    messageApi.open({ type: 'success', content: userData.data.message });
    if (userData.data.users) {
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }

  }
  //新增或者更新对话框确认
  const addHandleOk = () => {
    if (userStatu === 1) {
      createUser(form.getFieldValue())//获取表单数据并发送新增请求
    }
    if (userStatu === 2) {
      updateUser(form.getFieldValue())//获取表单数据并发送更新请求
    }
    setAddOpen(false);
  }
  //修改用户按钮事件
  const upUserInfo = (data) => {
    setAddOpen(true);
    setUserStatu(2)
    form.setFieldsValue({ ...data })//把选中的user信息回放到form中
  }
  //更新user用户
  const updateUser = async (data) => {
    const param = {
      url: '/api/user/update',
      type: 'POST',
      data: data
    }
    let userData = await ajax(param)
    messageApi.open({type: 'success',content: userData.data.message});
    if (userData.data.users) {
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
  }
  //确定删除用户
  const confirm = async (data) => {
    const param = {
      url: '/api/user/delete',
      type: 'POST',
      data: { id: data.id }
    }
    let userData = await ajax(param)
    if (userData.data.users) {
      messageApi.open({type: 'success',content: userData.data.message});
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }

  };
  //取消删除用户
  const cancel = () => {
    messageApi.open({
      type: 'error',
      content: '取消删除',
    });
  };
  //验证字段
  const validator = (rule, value, callback) => {
    if (!value) {
      return Promise.reject('字段必须输入')
    } else if (value.length < 3) {
      return Promise.reject('字段长度必须大于等于3')
    } else if (value.length > 18) {
      return Promise.reject('字段长度必须小于18')
    } else if (!/^[a-zA-Z0-9_.@]+$/.test(value)) {
      return Promise.reject('字段必须英文、数字或下划线组成')
    } else {
      return Promise.resolve()
    }
  }
  useEffect(() => {
    getUsers()
  }, [])
  //定义Card title
  const title = (
    <Button onClick={() => { setAddOpen(true); setUserStatu(1); form.resetFields() }} type='primary'>创建用户</Button>
  )
  //定义表格机构
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'id',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'id',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'id',
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'id',
    },
    {
      title: '所属角色',
      dataIndex: 'roleId',
      key: 'id',
    },
    {
      title: '操作',
      key: 'id',
      render: (_, record) => (<>
        <Button onClick={() => upUserInfo(record)} size='midden' type="link" style={{ color: 'rgb(17,149,121)' }}>修改</Button>
        <Popconfirm
          title={'删除用户' + record.username}
          description='你确定要删除该用户'
          onConfirm={() => confirm(record)}
          onCancel={cancel}
          okText="是"
          cancelText="否"
        >
          <Button size='midden' type="link" style={{ color: 'rgb(17,149,121)' }}>删除</Button>
        </Popconfirm>

      </>),
    },
  ];
  return (
    <div className='user-content'>
      <div className='user-content-home'>
        <Card title={title} className='user-content-card'>
          <Table
            columns={columns}
            dataSource={userInfo}
            bordered='true'
            rowKey='id'
            loading={loading}
            pagination={{ defaultPageSize: 5, defaultCurrent: 1, showQuickJumper: true }}
          />
        </Card>
        <Modal title={userStatu === 1 ? '添加用户' : '更新用户'} centered open={addOpen} onOk={addHandleOk} onCancel={() => setAddOpen(false)}>
          <Form name="basic" labelCol={{ span: 5 }} wrapperCol={{ span: 13 }} form={form}>
            <Form.Item label='用户名' name="username" rules={[{ validator: validator }]}>
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item label='密码' name="password" rules={[{ validator: validator }]}>
              <Input placeholder="请输入密码" />
            </Form.Item>
            <Form.Item label='手机号' name="phone" rules={[{ validator: validator }]}>
              <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item label='邮箱' name="email" rules={[{ validator: validator }]}>
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item label='角色' name="roleId">
              <Select options={options} />
            </Form.Item>
          </Form>
        </Modal>
        {contextHolder}
      </div>
    </div>
  )
}