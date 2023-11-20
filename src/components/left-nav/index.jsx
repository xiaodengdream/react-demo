import React from 'react'
import logo from '../../assets/back.jpg'
import './index.less'
import { Menu } from 'antd';
import menuConfig from '../../config/menuConfig';
import { useLocation } from 'react-router-dom'
export default function Left() {
  const location = useLocation()//拿到当前路径
  //根据当前子路由地址判断sub值（下拉菜单打开）
  function sub(params) {
    if (['/category', '/product/home', '/product/add', '/product/detail'].indexOf(params.pathname) !== -1) {
      return ['sub1']
    }
    if (['/bar', '/line', '/pie'].indexOf(params.pathname) !== -1) {
      return ['sub2']
    } else {
      return []
    }
  }
  //根据当前子路由地址判断选中一项
  function item(params) {
    if (['/product/home', '/product/add', '/product/detail'].indexOf(params.pathname) !== -1) {
      return ['/product']
    }else{
      return [params.pathname]
    }
  }
  return (
    <div className='left-nav'>
      <header className='left-nav-header'>
        <img src={logo} />
        <p>羚羊后台</p>
      </header>
      <div style={{ overflow: 'auto', height: '86%' }}>
        <Menu
          defaultSelectedKeys={item(location)}
          defaultOpenKeys={sub(location)}
          mode="inline"
          theme="dark"
          items={menuConfig()}
        >
        </Menu>
      </div>
    </div>
  )
}

