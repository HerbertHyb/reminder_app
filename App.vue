<style lang="scss">
  /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
  @import "@/uni_modules/uview-ui/index.scss";
</style>
<script>
  export default {
    onLaunch: function() {
      this.$u.http.get('/auth/info', {}, {}).then(res => {
        this.$u.vuex('vuex_username', res.data.user.username)
        this.$u.vuex('vuex_phone', res.data.user.phone)
        uni.redirectTo({
          url: '/pages/fridge/fridge',
          // url: '/pages/login/login'
        })
      }).catch(error => {
        uni.redirectTo({
          url: '/pages/login/login'
        })
      })
      // uni.redirectTo({ url: '/pages/login/login' })
      // uni.redirectTo({ url: '/pages/fridge/fridge' })
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>
<style>
  /*每个页面公共css */
</style>