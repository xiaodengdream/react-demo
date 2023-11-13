import React, { useEffect } from 'react'
import { useNavigate, Navigate, NavLink, Routes, Route, Outlet} from 'react-router-dom'
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
 const headerStyle = {
  textAlign: 'center',
   color: '#fff',
   height: 64,
   paddingInline: 50,
   lineHeight: '64px',
   backgroundColor: '#7dbcea',
};

export default function Admin() {
  const { Footer, Sider, Content } = Layout;
  const user = memoryUtils.user
  const navigate = useNavigate()
  //读取不到内存中user跳转到登录页面
  useEffect(() => {
    if (!user.id) {
      navigate('/login', { replace: true })
    }
  }, [])
  const footerStyle = {
    height:"10%",
    textAlign: 'center',
    color: '#cccccc',
    backgroundColor: 'rgb(230,230,230)',
  };
  const contentStyle = {
   height:'76%'
  };
  return (
    <Layout style={{ height: '100%' }}>
      <Sider><LeftNav /></Sider>
      <Layout>
        <Header></Header>
        <Content style={contentStyle}>
          {/*  { <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/user" element={<User />}></Route>
            <Route path="/role" element={<Role />}></Route>
            <Route path="category" element={<Cetegroy />}></Route>
            <Route path="/product" element={<Product />}></Route>
            <Route path="/bar" element={<Bar />}></Route>
            <Route path="/line" element={<Line />}></Route>
            <Route path="/pie" element={<Pie />}></Route>
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>} */}
          <Outlet />
        </Content>
        {/* <Footer style={footerStyle}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer> */}
      </Layout>
    </Layout>
  )
}

