import React, { useEffect, useState } from 'react'
import { Button, message, Modal, Space } from 'antd'
import { GithubOutlined, ExclamationCircleOutlined, CloudSyncOutlined } from '@ant-design/icons'
import './index.less'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils';
import { useNavigate, useLocation } from "react-router-dom";
import formateDate from '../../utils/formateData';
export default function Header() {
  //获取当前路劲
  const location = useLocation().pathname
  //定义title
  const [title, setTitle] = useState(location)
  useEffect(() => {
    if (location === '/home') {
      setTitle('首页')
    } else if (location === '/category') {
      setTitle('品类管理')
    } else if (location === '/product/home') {
      setTitle('商品管理')
    } else if (location === '/user') {
      setTitle('用户管理')
    } else if (location === '/role') {
      setTitle('角色管理')
    } else if (['/bar', '/line', '/pie'].indexOf(location) !== -1) {
      setTitle('图形管理')
    }
  }, [location])
  //退出登录，清空缓存和local,返回登录界面
  const navigate = useNavigate()
  /*   console.log(location); */
  const time = new Date()
  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: '',
      icon: <ExclamationCircleOutlined />,
      content: '确定要退出吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: exit
    });
  };

  function exit() {
    storageUtils.removeUser()
    memoryUtils.user = {}
    setTimeout(() => {
      message.success('退出用户')
      navigate('/login', { replace: true })
    }, 1000);
  }
  return (
    <div className='headerStyle'>
      <div className='head1'>
        <GithubOutlined style={{ fontSize: '230%' }} />
        <span>
          欢迎，admin</span>
        <Space><Button style={{ color: 'rgb(17,149,121)' }} size='large' onClick={confirm} type="link">退出</Button></Space>
        {contextHolder}
      </div>
      <div className='head2'>
        <div className='left'>{title}</div>
        <div className='right'>
          {formateDate(time)}
          <CloudSyncOutlined style={{ fontSize: '230%', color: '#f56a00' }} />
          <span>多云</span>
        </div>
      </div>
    </div>
  )
}
