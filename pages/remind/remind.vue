<template>
  <view>
    <view style="margin-top: 100rpx;">
      <u-empty mode="list" text="还没有提醒呦~">
      </u-empty>
    </view>
    <!-- #ifndef H5 -->
    <view
      style="position: fixed;bottom: 10rpx;justify-content:center;display: flex;width: 100%;align-items: center;height: 80rpx;">
    <!-- #endif -->
      <!-- #ifdef H5 -->
      <view
        style="position: fixed;bottom: 110rpx;justify-content:center;display: flex;width: 100%;align-items: center;height: 80rpx;">
      <!-- #endif -->
        <view style="margin: 0px auto;width: 90%;">
          <u-button @click="add()" type="primary" text="add new reminder">
          </u-button>
        </view>
      </view>
    </view>
</template>
<script>
  import { addReminder } from '../../config/api.js'
  export default {
    data() {
      return {}
    },
    methods: {
      add() {
        console.log('add reminder')
        addReminder().then(res => {
          console.log(res)
        }).catch(err => {
          console.log('add fail', err)
        })
      }
    },
    computed: {},
    onLoad() {},
  }
</script>
<style>
</style>