import store from "store"
/* 用于进行local数据存储管理工具*/
const USER_KEY = 'user_key';//设置用户key
const TOKEN_KEY = 'token_key'//设置token的key
const storageUtils = {
    //保存user JSON格式对象
    saveUser(user) {
        store.set(USER_KEY, user)
    },
    //读取user
    getUser() {
        return store.get(USER_KEY) || {}
    },
    //删除user
    removeUser() {
        store.remove(USER_KEY)
    },
    //保存token
    setToken(token) {
        return store.set(TOKEN_KEY, token)
    },
    //拿到token
    getToken() {
        return store.get(TOKEN_KEY)
    },
    //删除token
    removeToken() {
        return store.remove(TOKEN_KEY)
    }
}
export default storageUtils