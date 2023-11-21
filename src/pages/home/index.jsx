import React from 'react'
import './index.less'
export default function Home() {
  return (
    <div className='content1'>
      <div className='content1-home'>
        <div className='content1-div'>
          <h3>羚羊“营销+运营”平台</h3>
          <p> 所用技术：React、Hook、React Router、Ant Design、 Axios、Less</p>

          <p> 项目介绍：该项目主要是为跨境电商企业及商家提供从开户入驻、产品上架、订单管理跨境电商业务</p>

          <p> 项目职责：主要基础框架目录搭建及项目中各核心模块的开发及维护(如产品市场及订单管理、店铺运营等)</p>

          <p>项目亮点：</p>

          <p className='text'>1、基于react18、react-router-dom6、Ant Design5最新版本实现 </p>

          <p className='text'>2、对树形控件进行二次封装,表单表格进行组件复用实现前端性能提升 </p>

          <p className='text'>3、用jsonp和proxy处理跨域问题实现接口的正常调用 </p>

          <p className='text'>4、在webpack配置Less，使项目中编写样式更加方便简洁 </p>

        </div>
      </div>
    </div>
  )
}
