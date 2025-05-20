<template>
  <view>
    <!-- Edit popup starts -->
    <u-popup :show="show" mode="center" :round="10" @close="close()" :duration="100" :closeOnClickOverlay="true"
      customStyle="width: 90%; height: 75%" :closeable="true">
      <view style="padding: 20rpx; box-sizing: border-box; height: 100%; position: relative;top: 50rpx">
        <u-form labelPosition="left" :model="form" labelWidth="100rpx">
          <!-- Name -->
          <u-form-item label="Name" prop="form.name" borderBottom>
            <u-input v-model="form.name" placeholder="Enter name" border="none" />
          </u-form-item>
          <!-- Category -->
          <u-form-item label="Type" prop="form.category" borderBottom>
            <u-input v-model="form.category" border="none" />
          </u-form-item>
          <!-- Status -->
          <u-form-item label="Status" prop="form.status" borderBottom>
            <u-input v-model="form.status" disabled border="none" />
          </u-form-item>
          <!-- Prod Date -->
          <u-form-item label="Prod Date" prop="form.productionDate" borderBottom>
            <picker mode="date" :value="formatDateForPicker(form.productionDate)" start="2000-01-01" end="2099-12-31"
              @change="onPopupDateChange('productionDate', $event)">
              <view class="picker-field">
                <text>{{ formatDate(form.productionDate) }}</text>
                <u-icon name="calendar" />
              </view>
            </picker>
          </u-form-item>
          <!-- shelfLifeDays -->
          <u-form-item label="shelf life" prop="form.shelfLifeDays" borderBottom>
            <u-input v-model="form.shelfLifeDays" border="none">
              <template slot="suffix">
                <view style="margin-left: 5rpx; color: #999;">days</view>
              </template>
            </u-input>
          </u-form-item>
          <!-- Quantity -->
          <u-form-item label="Num" prop="form.quantity">
            <u-input v-model="form.quantity" type="number" placeholder="Enter qty" border="none">
              <template slot="suffix">
                <view style="margin-right: 0rpx;">{{ form.unit }}</view>
              </template>
            </u-input>
          </u-form-item>
        </u-form>
        <view style="width: 100%; display: flex; justify-content: center; margin-top: 20rpx;">
          <u-button type="success" @click="handleUpdate()" text="Update" />
        </view>
      </view>
    </u-popup>
    <!-- Edit popup ends -->
    <view>
      <view v-if="foods!==undefined && foods!==null && foods.length>0">
        <!-- Food card list -->
        <view v-for="item in foods"
          style="border-radius: 10px;border: 2rpx solid #eaeaea;margin: 10rpx;padding: 10rpx;align-items: center;width:100%">
          <u-swipe-action :ref="`swipe${item.id}`">
            <u-swipe-action-item :options="options1" style="width: 100%;" @click="delete_food(item.id)">
              <view>
                <view style="float: left;clear: both;">
                  <u-avatar :src="item.imageUrl" shape="square" size="100" mode="aspectFill"></u-avatar>
                </view>
                <view style="float: left; margin-left: 20rpx;">
                  <view style="font-size: larger;font-weight: 600; color: #333;">{{item.name}}</view>
                  <view :style="{ fontSize: '30rpx', color: getStatusColor(item.status), marginTop: '6rpx' }"> status:
                    {{ item.status }}
                  </view>
                  <view style="font-size: 30rpx; color: #666; margin-top: 6rpx;"> quantity: {{ item.quantity }}
                    {{ item.unit }}
                  </view>
                  <view style="font-size: 30rpx; color: #888; margin-top: 6rpx;"> expiryDate:
                    {{ formatDateForPicker(item.expiryDate) }}
                  </view>
                  <view style="margin-top: 10rpx;">
                    <u-line-progress :percentage="getPercentage(item)" :showText="false"
                      :activeColor="getBarColor(item)" />
                  </view>
                </view>
                <view style="float: left;position: absolute;right: 40rpx;">
                  <u-button type="warning" text="Edit" size="large" @click.native.stop="open(item)"></u-button>
                </view>
              </view>
            </u-swipe-action-item>
          </u-swipe-action>
        </view>
        <view style="height: 90rpx;">
        </view>
      </view>
      <view style="margin-top: 100rpx;" v-else>
        <u-empty mode="list" text="No food yet~">
        </u-empty>
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
          <u-button @click="add()" type="primary" text="Add new food" />
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
          <u-button @click="add()" type="primary" text="Add new food" />
        </view>
      </view>
      <!-- #endif -->
    </view>
  </view>
