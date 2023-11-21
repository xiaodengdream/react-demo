import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ajax from '../../api/ajax'
import { Card, Button, Form, Input, Cascader, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import './add.less'
import PicturesWall from './picturesWall'
export default function ProductAddUpdate() {
  const navigate = useNavigate()//navigate进行页面跳转
  const localtion = useLocation()//拿到跳转的值
  const [messageApi, contextHolder] = message.useMessage();//使用message
  const [types, setTypes] = useState('')//判断时更新还是新增
  const [category, setCategory] = useState([])//一级分类数据
  const [imgSrc, setImgSrc] = useState('')//上传base64图片
  const { TextArea } = Input//使用TextArea多行文本输入
  //获取一级分类列表
  const getLists = async () => {
    const param = {
      url: 'http://localhost:1000/category',
      type: 'GET',
    }
    let listData = await ajax(param)
    if (listData.data.lists) {
      const option = []
      listData.data.lists.forEach((item) => {
        option.push({ value: item.id, label: item.name, isLeaf: false, })
      })
      setCategory(option)
    }
  }
  //获取二级分类列表
  const show = async (targetOption) => {
    const param = {
      url: 'http://localhost:1000/category/shop',
      type: 'POST',
      data: { categoryID: targetOption.value }
    }
    let listData = await ajax(param)
    if (listData.data.lists) {
      const option = []
      listData.data.lists.forEach((item) => {
        option.push({ value: item.id, label: item.name, })
      })
      setTimeout(() => {
        targetOption.children = option
        setCategory([...category]);
      }, 1000);
    }
  }
  //添加商品
  const addShop = async (data) => {
    const param = {
      url: 'http://localhost:1000/commodity/add',
      type: 'POST',
      data: data
    }
    let listData = await ajax(param)
    if (listData.data) {
      messageApi.open({
        type: 'success',
        content: listData.data.message,
      });
      setTimeout(() => {
        navigate('/product', { replace: true })
      }, 1000);
    }
  }
  //获取表单数据
  const onFinish = (value) => {
    value.src = imgSrc
    value.categoryId = value.option[0]
    value.shopId = value.option[1]
    const { option, ...data } = value
    addShop(data)
  }
  useEffect(() => {
    if (localtion.state.type) {
      setTypes(localtion.state.type)
    }
    getLists()
  }, [localtion.state])
  //select选中的categoryId和shopId
  const onChange = (value, selectedOptions) => {
    /* console.log(value, selectedOptions); */
  };
  //异步加载二级列表
  const loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    show(targetOption)
  };
  //定义Card头部信息
  const title = (
    <>
      <Button onClick={() => navigate('/product', { replace: true })} style={{ color: 'rgb(17,149,121)' }} size='large' type="link"><ArrowLeftOutlined /></Button>
      <span> {types === 'add' ? '添加商品' : '更新商品'}</span>
    </>
  )
  return (
    <div className='add-content'>
      <div className='add-content-home'>
        <Card title={title} className='add-content-card'>
          <Form name="basic" labelCol={{ span: 2 }} wrapperCol={{ span: 8 }} onFinish={onFinish}>
            <Form.Item label='商品名称' name="name">
              <Input placeholder="请输入商品名称" />
            </Form.Item>
            <Form.Item label='商品描述' name="descs">
              <TextArea rows={3} showCount placeholder="输入商品描述" maxLength={30} />
            </Form.Item>
            <Form.Item label='商品价格' name="price">
              <Input suffix="元" placeholder="请输入商品价格" />
            </Form.Item>
            <Form.Item label='商品分类' name="option">
              <Cascader options={category} loadData={loadData} changeOnSelect onChange={onChange} placeholder="请选择商品分类" />
            </Form.Item>
            <Form.Item label='商品图片'>
              <PicturesWall setImgSrc={setImgSrc} imgSrc={imgSrc} />
            </Form.Item>
            <Form.Item label='商品详情' name="detail">
              <TextArea rows={5} showCount placeholder="请输入商品详情" maxLength={50} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
          {contextHolder}
        </Card>
      </div>
    </div>
  )
}
