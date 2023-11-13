import React, { useState, useEffect } from 'react'
import { Card, Button, Table, Space, Modal, Select, Input, Form, message } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import './index.less'
import ajax from '../../api/ajax'
import Upmodal from '../../components/upmodal';
export default function Categrory() {
  const [category, setCategory] = useState([])
  const [shop, setShop] = useState([])
  const [loading, setLoading] = useState()
  const [pid, setPid] = useState(0)
  const [pname, setPname] = useState('')
  //新增分类对话框
  const [form] = Form.useForm();//表单数据
  const [isModalOpen, setIsModalOpen] = useState(false);//对话框状态
  const [options, setOptions] = useState([])//表单展示的数据
  const [upData, setUpData] = useState()//更新的对话框
  const [upshow, setUpshow] = useState(false)
  const handleChange = (value) => {
    /*  console.log(value); */
  };
  //打开对话框
  const showModal = () => {
    setIsModalOpen(true);
    //展示optios
    const option = []
    category.forEach((item) => {
      option.push({ value: item.id, label: item.name, })
      return item
    })
    const options = { value: 0, label: '一级分类管理' }
    setOptions([options, ...option])
  };
  //添加分类 表单数据为form.getFieldsValue()
  const addLists = async () => {
    const postData = form.getFieldsValue()
    if (postData.parentId.value === 0) {
      //一级传参
      var postDatas = {
        name: postData.name,
        parentId: '0'
      }
    } else {
      //二级传参
      postDatas = {
        name: postData.name,
        categoryID: postData.parentId.value,
        parentId: '1'
      }
    }
    const param = {
      url: postDatas.parentId === '0' ?
        'http://localhost:1000/category/add' :
        'http://localhost:1000/category/shop/add',
      type: 'POST',
      data: postDatas
    }
    setLoading(true)
    let addData = await ajax(param)
    if (addData.data.lists) {
      setTimeout(() => {
        setLoading(false)
        message.success(addData.data.message)
      }, 1000);
    } else {
      message.error(addData.data.message)
    }
  }
  //确定对话框
  const handleOk = () => {
    setIsModalOpen(false);
    addLists()
  };
  //取消对话框
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //获取一级分类列表
  const getLists = async () => {
    const param = {
      url: 'http://localhost:1000/category',
      type: 'GET',
    }
    setLoading(true)
    let listData = await ajax(param)
    if (listData.data.lists) {
      setTimeout(() => {
        setLoading(false)
        setCategory(listData.data.lists)
      }, 1000);
    }
  }
  //获取二级分类列表
  const show = async (data) => {
    const param = {
      url: 'http://localhost:1000/category/shop',
      type: 'POST',
      data: { categoryID: data.id }
    }
    let listData = await ajax(param)
    if (listData.data.lists) {
      setPid(1)
      setPname(data.name)
      setShop(listData.data.lists)
    }
  }
  //修改一级或者二级分类
  const uplists =async (data) => {
    const param = {
      url: data.parentId === '0' ?
        'http://localhost:1000/category/update' :
        'http://localhost:1000/category/shop/update',
      type: 'POST',
      data: data
    }
    setLoading(true)
    let addData =await ajax(param)
    if (addData.data.data) {
      setTimeout(() => {
        setLoading(false)
        message.success(addData.data.message)
      }, 1000);
    } else {
      message.error(addData.data.message)
    }
  }
  const upLists = (upData) => {
    setUpData(upData)
    setUpshow(true)
  }
  //展示一级列表
  function showCatetory() {
    setPid(0)
    setPname('')
  }

  //拿到数据
  useEffect(() => {
    getLists()
  }, [])

  //定义一级分类列表title
  const title = pid === 0 ?
    <Button onClick={showCatetory} style={{ color: 'rgb(17,149,121)' }} size='large' type="link">一级分类列表</Button> :
    (<>
      <Button onClick={showCatetory} style={{ color: 'rgb(17,149,121)' }} size='large' type="link">一级分类列表</Button>
      <ArrowRightOutlined />
      <span>{pname}</span>
    </>)
  const extra = (
    <Button onClick={showModal} type='primary'>
      <PlusOutlined />添加
    </Button>
  )
  //定义title
  //定义table-header
  const columns = [
    {
      title: '分类列表',
      dataIndex: 'name',
      key: 'id',
    },
    {
      title: '操作',
      width: '25%',
      key: 'id',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => { return upLists(record) }} style={{ color: 'rgb(17,149,121)' }} size='midden' type="link"> 修改分类</Button>
          <Button disabled={pid === 1} onClick={() => { return show(record) }} style={{ color: 'rgb(17,149,121)' }} size='midden' type="link">查看子分类</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className='category-content'>
      <div className='category-content-home'>
        <Card className='category-content-card' title={title} extra={pid === 0 ? extra : ''} >
          <Table
            columns={columns}
            dataSource={pid === 0 ? category : shop}
            bordered='true'
            rowKey='id'
            loading={loading}
            pagination={{ defaultPageSize: 5, defaultCurrent: 1, showQuickJumper: true }}
          />
        </Card>
        <Modal title="添加分类" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='category-content-model'>
          <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 30 }} form={form}>
            <Form.Item> <span>所属分类：</span></Form.Item>
            <Form.Item label='' name="parentId">
              <Select onChange={handleChange} options={options} labelInValue />
            </Form.Item>
            <Form.Item><span>分类名称：</span></Form.Item>
            <Form.Item label='' name="name">
              <Input placeholder="请输入分类名称" />
            </Form.Item>
          </Form>
        </Modal>
        <Upmodal upData={upData} uplists={uplists} upshow={upshow} setUpshow={setUpshow} />
      </div>
    </div>
  )
}
