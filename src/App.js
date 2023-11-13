import React from 'react'
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { ConfigProvider } from 'antd';
export default function App() {
  //定义路由规则routes
  const element = useRoutes(routes)
  return (
    <ConfigProvider theme={{ token: { colorPrimary: 'rgb(17,149,121)' } }}>
    <>
      {element}
    </>
    </ConfigProvider>
  )
}