</template>
<script>
  import {
    AllfoodInfo,
    handleDelete,
    handleUpdate,
  } from '../../config/api.js'
  export default {
    data() {
      return {
        options1: [{ text: 'Delete' }],
        show: false,
        foods: [],
        submitForm: {
          id: 0,
          shelfLifeDays: '',
          productionDate: '',
          name: '',
          category: '',
          quantity: ''
        },
        form: {
          foodId: '',
          status: '',
          shelfLifeDays: '',
          productionDate: '',
          expiryDate: '',
          name: '',
          info: '',
          unit: '',
          category: '',
          imageUrl: '',
          quantity: ''
        }
      }
    },
    methods: {
      open(item) {
        this.show = true
        console.log(item)
        Object.assign(this.form, {
          foodId: item.id,
          name: item.name,
          shelfLifeDays: item.shelfLifeDays,
          info: item.info,
          unit: item.unit,
          category: item.category,
          imageUrl: item.imageUrl,
          quantity: item.quantity,
          status: item.status,
          productionDate: item.productionDate,
          expiryDate: item.expiryDate
        })
      },
      close() {
        this.show = false
      },
      // 计算剩余保质期百分比（0～100）
      getPercentage(item) {
        const now = Date.now()
        // 把天数转成毫秒
        const totalMs = Number(item.shelfLifeDays) * 24 * 60 * 60 * 1000
        // 剩余毫秒数
        const remainingMs = item.expiryDate - now
        // 剩余百分比
        let pct = (remainingMs / totalMs) * 100
        if (pct < 0) pct = 0
        if (pct > 100) pct = 100
        // console.log("test")
        // console.log(item.expiryDate)
        // console.log(now)
        // console.log(item.shelfLifeDays)
        // console.log(item.shelfLifeDays)
        // console.log(totalMs)
        // console.log(remainingMs)
        // console.log(Math.round(pct))
        return Math.round(pct)
      },
      // 根据百分比返回进度条颜色
      getBarColor(item) {
        const pct = this.getPercentage(item)
        if (pct > 66) return '#27ae60' // 绿
        if (pct > 33) return '#f39c12' // 橙
        return '#e74c3c' // 红
      },
      getStatusColor(status) {
        switch (status) {
          case 'fresh':
            return 'green'
          case 'expired':
            return 'red'
          case 'approximate':
            return 'orange' // 黄色建议用 orange 或 #FFA500
          default:
            return '#333'
        }
      },
      formatDate(ts) {
        if (!ts) return ''
        const d = new Date(Number(ts))
        const pad = n => String(n).padStart(2, '0')
        return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
      },
      formatDateForPicker(ts) {
        if (!ts) return ''
        const d = new Date(Number(ts))
        const pad = n => String(n).padStart(2, '0')
        return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`
      },
      onPopupDateChange(field, e) {
        const [y, m, d] = e.detail.value.split('-')
        this.form[field] = new Date(y, m - 1, d).getTime()
      },
      handleUpdate() {
        Object.assign(this.submitForm, {
          id: this.form.foodId,
          shelfLifeDays: this.form.shelfLifeDays,
          productionDate: this.formatDate(this.form.productionDate),
          name: this.form.name,
          category: this.form.category,
          quantity: this.form.quantity
        })
        handleUpdate(this.submitForm).then(() => {
          this.show = false
          this.getfood()
        })
      },
      delete_food(id) {
        handleDelete({ id }).then(() => {
          this.getfood()
          uni.showToast({
            title: 'Deleted',
            icon: 'success'
          })
          this.$nextTick(() => {
            let comp = this.$refs[`swipe${id}`]
            if (Array.isArray(comp)) {
              comp = comp[0]
            }
            if (comp && typeof comp.reset === 'function') {
              comp.reset()
            }
          })
        }).catch(err => {
          console.log('fail', err)
          // this.getfood()
        })
      },
      add() {
        uni.navigateTo({ url: '/pages/addNewFood/addNewFood' })
      },
      getfood() {
        AllfoodInfo().then(res => {
          this.foods = res.data.food
          console.log('获取食物')
          console.log(this.foods)
        }).catch(err => {
          console.log('fail to get food,', err)
          const raw = err.toString() // "Msg(code=400, Message=No food found, data={})"
          const m = raw.match(/code=(\d+)/)
          const code = m ? parseInt(m[1], 10) : null
          console.log(code)
          if (code == 400) this.foods = []
        })
      }
    },
    onShow() {
      this.getfood()
    },
    async onPullDownRefresh() {
      this.getfood()
      uni.stopPullDownRefresh()
    }
  }
</script>
<style lang="scss">
  .picker-field {
    padding: 30rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .add-btn {
    position: fixed;
    bottom: 10rpx;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    width: 90%;
    display: flex;
    justify-content: center;
  }

  .food-item {
    /* 如果还冲突严重，可改为 none 完全禁止本区域浏览器默认手势 */
    touch-action: pan-y;
  }
</style>