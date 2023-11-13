import React, { useEffect } from 'react'
import { useNavigate, Outlet} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
export default function Admin() {
  const { Sider, Content } = Layout;
  const user = memoryUtils.user
  const navigate = useNavigate()
  //读取不到内存中user跳转到登录页面
  useEffect(() => {
    if (!user.id) {
      navigate('/login', { replace: true })
    }
  }, [])
  const contentStyle = {
   height:'76%'
  };
  return (
    <Layout style={{ height: '100%' }}>
      <Sider><LeftNav /></Sider>
      <Layout>
        <Header></Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

