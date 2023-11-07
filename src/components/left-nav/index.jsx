import React, { Component } from 'react'
import logo from '../../assets/back.jpg'
import './index.less'
import { Menu } from 'antd';
import menuConfig from '../../config/menuConfig';
export default class Left extends Component {
  render() {
    return (
      <div className='left-nav'>
        <header className='left-nav-header'>
          <img src={logo} />
          <p>羚羊后台</p>
        </header>
        <div style={{ overflow: 'auto', height: '90%' }}>
          <Menu
            defaultSelectedKeys={['1']}
            /*   defaultOpenKeys={['sub1']} */
            mode="inline"
            theme="dark"
            items={menuConfig()}
          >
          </Menu>
        </div>
      </div>
    )
  }
}
