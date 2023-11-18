import React, { useEffect, useState } from 'react'
import { Tree } from 'antd';
const treeData = [
    {
        title: '平台权限',
        key: '0',
        children: [
            { title: '首页', key: '/home' },
            {
                title: '商品', key: '0-1',
                children: [
                    { title: (<span>品类管理</span>), key: '/category' },
                    { title: (<span>商品管理</span>), key: '/product/home' },
                ],
            },
            { title: '用户管理', key: '/user' },
            { title: '角色管理', key: '/role' },
            {
                title: '图形图标', key: '0-4',
                children: [
                    { title: (<span>柱形图</span>), key: '/bar' },
                    { title: (<span>折线图</span>), key: '/line' },
                    { title: (<span>饼图</span>), key: '/pie' },
                ],
            },
        ],
    },
];
export default function SetForm(props) {
    const [checkedKeys, setCheckedKeys] = useState([]);//menus菜单
    //props.rowRoleInfo.menus变化时显示不同的menus
    useEffect(()=>{
        if(props.rowRoleInfo.menus){
            setCheckedKeys(props.rowRoleInfo.menus.split(','))
        }else{
            setCheckedKeys([])
        }
    },[props.rowRoleInfo.menus])
    const onCheck = (checkedKeys, info) => {
           setCheckedKeys(checkedKeys);
      /*   console.log(checkedKeys); */
        props.setSetInfo(checkedKeys.toString())
    };
    return (
        <Tree
            checkable
            defaultExpandAll
            checkStrictl
            checkedKeys={checkedKeys ? checkedKeys : []}
            onCheck={onCheck}
            treeData={treeData}
        />
    );
};
