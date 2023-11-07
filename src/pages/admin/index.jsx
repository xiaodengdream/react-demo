import React, { Component } from 'react'
import { Navigate, NavLink, Routes, Route } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home'
import Cetegroy from '../category'
import Product from '../product'
import Role from '../role'
import User from '../user/index'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
export default class Admin extends Component {
  render() {
    //读取不到内存中user跳转到登录页面
    const user = memoryUtils.user
    if (!user || !user.id) {
      return < Navigate to='*login' />
    }
    const { Footer, Sider, Content } = Layout;
    const headerStyle = {
      /*  textAlign: 'center',
       color: '#fff',
       height: 64,
       paddingInline: 50,
       lineHeight: '64px',
       backgroundColor: '#7dbcea', */
    };
    const contentStyle = {
      textAlign: 'center',
      minHeight: 120,
      lineHeight: '120px',
      color: '#fff',
      backgroundColor: '#108ee9',
    };
    const footerStyle = {
      textAlign: 'center',
      color: '#cccccc',
      backgroundColor: 'rgb(230,230,230)',
    };
    return (
      <Layout style={{ height: '100%' }}>
        <Sider><LeftNav /></Sider>
        <Layout>
          <Header></Header>
          <Content>
            <NavLink to='/home'>home</NavLink>
            <NavLink to='/user'>user</NavLink>
            <NavLink to='/role'>role</NavLink>
            <NavLink to='/category'>category</NavLink>
            <NavLink to='/product'>product</NavLink>
            
            <Routes>
              <Route path="/home" element={<Home/>}></Route>
              <Route path="/user" element={<User/>}></Route>
              <Route path="/role" element={<Role/>}></Route>
              <Route path="category" element={<Cetegroy/>}></Route>
              <Route path="/product" element={<Product/>}></Route>
              <Route path="/bar" element={<Bar/>}></Route>
              <Route path="/line" element={<Line/>}></Route>
              <Route path="/pie" element={<Pie/>}></Route>
              <Route path="/" element={<Navigate to="/home" />} />
            </Routes>

          </Content>
          <Footer style={footerStyle}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
