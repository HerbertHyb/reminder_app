<template>
  <view>
    <!-- Edit popup starts -->
    <u-popup :show="show" mode="center" :round="10" @close="close" @open="open" :duration="100"
      :closeOnClickOverlay="false" customStyle="width: 80%; height: 50%" :closeable="true">
      <view style="width: 100%; height: 100%; position: relative; padding: 20rpx; box-sizing: border-box;">
        <view style="width: 100%; margin-top: 40rpx; display: flex; align-items: center;">
          <view style="margin-right: 20rpx;">
            <u-avatar :src="form.img" shape="square" size="120" mode="aspectFill"></u-avatar>
          </view>
          <view style="flex: 1;">
            <view style="display: flex; align-items: center; margin-bottom: 10rpx;">
              <view style="font-size: larger; margin-right: 10rpx;">
                {{ form.name }}
              </view>
              <view style="font-size: medium;">
                {{ form.category }}
              </view>
            </view>
            <view>
              <u--text :text="'Introduction: ' + form.info" :lines="4"></u--text>
            </view>
          </view>
        </view>
        <view style="width: 100%; margin-top: 40rpx;">
          <u--form labelPosition="left" :model="form" labelWidth="150rpx">
            <u-form-item label="Quantity" prop="form.quantity" borderBottom>
              <!-- #ifndef APP-NVUE -->
              <u-input placeholder="Please enter quantity" border="none" v-model="form.quantity">
                <template slot="suffix">
                  <view style="margin-right: 10rpx;">
                    {{ form.unit }}
                  </view>
                </template>
              </u-input>
              <!-- #endif -->
              <!-- #ifdef APP-NVUE -->
              <u--input placeholder="Please enter quantity" border="none" v-model="form.quantity">
                <template slot="suffix">
                  <view style="margin-right: 10rpx;">
                    {{ form.unit }}
                  </view>
                </template>
              </u--input>
              <!-- #endif -->
            </u-form-item>
          </u--form>
        </view>
        <view
          style="position: absolute;bottom: 30rpx;justify-content:center;display: flex;width: 100%;align-items: center;height: 80rpx;">
          <view>
            <view style="float: center;">
              <u-button type="success" @click="handleUpdate()" text="Update"></u-button>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
    <!-- Edit popup ends -->
    <view>
      <view v-if="foods!==undefined && foods!==null && foods.length>0">
        <!-- Food card list -->
        <view v-for="item in foods"
          style="border-radius: 10px;border: 2rpx solid #eaeaea;margin: 10rpx;padding: 10rpx;align-items: center;width:100%">
          <u-swipe-action>
            <u-swipe-action-item :options="options1" style="width: 100%;" @click="delete_food(item.foodId)">
              <view>
                <view style="float: left;clear: both;">
                  <u-avatar :src="images[item.img]" shape="square" size="80" mode="aspectFill"></u-avatar>
                </view>
                <view style="float: left;margin-left: 20rpx;">
                  <view style="font-size: larger;">{{item.name}}</view>
                  <u--text :text="'Quantity: '+item.quantity+' '+item.unit"></u--text>
                </view>
                <view style="float: left;position: absolute;right: 40rpx;">
                  <u-button type="warning" text="Edit" size="small" @click="open(item)"></u-button>
                </view>
              </view>
            </u-swipe-action-item>
          </u-swipe-action>
        </view>
        <view style="height: 90rpx;">
        </view>
        <view
          style="position: fixed;bottom: 110rpx;justify-content:center;display: flex;width: 100%;align-items: center;height: 80rpx;">
          <view style="margin: 0px auto;width: 90%;">
            <u-button @click="add()" type="primary" text="Add new food">
            </u-button>
          </view>
        </view>
      </view>
      <view style="margin-top: 100rpx;" v-else>
        <u-empty mode="list" text="No food yet~">
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
          <!--          <view style="margin: 0px auto;width: 90%;">
            <u-button @click="add()" type="primary" text="Add food to fridge">
            </u-button>
          </view> -->
        </view>
      </view>
    </view>
</template>
<script>
  import {
    AllfoodInfo,
    handleDelete,
    handleUpdate,
    Addfood
  } from '../../config/api.js'
  export default {
    data() {
      return {
        options1: [{
          text: 'consume all'
        }],
        show: false,
        // foods: [],
        images: ['/static/banana.png', '/static/meat.png', '/static/celery.png', '/static/milk.png',
          '/static/pizza.png', 'tomato.png'
        ],
        foods: [{
          foodId: '',
          img: 0,
          name: 'Banana',
          quantity: '3',
          unit: 'pcs',
          info: 'Big banana, big banana, this feeling is really wonderful~',
          category: 'Fruit'
        }, {
          img: 1,
          name: 'meat',
          quantity: '3',
          unit: 'kilogram',
          info: 'fresh pork~',
          category: 'Meat'
        }, {
          img: 2,
          name: 'celery',
          quantity: '3',
          unit: 'tie',
          info: 'my favorite vegetable~',
          category: 'Vegetable'
        }, {
          img: 3,
          name: 'milk',
          quantity: '2',
          unit: 'liter',
          info: 'very pure~',
          category: 'Drink'
        }],
        current: 0,
        form: {},
      }
    },
    methods: {
      assume(name) {
        console.log(name)
      },
      open(item) {
        // console.log('open');
        this.show = true
        this.form.foodId = item.id
        this.form.userId = item.user_id
        this.form.name = item.name
        this.form.info = item.info
        this.form.unit = item.unit
        this.form.category = item.category
        this.form.img = item.img
        this.form.quantity = item.quantity
      },
      close() {
        this.show = false
        // console.log('close');
      },
      handleUpdate() {
        handleUpdate(this.form).then(res => {
          console.log(res)
          this.show = false
          getfood()
        })
      },
      delete_food(foodId) {
        handleDelete(foodId).then(res => {
          console.log(res)
          this.show = false
          getfood()
        })
      },
      add() {
        uni.navigateTo({
          url: '/pages/addNewFood/addNewFood'
        })
      },
      async getfood() {
        console.log("ggggg")
        // AllfoodInfo().then(res => {
        //   // 取出 data.food 数组
        //   console.log(res)
        //   this.foods = res.data.food
        // }).catch(err => {
        //   console.log(res)
        //   console.error('getfood 调用失败：', err)
        // })
        // AllfoodInfo().then(res => {
        //   console.log(res)
        //   this.foods = res.data
        // })
      }
    },
    computed: {},
    onLoad() {
      this.getfood()
    },
    onPullDownRefresh() {
      this.getfood()
      uni.stopPullDownRefresh()
    }
  }
</script>
<style lang="scss">
</style>