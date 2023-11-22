import React, { useEffect } from 'react'
/* import style from './login.less' */
import './login.less'
import logo from '../../assets/back.jpg'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import ajax from '../../api/ajax';
import { useNavigate } from "react-router-dom";
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
export default function Login(props) {
  const user = memoryUtils.user//拿到内存中的user
  const navigate = useNavigate()//编程导航跳转
  const [messageApi, contextHolder] = message.useMessage();//message使用
  //读取user跳转到admin页面
  useEffect(() => {
    if (user.id) {
      navigate('/', { replace: true })
    }
  }, [])
  //密码自定义验证方法
  const validator = (rule, value, callback) => {
    if (!value) {
      return Promise.reject('密码必须输入')
    } else if (value.length < 4) {
      return Promise.reject('密码长度必须大于等于4')
    } else if (value.length > 12) {
      return Promise.reject('密码长度必须小于12')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject('密码必须英文、数字或下划线组成')
    } else {
      return Promise.resolve()
    }
  }
  //登录接口调用
  const onFinish = async (values) => {
    const { username, password } = values
    const param = {
      url: '/api/login',
      type: 'POST',
      data: { username, password }
    }
    let loginData = await ajax(param)
    if (loginData.data.code === 200) {
      memoryUtils.user = loginData.data.user //将user存入内存        
      storageUtils.saveUser(loginData.data.user) //将user存入local
      storageUtils.setToken(loginData.data.token) //将token存入local
      messageApi.open({ type: 'success', content: loginData.data.message });
      setTimeout(() => {
        navigate('/', { replace: true }) //登录成功，跳转到home页面
      }, 1000);
    } else {
      //登录失败
      messageApi.open({ type: 'error', content: loginData.data.message });
    }
  };
  return (
    <div className='login'>
      <div className='login-header'>
        <img className='login-img' src={logo} alt="" />
        <h2 className='login-h1'>羚羊电商运营平台</h2>
      </div>
      <div className='login-content'>
        <h1>用户登录</h1>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item name="username"
            rules={[
              { required: true, message: 'Please input your username!', },
              { min: 4, message: '用户名不少于4位' },
              { max: 12, message: '用户名不多余于12位' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须英文、数字或下划线组成' }
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="username" />
          </Form.Item>
          <Form.Item name="password"
            rules={[{ validator: validator }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
        {contextHolder}
      </div>
    </div >
  )
}
