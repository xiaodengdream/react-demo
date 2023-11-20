import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { Card, Select, Input, Button, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import ajax from '../../api/ajax'
export default function ProductHome() {
    const [loading, setLoading] = useState()//加载数据进度条
    const [shopLists, setShopLists] = useState([])//商品列表
    const [messageApi, contextHolder] = message.useMessage();//使用message
    const navigate = useNavigate()//navigate进行页面跳转
    //获取商品列表
    const getShopLists = async () => {
        const param = {
            url: 'http://localhost:1000/commodity',
            type: 'GET',
        }
       /*  setLoading(true) */
        let shopData = await ajax(param)
        if (shopData.data.lists) {
         /*    setTimeout(() => {
                setLoading(false) */
                setShopLists(shopData.data.lists)
          /*   }, 1000); */
        }
    }
    //上架或者下架商品status:1未上架、2上架了
    const grounding = async (data) => {
        if (data.status === 1) {
            data.status = 2
        } else if (data.status === 2) {
            data.status = 1
        }
        const param = {
            url: 'http://localhost:1000/commodity/status',
            type: 'POST',
            data: data
        }
        let statusData = await ajax(param)
        messageApi.open({
            type: 'success',
            content: statusData.data.message,
        });
        if (statusData.data.result) {
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
    }
    //商品详情
    const showDetail = (data) => {
        navigate('/product/detail', { replace: true ,state:{data}})
    }
    useEffect(() => {
        getShopLists()
    }, [])
    //定义card头部功能
    const title = (
        <>
            <Select placeholder="按名称搜索"
                /*  onChange={onChange}
                 onSearch={onSearch} */
                options={[
                    {
                        value: '按名称搜索',
                        label: '按名称搜索',
                    },
                    {
                        value: '按描述搜索',
                        label: '按描述搜索',
                    },
                ]}
            />
            <Input style={{ width: '20%', margin: '10px' }} placeholder="关键字" />
            <Button type='primary'>搜索</Button>
        </>
    )
    const extra = (
        <Button type='primary'>
            <PlusOutlined />添加商品
        </Button>
    )
    //定义表格头部结构
    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            key: 'id',
            width: '25%',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            key: 'id',
            width: '55%'
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'id',
            width: '8%',
            render: (price) => '￥' + price

        },
        {
            title: '状态',
            width: '6%',
            dataIndex: 'status',
            key: 'id',
            render: (_, record) => (
                <Button onClick={() => { grounding(record) }} size='midden' type="primary">{record.status === 1 ? '上架' : '下架'}</Button>
            ),
        },
        {
            title: '操作',
            width: '6%',
            key: 'id',
            render: (_, record) => (
                <Button onClick={()=>showDetail(record)} size='midden' type="link" style={{ color: 'rgb(17,149,121)' }}>详情修改</Button>
            ),
        },

    ];
    return (
        <div className='product-content-home'>
            <Card title={title} extra={extra} className='product-content-card'>
                <Table
                    columns={columns}
                    dataSource={shopLists}
                    bordered='true'
                    rowKey='id'
                    loading={loading}
                    pagination={{ defaultPageSize: 5, defaultCurrent: 1, showQuickJumper: true }}
                />
            </Card>
            {contextHolder}
        </div>
    )
}
