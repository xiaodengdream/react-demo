import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { Button, message, ConfigProvider } from 'antd';
import Login from './pages/login'
import Admin from './pages/admin'

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>

      <Routes>{/* 只匹配某一个路由*/}
        <Route path='/login' Component={Login}></Route>
        <Route path='/' Component={Admin}></Route>
      </Routes>

    </ConfigProvider>
  );
}

export default App;
