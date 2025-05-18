<template>
  <view style="display: flex; justify-content: center;">
    <view style="width: 90%; margin-top: 20rpx;">
      <u-form labelPosition="left" :model="food" :rules="rules" labelWidth="150rpx">
        <!-- Food Name -->
        <u-form-item label="Food Name" prop="food.name" borderBottom>
          <u-input v-model="food.name" border="none" placeholder="Please enter the name of the food" />
        </u-form-item>
        <!-- Unit -->
        <u-form-item label="Unit" prop="food.unit" borderBottom @click="showUnit = true; hideKeyboard()">
          <u-input v-model="food.unitName" disabled disabledColor="#ffffff" placeholder="Please select unit"
            border="none" />
          <u-icon slot="right" name="arrow-right" />
        </u-form-item>
        <!-- Type/Category -->
        <u-form-item label="Type" prop="food.category" borderBottom @click="showType = true; hideKeyboard()">
          <u-input v-model="food.typeName" disabled disabledColor="#ffffff" placeholder="Please select type"
            border="none" />
          <u-icon slot="right" name="arrow-right" />
        </u-form-item>
        <!-- Shelf Life (days) -->
        <u-form-item label="Shelf Life" prop="food.shelf_life_days" borderBottom>
          <u-input v-model="food.shelf_life_days" placeholder="Please enter shelf life" border="none">
            <template slot="suffix">
              <view style="margin-right: 10rpx;">Days</view>
            </template>
          </u-input>
        </u-form-item>
        <!-- Production Date -->
        <u-form-item label="Prod Date" prop="food.production_date" borderBottom>
          <picker mode="date" :value="food.production_date" start="2000-01-01" end="2099-12-31" @change="onDateChange">
            <view class="picker-field"
              style="padding: 30rpx 0; display:flex; justify-content: space-between; align-items: center;">
              <text>{{ food.production_date }}</text>
              <u-icon name="calendar" />
            </view>
          </picker>
        </u-form-item>
        <!-- Quantity -->
        <u-form-item label="Quantity" prop="food.quantity" borderBottom>
          <u-input v-model="food.quantity" placeholder="Please enter quantity" border="none" type="number" />
        </u-form-item>
        <!-- Status -->
        <u-form-item label="Status" prop="food.status" borderBottom @click="showStatus = true; hideKeyboard()">
          <u-input v-model="food.statusName" disabled disabledColor="#ffffff" placeholder="Please select status"
            border="none" />
          <u-icon slot="right" name="arrow-right" />
        </u-form-item>
        <u-form-item label="Abstract" prop="food.info">
          <u--textarea v-model="food.info" placeholder="Please enter content" count></u--textarea>
        </u-form-item>
      </u-form>
      <!-- Action Sheets -->
      <u-action-sheet :show="showUnit" :actions="UnitList" title="Please select unit" @close="showUnit = false"
        @select="unitSelect" />
      <u-action-sheet :show="showType" :actions="TypeList" title="Please select type" @close="showType = false"
        @select="typeSelect" />
      <u-action-sheet :show="showStatus" :actions="StatusList" title="Please select status" @close="showStatus = false"
        @select="statusSelect" />
    </view>
    <!-- Submit Button -->
    <view style="width: 100%; position: fixed; bottom: 80rpx;">
      <view style="width: 90%; margin: 0 auto;">
        <u-button @click="commit()" type="success" text="Submit" />
      </view>
    </view>
  </view>
</template>
<script>
  import { Addfood } from '../../config/api.js'
  export default {
    data() {
      return {
        showType: false,
        showUnit: false,
        showStatus: false,
        // form model matching DB fields
        food: {
          user_id: '',
          category: '',
          name: '',
          image_url: '',
          production_date: '',
          shelf_life_days: '',
          expiry_date: '',
          quantity: 1,
          status: '',
          unit: '',
          info: '',
          is_sent: 0,
          // for display
          unitName: '',
          typeName: '',
          statusName: ''
        },
        UnitList: [{
          name: 'pcs',
          id: 'pcs'
        }, {
          name: 'kilogram',
          id: 'kilogram'
        }, {
          name: 'tie',
          id: 'tie'
        }, {
          name: 'liter',
          id: 'liter'
        }],
        TypeList: [{
          name: 'fruit',
          id: 0
        }, {
          name: 'meat',
          id: 1
        }, {
          name: 'vegetable',
          id: 2
        }, {
          name: 'drink',
          id: 3
        }, {
          name: 'Fast food',
          id: 4
        }],
        StatusList: [{
          name: 'fresh',
          id: 'fresh'
        }, {
          name: 'opened',
          id: 'opened'
        }, {
          name: 'expired',
          id: 'expired'
        }],
        imageMap: ['/static/banana.png', '/static/meat.png', '/static/celery.png', '/static/milk.png',
          '/static/pizza.png'
        ],
        rules: {
          'food.name': {
            type: 'string',
            required: false,
            message: 'Please enter name',
            trigger: ['blur', 'change']
          },
          'food.unit': {
            type: 'string',
            required: true,
            message: 'Please select unit',
            trigger: ['blur', 'change']
          },
          'food.category': {
            type: 'string',
            required: true,
            message: 'Please select type',
            trigger: ['blur', 'change']
          }
        }
      }
    },
    methods: {
      unitSelect(e) {
        this.food.unit = e.id
        this.food.unitName = e.name
      },
      typeSelect(e) {
        this.food.category = e.id
        this.food.typeName = this.TypeList.find(t => t.id === e.id).name
        // assign image_url by index
        this.food.image_url = this.imageMap[e.id] || '/static/tomato.png'
      },
      statusSelect(e) {
        this.food.status = e.id
        this.food.statusName = e.name
      },
      hideKeyboard() {
        uni.hideKeyboard()
      },
      onDateChange(e) {
        this.food.production_date = e.detail.value
        // calculate expiry_date
        const prod = new Date(this.food.production_date)
        prod.setDate(prod.getDate() + Number(this.food.shelf_life_days || 0))
        this.food.expiry_date = prod.toISOString().split('T')[0]
      },
      commit() {
        // set user_id, e.g., from storage or store
        console.log(this.food)
        this.food.user_id = uni.getStorageSync('user_id') || ''
        Addfood(this.food).then(res => {
          uni.showToast({
            title: 'Added successfully',
            icon: 'success'
          })
          uni.navigateBack({ url: '/pages/fridge/fridge' })
        }).catch(err => {
          uni.showToast({
            title: 'Add failed',
            icon: 'none'
          })
        })
      }
    },
    created() {
      // default production date = today
      const today = new Date().toISOString().split('T')[0]
      this.food.production_date = today
      this.food.expiry_date = today
    }
  }
</script>
<style scoped>
  .picker-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>