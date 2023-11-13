import React, { useState } from 'react'
import { Card, Select, Input, Button, Table, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
export default function ProductHome() {
    const [loading, setLoading] = useState()
    const title = (
        <>
            <Select placeholder="按名称搜索"
                /*  onChange={onChange}
                 onSearch={onSearch} */
                options={[
                    {
                        value: 'jack',
                        label: 'Jack',
                    },
                    {
                        value: 'lucy',
                        label: 'Lucy',
                    },
                    {
                        value: 'tom',
                        label: 'Tom',
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
    const dataSource = [
        {
            key: '1',
            name: 'ThinkPad X1 Carbon ',
            price: 8700,
            detail: '英特尔Evo平台认证酷睿i7-1360P vPro'
        },
        {
            key: '2',
            name: '扬天 V14 2023 锐龙版商用笔记本',
            price: 8700,
            detail: '家庭中文版/16GB LPDDR5/1TB SSD/锐钜Xe显卡/14英寸2.2K 广视角LED',
        },
        {
            key: '3',
            name: '扬天 V15 2023 锐龙版商用笔记本',
            price: '$8600',
            detail: '家庭中文版/16GB LPDDR5/1TB SSD/锐钜Xe显卡/14英寸2.2K 广视角LED',
        },
        {
            key: '4',
            name: '扬天 V16 2023 锐龙版商用笔记本',
            price: 6700,
            detail: '家庭中文版/16GB LPDDR5/1TB SSD/锐钜Xe显卡/14英寸2.2K 广视角LED',
        },
        {
            key: '5',
            name: '联想拯救者Y7000P2023 英特尔酷睿i7',
            price: '$7500',
            detail: '家庭中文版/16GB LPDDR5/1TB SSD/锐钜Xe显卡/14英寸2.2K 广视角LED',
        },
        {
            key: '6',
            name: '联想拯救者r7000P2023 英特尔酷睿i7',
            price: 9850,
            detail: '家庭中文版/16GB LPDDR5/1TB SSD/锐钜Xe显卡/14英寸2.2K 广视角LED',
        }, {
            key: '7',
            name: '胡彦祖',
            price: 42,
            detail: '家庭中文版/16GB LPDDR5/1TB SSD/锐钜Xe显卡/14英寸2.2K 广视角LED',
        }, {
            key: '8',
            name: '胡彦祖',
            price: 42,
            detail: '家庭中文版/16GB LPDDR5/1TB SSD/锐钜Xe显卡/14英寸2.2K 广视角LED',
        }, {
            key: '9',
            name: '胡彦祖',
            price: 42,
            detail: '家庭中文版/16GB LPDDR5/1TB SSD/锐钜Xe显卡/14英寸2.2K 广视角LED',
        }, {
            key: '10',
            name: '胡彦祖',
            price: 42,
            detail: '家庭中文版/16GB LPDDR5/1TB SSD/锐钜Xe显卡/14英寸2.2K 广视角LED',
        }, {
            key: '11',
            name: '胡彦祖',
            price: 42,
            detail: '家庭中文版/16GB LPDDR5/1TB SSD/锐钜Xe显卡/14英寸2.2K 广视角LED',
        }, {
            key: '12',
            name: '胡彦祖',
            price: 42,
            detail: '家庭中文版/16GB LPDDR5/1TB SSD/锐钜Xe显卡/14英寸2.2K 广视角LED',
        }, {
            key: '13',
            name: '胡彦祖',
            price: 42,
            detail: '家庭中文版/16GB LPDDR5/1TB SSD/锐钜Xe显卡/14英寸2.2K 广视角LED',
        }, {
            key: '14',
            name: '胡彦祖',
            price: 42,
            detail: '家庭中文版/16GB LPDDR5/1TB SSD/锐钜Xe显卡/14英寸2.2K 广视角LED',
        }, {
            key: '15',
            name: '胡彦祖',
            price: 42,
            detail: '家庭中文版/16GB LPDDR5/1TB SSD/锐钜Xe显卡/14英寸2.2K 广视角LED',
        }, {
            key: '16',
            name: '胡彦祖',
            price: 42,
            detail: '家庭中文版/16GB LPDDR5/1TB SSD/锐钜Xe显卡/14英寸2.2K 广视角LED',
        },

    ];

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
        },
        {
            title: '商品描述',
            dataIndex: 'detail',
            key: 'detail',
        },
        {
            title: '价格',
            dataIndex: 'price',
            width: '8%',
            key: 'price',
            render: (price) => '￥' + price

        },
        {
            title: '状态',
            width: '6%',
            dataIndex: 'status',
            key: 'id',
            render: (_, record) => (
                <Button size='midden' type="primary">下架</Button>
            ),
        },
        {
            title: '操作',
            width: '6%',
            key: 'id',
            render: (_, record) => (
                <Button size='midden' type="link" style={{ color: 'rgb(17,149,121)' }}>详情修改</Button>
            ),
        },

    ];

    return (
        <div className='product-content-home'>
            <Card title={title} extra={extra}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    bordered='true'
                    rowKey='key'
                    loading={loading}
                    pagination={{ defaultPageSize: 6, defaultCurrent: 1, showQuickJumper: true }}
                />
            </Card>
        </div>

    )
}
