import React, { Component } from 'react'
import { Routes, Route} from 'react-router-dom';
import Login from './pages/login'
import Admin from './pages/admin'
export default class App extends Component {
  render() {
    return (
      //<ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
        <Routes>{/* 只匹配某一个路由*/}
          <Route path='*login' element={<Login />} ></Route>
          <Route path='*' element={<Admin />} ></Route>
        </Routes>
      //</ConfigProvider>
    );
  }
}