import React, { useState, useEffect, useRef } from 'react'
import { Card, Button, Table, Space, Modal, message, Input } from 'antd'
import ajax from '../../api/ajax'
import formateDate from '../../utils/formateData'
import './index.less'
import AddForm from './addForm'
import SetForm from './setForm'
export default function Role() {
  const [loading, setLoading] = useState()//加载数据进度条
  const [roleInfo, setRoleInfo] = useState([])//定义表格数据
  const [showBt, setShowBt] = useState(true)//定义设置角色权限是否禁用
  const [rowRoleInfo, setRowRoleInfo] = useState()//radio选中的一行数据
  const [addModal, setAddModal] = useState(false)//添加角色对话框
  const [setModal, setSetModal] = useState(false)//设置角色权限对话框
  const [setInfo, setSetInfo] = useState()//设置角色权限表传过来数据
  const [messageApi, contextHolder] = message.useMessage()//使用message
  const formData = useRef()//定义ref
  //获取所有role信息
  const getRoles = async () => {
    const param = {
      url: '/api/role',
      type: 'GET',
    }
    setLoading(true)
    let roleData = await ajax(param)
    if (roleData.data.roles) {
      roleData.data.roles.forEach((item) => {
        item.createTime = formateDate(item.createTime)
        item.authTime = formateDate(item.authTime)
      })
      setTimeout(() => {
        setLoading(false)
        setRoleInfo(roleData.data.roles)
      }, 1000);
    }
  }
  //创建角色
  const createRole = async (data) => {
    const param = {
      url: '/api/role/add',
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
  //添加角色对话框确定事件
  const addHandleOk = () => {
    createRole(formData.current.getFormData())//调用子组件上的方法(ref为formData)
    setAddModal(false)
  }
  //设置角色权限
  const setRole = async (data) => {
    const param = {
      url: '/api/role/update',
      type: 'POST',
      data: data
    }
    let roleData = await ajax(param)
    messageApi.open({ type: 'success', content: roleData.data.message });
    if (roleData.data.roles) {
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    }
  }
  //设置角色对话框确认事件
  const setHandleOk = () => {
    const { name } = rowRoleInfo
    const data = {
      name: name,
      menus: setInfo
    }
    setRole(data)
    setSetModal(false)
  }
  //渲染组件
  useEffect(() => {
    getRoles()
  }, [])
  //定义Card title
  const title = (
    <Space>
      <Button type='primary' onClick={() => setAddModal(true)}>创建角色</Button>
      <Button type='primary' onClick={() => setSetModal(true)} disabled={showBt}>设置角色权限</Button>
    </Space>
  )
  //定义表格结构
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'id',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'id',
    },
    {
      title: '授权时间',
      dataIndex: 'authTime',
      key: 'id',
    },
    {
      title: '授权人',
      dataIndex: 'author',
      key: 'id',
    },
  ];
  //radio选中时调用
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowRoleInfo(selectedRows[0])
      setShowBt(false)
      /* console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows); */
    },
  };
  return (
    <div className='role-content'>
      <div className='role-content-home'>
        <Card title={title} className='role-content-card'>
          <Table
            rowSelection={{ type: 'radio', ...rowSelection, }}
            columns={columns}
            dataSource={roleInfo}
            bordered='true'
            rowKey='id'
            loading={loading}
            pagination={{ defaultPageSize: 5, defaultCurrent: 1, showQuickJumper: true }}
          />
        </Card>
        <Modal title='添加角色' centered open={addModal} onOk={addHandleOk} onCancel={() => setAddModal(false)}>
          <AddForm ref={formData}  /* getFormData={(e) => { setAddFormData(e) }} */ />
        </Modal>
        <Modal title='设置角色权限' centered open={setModal} onOk={setHandleOk} onCancel={() => setSetModal(false)}>
          <Space>
            角色名称: <Input disabled value={rowRoleInfo ? rowRoleInfo.name : ''} />
          </Space>
          <SetForm rowRoleInfo={rowRoleInfo} setSetInfo={setSetInfo} />
        </Modal>
        {contextHolder}
      </div>
    </div >
  )
}