<template>
  <view>
    <u-toast ref="uToast"></u-toast>
    <u-popup :show="load" mode="center" :round="10" :duration="100" :closeOnClickOverlay="false"
      customStyle="width:50%;height:20%">
      <view style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;">
        <u-loading-icon mode="semicircle" text="Logging in, please wait"></u-loading-icon>
      </view>
    </u-popup>
    <view style="text-align: center;font-size: 50rpx;padding: 50rpx 0rpx 50rpx 0rpx"> Login </view>
    <u-sticky bgColor="#fff" style="margin-bottom: 60rpx;">
      <u-tabs :list="methods" @change="change"></u-tabs>
    </u-sticky>
    <view style="margin: 20rpx 20rpx 20rpx 20rpx;">
      <view style="margin-bottom: 20rpx;">
        <u-row>
          <u-col span="2">
            <text class="label">Phone</text>
          </u-col>
          <u-col span="10">
            <view class="input">
              <input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
                placeholder="Please enter phone number" placeholder-style="color:rgb(200,200,200)"
                v-model="loginForm.phone" />
            </view>
          </u-col>
        </u-row>
      </view>
      <view style="margin-bottom: 100rpx;" v-if="loginMethod===1">
        <u-row>
          <u-col span="2">
            <text class="label">Code</text>
          </u-col>
          <u-col span="10">
            <view class="input">
              <input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
                placeholder="Please enter verification code" placeholder-style="color:rgb(200,200,200)"
                v-model="loginForm.code" />
            </view>
          </u-col>
        </u-row>
      </view>
      <view style="margin-bottom: 100rpx;" v-else>
        <u-row>
          <u-col span="2">
            <text class="label_text">Password</text>
          </u-col>
          <u-col span="10">
            <view class="input">
              <input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
                placeholder="Please enter password" placeholder-style="color:rgb(200,200,200)"
                v-model="loginForm.password" type="password" />
            </view>
          </u-col>
        </u-row>
      </view>
      <view class="button" v-if="loginMethod===1">
        <u-code ref="uCode" @change="codeChange" seconds="20" startText="Send Codes" endText="Retrieve"
          changeText="X seconds to resend"></u-code>
        <u-button @tap="getCode" :text="tips" type="success"></u-button>
      </view>
      <view class="button" v-else>
        <u-button type="success" text="Login" @click="login()"></u-button>
      </view>
      <view class="button" v-if="loginMethod===1">
        <u-button type="primary" text="Register"></u-button>
      </view>
      <view class="button" v-if="loginMethod===1">
        <u-button type="primary" text="Login" @click="login_straight()"></u-button>
      </view>
    </view>
    <view style="display: flex;align-items: center;position: fixed;bottom: 80rpx;justify-content: center;width: 100%;">
      <view style="float: left;">
        <u-checkbox-group placement="column" @change="acknowledge">
          <u-checkbox shape="circle" label="I have read and agree "></u-checkbox>
        </u-checkbox-group>
      </view>
      <view style="display: flex;align-items: center;float: left;">
        <u--text style="float: left;" mode="link" text="User Privacy Policy" href="https://www.uviewui.com"></u--text>
      </view>
    </view>
  </view>
</template>
<script>
  import {
    loginByPassword,
    loginByCode,
    getInfo
  } from '../../config/api.js'
  export default {
    data() {
      return {
        load: false,
        tips: '',
        value: '',
        confirm: '',
        loginForm: {
          phone: '18857484252',
          password: '123456',
          code: ''
        },
        ack: false,
        methods: [{
          name: 'Code Login',
          id: 1
        }, {
          name: 'Password Login',
          id: 2
        }],
        loginMethod: 1
      }
    },
    watch: {
      value(newValue, oldValue) {
        // console.log('v-model', newValue);
      }
    },
    methods: {
      codeChange(text) {
        this.tips = text
      },
      getCode() {
        if (this.$refs.uCode.canGetCode) {
          uni.showLoading({ title: 'Getting verification code...' })
          setTimeout(() => {
            uni.hideLoading()
            uni.$u.toast('Verification code sent')
            this.$refs.uCode.start()
          }, 2000)
        } else {
          uni.$u.toast('You clicked too fast, please slow down~')
        }
      },
      change(index, item) {
        console.log(index)
        this.loginMethod = index.id
      },
      acknowledge(val) {
        this.ack = val.length === 1
      },
      finish() {
        console.log('Verification code input complete!')
      },
      login_straight() {
        uni.redirectTo({ url: '/pages/fridge/fridge' })
      },
      async login() {
        if (this.ack === false) {
          this.$refs.uToast.show({ message: 'Please read and agree to the policy first' })
          return
        }
        this.load = true
        switch (this.loginMethod) {
          case 1: {
            console.log(loginByPassword)
            const res = await loginByCode(this.loginForm)
            console.log(res.data.token)
            this.$u.vuex('vuex_token', res.data.token)
            console.log(this.vuex_token)
            // getInfo().then(res => {
            //   console.log(res)
            //   this.$u.vuex('vuex_username', res.data.username)
            //   this.$u.vuex('vuex_avatar', res.data.avatar)
            //   this.$u.vuex('vuex_gender', res.data.gender)
            //   this.$u.vuex('vuex_phone', res.data.phone)
            //   uni.redirectTo({ url: '/pages/my/my' })
            // }).catch(error => {
            //   uni.$u.toast('Login expired, please log in again~')
            // })
            uni.switchTab({ url: '/pages/fridge/fridge' })
            break
          }
          case 2: {
            console.log(loginByPassword)
            // const res = await loginByPassword(this.loginForm)
            // console.log(res.data.token)
            // this.$u.vuex('vuex_token', res.data.token)
            // console.log(this.vuex_token)
            // getInfo().then(res => {
            //   console.log(res)
            //   this.$u.vuex('vuex_username', res.data.username)
            //   this.$u.vuex('vuex_avatar', res.data.avatar)
            //   this.$u.vuex('vuex_gender', res.data.gender)
            //   this.$u.vuex('vuex_phone', res.data.phone)
            //   uni.redirectTo({
            //     url: '/pages/my/my'
            //   })
            // }).catch(error => {
            //   uni.$u.toast('Login expired, please log in again~')
            //   uni.redirectTo({
            //     url: '/pages/login/login'
            //   })
            // })
            this.load = false
            uni.switchTab({ url: '/pages/fridge/fridge' })
            break
          }
          default:
            uni.$u.toast('System error, please contact administrator~')
        }
      }
    }
  }
</script>
<style scoped>
  .label {
    text-align: justify;
    text-align-last: justify;
    padding: 0rpx 10rpx 0rpx 10rpx;
  }

  .label_text {
    text-align: justify;
    text-align-last: justify;
    font-size: 12px;
    padding: 0rpx 10rpx 0rpx 10rpx;
  }

  .input {
    padding: 0rpx 10rpx 0rpx 10rpx;
  }

  .button {
    margin-bottom: 20rpx;
    padding: 0rpx 10rpx 0rpx 10rpx;
  }
</style>