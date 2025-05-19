<template>
  <view style="width: 100%;height: 100%;">
    <view style="display: flex;align-items: center;padding: 50rpx;background-color: #1296db;">
      <view style="float: left;margin-left: 0rpx;margin-right: 80rpx;">
        <u-avatar :src="user.avatar" shape="square" size="120"></u-avatar>
      </view>
      <view style="float: left;font-size: larger;font-weight: bold;">
        <view>
          <text>{{user.username}}</text>
        </view>
        <view style="margin-top: 20px;">
          <text>{{user.phone}}</text>
        </view>
      </view>
    </view>
    <scroll-view :scroll-y="true">
      <u-cell-group>
        <u-cell icon="setting" title="Personal Settings" :isLink="true"></u-cell>
        <u-cell icon="lock" title="Change Password" :isLink="true"></u-cell>
        <u-cell icon="phone" title="Bind Mobile" :isLink="true"></u-cell>
        <u-cell icon="email" title="Bind Email" :isLink="true"></u-cell>
        <u-cell icon="order" title="Food Management" :isLink="true" @click="gotofood()"></u-cell>
      </u-cell-group>
    </scroll-view>
    <!-- #ifndef H5 -->
    <view
      style="position: fixed;bottom: 10rpx;justify-content:center;display: flex;width: 100%;align-items: center;height: 80rpx;">
    <!-- #endif -->
      <!-- #ifdef H5 -->
      <view
        style="position: fixed;bottom: 110rpx;justify-content:center;display: flex;width: 100%;align-items: center;height: 80rpx;">
      <!-- #endif -->
        <view style="margin: 0px auto;width: 90%;">
          <u-button @click="logout()" type="error" text="Log Out">
          </u-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import {
    imgServer,
    getInfo
  } from '../../config/api.js'
  export default {
    data() {
      return {
        user: {
          username: 'Xiaoming',
          phone: '15683141454',
          avatar: '/static/herbert.png'
        }
      }
    },
    methods: {
      logout() {
        this.$u.vuex('vuex_token', '')
        uni.redirectTo({ url: '/pages/login/login' })
      },
      gotofood() {
        uni.switchTab({ url: '/pages/fridge/fridge' })
      }
    },
    onLoad() {
      console.log(this.vuex_username)
      console.log(this.vuex_phone)
      this.user.username = this.vuex_username
      this.user.phone = this.vuex_phone
      this.user.avatar = '/static/herbert.png'
    }
  }
</script>
<style scoped>
</style>