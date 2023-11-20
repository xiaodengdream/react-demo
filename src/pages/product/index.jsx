import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import './index.less'
export default class Product extends Component {
  render() {
    return (
      <div className='product-content'>
        <Outlet />
      </div>
    )
  }
}
