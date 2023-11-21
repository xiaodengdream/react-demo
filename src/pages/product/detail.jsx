import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './detail.less'
import { Card, Button, Image } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import ajax from '../../api/ajax'
import defaultImg from '../../assets/bbk.png'
export default function ProductDetail() {
  const [detail, setDetail] = useState('')//详情页面数据
  const [categoryName, setCategoryName] = useState('')//一级分类对应名字
  const [shopName, setShopName] = useState('')//二级分类对应名字
  const navigate = useNavigate()//navigate进行页面跳转
  const localtion = useLocation()//拿到跳转的值
  //根据id拿到一级分类二级分类接口的名字
  const getListName = async (data) => {
    const { shopId, categoryId } = data
    const param1 = {
      url: 'http://localhost:1000/category/name',
      type: 'POST',
      data: { categoryId }
    }
    const param2 = {
      url: 'http://localhost:1000/shop/name',
      type: 'POST',
      data: { shopId }
    }
    const results = await Promise.all([ajax(param1), ajax(param2)])
    if (results) {
      setCategoryName(results[0].data.lists[0].name)
      setShopName(results[1].data.lists[0].name)
    }
  }
  //渲染组件
  useEffect(() => {
    if (localtion.state.data) {
      setDetail(localtion.state.data)
      getListName(localtion.state.data)
    }
  }, [localtion.state.data])
  //定义Card头部信息
  const title = (
    <>
      <Button onClick={() => navigate('/product', { replace: true })} style={{ color: 'rgb(17,149,121)' }} size='large' type="link"><ArrowLeftOutlined /></Button>
      <span>商品详情</span>
    </>
  )
  return (
    <div className='detail-content'>
      <div className='detail-content-home'>
        <Card title={title} className='detail-content-card'>
          <div className='detail-content-box'>
            <span><p style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>商品名称 ：</p>{detail.name}</span>
            <span><p style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>商品描述：</p>{detail.descs}</span>
            <span><p style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>商品价格：</p>{detail.price}</span>
            <span><p style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>所属分类：</p>{categoryName}---{shopName}</span>
            <span style={{ height: 120, fontWeight: 'bold' }}>
              商品照片：
              <Image
                width={120}
                src={detail.src ? detail.src : defaultImg}
              />
            </span>
            <span><p style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>商品详情：</p>{detail.detail}</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
