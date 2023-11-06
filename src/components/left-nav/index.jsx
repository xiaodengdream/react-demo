import React, { Component } from 'react'
import logo from '../../assets/back.jpg'
import './index.less'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'antd';

import {
  HomeOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ToolOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;
export default class Left extends Component {
  state = {
    collapsed: false,
  };
  getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  render() {
    const { collapsed } = this.state
    const items = [
      this.getItem('首页', '1', <HomeOutlined />),
      this.getItem('商品', 'sub1', <AppstoreOutlined />, [
        this.getItem('品类管理', '2',<UnorderedListOutlined />),
        this.getItem('商品管理', '3',<ToolOutlined />),
      
      ]),
      this.getItem('用户管理', '4', <UserOutlined />),
      this.getItem('角色管理', '5', <SafetyCertificateOutlined />),
      this.getItem('图形图标', 'sub2', <AreaChartOutlined />, [
        this.getItem('柱状图', '6',<BarChartOutlined />),
        this.getItem('折线图', '7',<LineChartOutlined />),
        this.getItem('饼图', '8',<PieChartOutlined />)
      ]),
      this.getItem('图形图标', 'sub3', <AreaChartOutlined />, [
        this.getItem('柱状图', '9',<BarChartOutlined />),
        this.getItem('折线图', '10',<LineChartOutlined />),
        this.getItem('饼图', '11',<PieChartOutlined />)
      ]),
      this.getItem('图形图标', 'sub3', <AreaChartOutlined />, [
        this.getItem('柱状图', '9',<BarChartOutlined />),
        this.getItem('折线图', '10',<LineChartOutlined />),
        this.getItem('饼图', '11',<PieChartOutlined />)
      ]),
    ];
    return (
      <div className='left-nav'>
        <header className='left-nav-header' to='/'>
          <img src={logo} />
          <p>羚羊后台</p>
        </header>
        <div style={{overflow: 'auto',height:'90%'}}>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
            activeBarHeight='4'
          >
          </Menu>
        </div>
      </div>
    )
  }
}
