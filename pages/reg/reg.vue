<template>
  <view>
    <u-toast ref="uToast"></u-toast>
    <u-popup :show="load" mode="center" :round="10" :duration="100" :closeOnClickOverlay="false"
      customStyle="width:50%;height:20%">
      <view style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;">
        <u-loading-icon mode="semicircle" text="Registering, please wait"></u-loading-icon>
      </view>
    </u-popup>
    <view style="text-align: center;font-size: 50rpx;padding: 50rpx 0rpx 50rpx 0rpx"> Register </view>
    <view style="margin: 20rpx 20rpx 20rpx 20rpx;">
      <view style="margin-bottom: 20rpx;">
        <u-row>
          <u-col span="2">
            <text class="label">Email</text>
          </u-col>
          <u-col span="10">
            <view class="input">
              <input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
                placeholder="Please enter email" placeholder-style="color:rgb(200,200,200)" v-model="registerForm.email"
                type="email" />
            </view>
          </u-col>
        </u-row>
      </view>
      <view style="margin-bottom: 20rpx;">
        <u-row>
          <u-col span="2">
            <text class="label">Password</text>
          </u-col>
          <u-col span="10">
            <view class="input">
              <input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
                placeholder="Please enter password" placeholder-style="color:rgb(200,200,200)"
                v-model="registerForm.password" type="password" />
            </view>
          </u-col>
        </u-row>
      </view>
      <view style="margin-bottom: 20rpx;">
        <u-row>
          <u-col span="2">
            <text class="label">Confirm Password</text>
          </u-col>
          <u-col span="10">
            <view class="input">
              <input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
                placeholder="Please confirm password" placeholder-style="color:rgb(200,200,200)"
                v-model="registerForm.confirmPassword" type="password" />
            </view>
          </u-col>
        </u-row>
      </view>
      <view style="margin-bottom: 20rpx;">
        <u-row>
          <u-col span="2">
            <text class="label">Phone</text>
          </u-col>
          <u-col span="10">
            <view class="input">
              <input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
                placeholder="Please enter phone number" placeholder-style="color:rgb(200,200,200)"
                v-model="registerForm.phone" type="tel" />
            </view>
          </u-col>
        </u-row>
      </view>
      <view class="button">
        <u-button type="success" text="Register" @click="register()"></u-button>
      </view>
      <view class="button">
        <u-button type="primary" text="Back to Login" @click="backToLogin()"></u-button>
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
  import { registerByEmail } from '../../config/api.js'
  export default {
    data() {
      return {
        load: false,
        registerForm: {
          email: '',
          password: '',
          confirmPassword: '',
          phone: ''
        },
        ack: false
      }
    },
    methods: {
      acknowledge(val) {
        this.ack = val.length === 1
      },
      backToLogin() {
        uni.navigateBack()
      },
      async register() {
        if (this.ack === false) {
          this.$refs.uToast.show({ message: 'Please read and agree to the policy first' })
          return
        }
        if (this.registerForm.password !== this.registerForm.confirmPassword) {
          this.$refs.uToast.show({ message: 'Passwords do not match' })
          return
        }
        this.load = true
        try {
          console.log(this.registerForm)
          const res = await registerByEmail(this.registerForm)
          this.$refs.uToast.show({ message: 'Register successful' })
          uni.navigateTo({ url: '/pages/login/login' })
        } catch (error) {
          this.$refs.uToast.show({ message: 'Register failed, please try again' })
        } finally {
          this.load = false
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

  .input {
    padding: 0rpx 10rpx 0rpx 10rpx;
  }

  .button {
    margin-bottom: 20rpx;
    padding: 0rpx 10rpx 0rpx 10rpx;
  }
</style>