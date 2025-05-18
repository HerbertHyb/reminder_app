<template>
  <view style="width: 100%;height: 100%;">
    <view style="display: flex;align-items: center;padding: 50rpx;background-color: #1296db;">
      <view style="float: left;margin-left: 0rpx;margin-right: 80rpx;">
        <u-avatar :src="user.avatar" shape="square" size="120"></u-avatar>
      </view>
      <view style="float: left;font-size: larger;font-weight: bold;">
        <view>
          <text>{{"He Xiaobin"}}</text>
        </view>
        <view style="margin-top: 20px;">
          <text>{{"18857484252"}}</text>
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
    <view style=" position: fixed;bottom: 50rpx;justify-content:center;display: flex;width: 100%;align-items:
          center;height: 80rpx;">
      <view
        style="position: fixed;bottom: 150rpx;justify-content:center;display: flex;width: 100%;align-items: center;height: 80rpx;">
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
          avatar: '/static/avatar.jpg'
        }
      }
    },
    methods: {
      logout() {
        uni.redirectTo({ url: '/pages/login/login' })
      },
      gotofood() {
        uni.redirectTo({ url: '/pages/food/food' })
      }
    },
    onLoad() {
      this.user.username = this.vuex_username
      this.user.phone = this.vuex_phone
      this.user.avatar = '/static/avatar.jpg'
    }
  }
</script>
<style scoped>
</style>