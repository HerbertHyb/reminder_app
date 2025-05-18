// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = vm => {
  // 初始化请求配置
  uni.$u.http.setConfig(config => {
    /* config 为默认全局配置*/
    // config.baseURL = 'http://fridge.binw.top:8082/user'; /* 根域名 */
    config.baseURL = 'http://lochalhost:8000'
    return config
  })
  // 请求拦截
  uni.$u.http.interceptors.request.use(config => { // 可使用async await 做异步操作
    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
    config.data = config.data || {}
    // 根据custom参数中配置的是否需要token，添加对应的请求头
    config.header.Authorization = vm.vuex_token
    return config
  }, config => { // 可使用async await 做异步操作
    return Promise.reject(config)
  })
  // 响应拦截
  uni.$u.http.interceptors.response.use(response => {
    /* 对响应成功做点什么 可使用async await 做异步操作*/
    const res = response.data
    //状态码为0表示一切正常
    if (res.code !== 0) {
      uni.$u.toast(res.message)
      if (res.code === 23000) {
        uni.redirectTo({ url: '/pages/login/login' })
      }
      return Promise.reject(res)
    }
    return res === undefined ? {} : res
  }, response => {
    // 对响应错误做点什么 （statusCode !== 200）
    return Promise.reject(response)
  })
}