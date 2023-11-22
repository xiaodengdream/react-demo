//能发送异步ajax请求的函数模块
//封装axios库，集中处理异常，函数返回promise
import service from "../service";
import { message } from "antd";
export default function ajax(axiosData) {
    const { url, type, data } = axiosData
    return new Promise((resolve, reject) => {
        let promise
        if (type === 'GET') {
            promise = service.get(url, { params: data })
        } else if (type === 'POST') {
            promise = service.post(url, data)
        }
        promise.then((data) => {
            resolve(data)
        }).catch((error) => {
            message.error(error)
        })
    })
}