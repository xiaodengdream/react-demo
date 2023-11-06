import store from "store"
/* 用于进行local数据存储管理工具*/
const USER_KEY = 'user_key'
export default {
    //保存user JSON格式对象
    saveUser(user) {
        /* localStorage.setItem(USER_KEY, JSON.stringify(user)) */
        store.set(USER_KEY,user)
    },
    //读取user
    getUser() {
        /* return JSON.parse(localStorage.getItem(USER_KEY) || '{}') */
        return store.get(USER_KEY) || {}
    },
    //删除user
    removeUser() {
       /*  localStorage.removeItem(USER_KEY) */
       store.remove(USER_KEY)
    }
}