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
          <u-col span="2.5">
            <text class="label">Phone</text>
          </u-col>
          <u-col span="9.5">
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
          <u-col span="2.5">
            <text class="label">Code</text>
          </u-col>
          <u-col span="9.5">
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
          <u-col span="2.5">
            <!-- <text class="label_text">Password</text> -->
            <text class="label">Password</text>
          </u-col>
          <u-col span="9.5">
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
      <view class="button">
        <u-button type="primary" text="Register" @click="register()"></u-button>
      </view>
      <view class="button" v-if="loginMethod===1">
        <u-button type="primary" text="Login" @click="login()"></u-button>
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
          // phone: '36706265698',
          // password: '123456',
          // phone: '123',
          // password: '123',
          phone: '',
          password: '',
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
      register() {
        // console.log('reg')
        uni.navigateTo({ url: '/pages/reg/reg' })
      },
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
        // console.log(index)
        this.loginMethod = index.id
      },
      acknowledge(val) {
        this.ack = val.length === 1
      },
      finish() {
        console.log('Verification code input complete!')
      },
      async login() {
        if (this.ack === false) {
          this.$refs.uToast.show({ message: 'Please read and agree to the policy first' })
          return
        }
        this.load = true
        switch (this.loginMethod) {
          case 1: {
            this.loginForm.phone = '123'
            this.loginForm.password = '123'
            this.load = false
            const res = await loginByPassword(this.loginForm)
            this.$u.vuex('vuex_token', res.data.token)
            this.$u.vuex('vuex_username', res.data.user.username)
            this.$u.vuex('vuex_phone', res.data.user.phone)
            uni.switchTab({ url: '/pages/fridge/fridge' })
            break
          }
          case 2: {
            this.load = false
            const res = await loginByPassword(this.loginForm)
            this.$u.vuex('vuex_token', res.data.token)
            this.$u.vuex('vuex_username', res.data.user.username)
            this.$u.vuex('vuex_phone', res.data.user.phone)
            uni.switchTab({ url: '/pages/fridge/fridge' })
            break
          }
          default:
            uni.$u.toast('System error, please contact administrator~')
            this.load = false
        }
        // switch (this.loginMethod) {
        //   case 1: {
        //     this.loginForm.password = '123'
        //     const res = await loginByPassword(this.loginForm)
        //     this.$u.vuex('vuex_token', res.data.token)
        // this.$u.vuex('vuex_username', res.data.user.username)
        // this.$u.vuex('vuex_phone', res.data.user.phone)
        //     uni.switchTab({ url: '/pages/fridge/fridge' })
        //     break
        //   }
        //   case 2: {
        //     console.log('dsad')
        //     const res = await loginByPassword(this.loginForm)
        //     break
        //     // uni.navigateTo({ url: '/pages/fridge/fridge' })
        //     // // const res = await loginByPassword(this.loginForm)
        //     // await loginByPassword(this.loginForm).then(() => {
        //     //   this.load = false
        //     //   this.$u.vuex('vuex_token', res.data.token)
        //     //   this.$u.vuex('vuex_username', res.data.user.username)
        //     //   this.$u.vuex('vuex_phone', res.data.user.phone)
        //     //   uni.showToast({
        //     //     title: 'login successfully',
        //     //     icon: 'success'
        //     //   })
        //     // }).catch(() => {
        //     //   uni.showToast({
        //     //     title: 'login failed',
        //     //     icon: 'none'
        //     //   })
        //     //   this.load = false
        //     // })
        //   }
        //   default:
        //     uni.$u.toast('System error, please contact administrator~')
        // }
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