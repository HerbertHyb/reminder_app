<template>
  <view>
    <view style="margin-top: 100rpx;">
      <u-empty mode="list" text="还没有提醒呦~" />
    </view>
    <!-- 原生端：APP-PLUS -->
    <!-- #ifdef APP-PLUS -->
    <view style="position: fixed;
             bottom: 10rpx;
             left: 0;
             width: 100%;
             display: flex;
             justify-content: center;
             align-items: center;
             height: 80rpx;
             z-index: 100;">
      <view style="width: 90%; margin: 0 auto;">
        <u-button @click="add" type="primary" text="add new reminder" />
      </view>
    </view>
    <!-- #endif -->
    <!-- H5端 -->
    <!-- #ifdef H5 -->
    <view style="position: fixed;
             bottom: 110rpx;
             left: 0;
             width: 100%;
             display: flex;
             justify-content: center;
             align-items: center;
             height: 80rpx;
             z-index: 100;">
      <view style="width: 90%; margin: 0 auto;">
        <u-button @click="add" type="primary" text="add new reminder" />
      </view>
    </view>
    <!-- #endif -->
  </view>
</template>
<script>
  import {
    addReminder
  } from '../../config/api.js'
  export default {
    methods: {
      add() {
        console.log('add reminder')
        addReminder().then(res => {
          console.log(res)
        }).catch(err => {
          console.log('add fail', err)
        })
      }
    }
  }
</script>