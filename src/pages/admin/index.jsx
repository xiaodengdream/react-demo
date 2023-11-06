import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
export default class Admin extends Component {
  render() {
    //读取不到内存中user跳转到登录页面
    const user = memoryUtils.user
    if (!user || !user.id) {
      return < Navigate to='/' />
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
    const siderStyle = {
      textAlign: 'center',
      lineHeight: '120px',
      color: '#fff',
      backgroundColor: '#3ba0e9',
    };
    const footerStyle = {
      textAlign: 'center',
      color: '#cccccc',
      backgroundColor:'rgb(230,230,230)',
    };
    return (
        <Layout style={{height:'100%'}}>
          <Sider>
            <LeftNav/>
          </Sider>
          <Layout>
            <Header style={headerStyle}>Header</Header>
            <Content style={contentStyle}>Content</Content>
            <Footer style={footerStyle}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
          </Layout>
        </Layout>
    )
  }
}
