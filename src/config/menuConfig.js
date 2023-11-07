import { NavLink} from 'react-router-dom'
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
  const  getItem = (label, key, icon, children, type) => {
    return {
      label,
      key,
      icon,
      children,
      type,
    };
  }
export default function menuConfig(){
      const items = [
        getItem(<NavLink to='/home'>首页</NavLink>, '1', <HomeOutlined />),
        getItem('商品', 'sub1', <AppstoreOutlined />, [
          getItem(<NavLink to='/category'>品类管理</NavLink>, '2',<UnorderedListOutlined />),
          getItem(<NavLink to='/product'>商品管理</NavLink>, '3',<ToolOutlined />),
        ]),
        getItem(<NavLink to='/user'>用户管理</NavLink>, '4', <UserOutlined />),
        getItem(<NavLink to='/role'>角色管理</NavLink>, '5', <SafetyCertificateOutlined />),
        getItem('图形图标', 'sub2', <AreaChartOutlined />, [
          getItem(<NavLink to='/bar'>柱状图</NavLink>, '6',<BarChartOutlined />),
          getItem(<NavLink to='/line'>折线图</NavLink>, '7',<LineChartOutlined />),
          getItem(<NavLink to='/pie'>饼图</NavLink>, '8',<PieChartOutlined />)
        ]),
        getItem('图形图标', 'sub3', <AreaChartOutlined />, [
          getItem('柱状图', '9',<BarChartOutlined />),
          getItem('折线图', '10',<LineChartOutlined />),
          getItem('饼图', '11',<PieChartOutlined />)
        ]),
      ];
      return items
}