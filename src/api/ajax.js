//能发送异步ajax请求的函数模块
//封装axios库，函数返回promise
import axios from "axios";
import { message } from "antd";
export default function ajax(axiosData) {
    const { url, type, data } = axiosData
    return new Promise((resolve, reject) => {
        let promise
        if (type === 'GET') {
            promise = axios.get(url, { params: data })
        } else {
            promise = axios.post(url, data)
        }
        promise.then((data) => {
            resolve(data)
        }).catch((error) => {
            message.error(error)
        })
    })

}