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
          <u-input v-model="food.unit" disabled disabledColor="#ffffff" placeholder="Please select unit"
            border="none" />
          <u-icon slot="right" name="arrow-right" />
        </u-form-item>
        <!-- Category -->
        <u-form-item label="Category" prop="food.category" borderBottom @click="showCategory = true; hideKeyboard()">
          <u-input v-model="food.category" disabled disabledColor="#ffffff" placeholder="Please select category"
            border="none" />
          <u-icon slot="right" name="arrow-right" />
        </u-form-item>
        <!-- Shelf Life -->
        <u-form-item label="Shelf Life (days)" prop="food.shelf_life_days" borderBottom>
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
        <!-- Abstract -->
        <u-form-item label="Abstract" prop="food.info">
          <u--textarea v-model="food.info" placeholder="Please enter content" count />
        </u-form-item>
      </u-form>
      <!-- Action Sheets -->
      <u-action-sheet :show="showUnit" :actions="UnitList" title="Please select unit" @close="showUnit = false"
        @select="unitSelect" />
      <u-action-sheet :show="showCategory" :actions="CategoryList" title="Please select category"
        @close="showCategory = false" @select="categorySelect" />
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
        showCategory: false,
        showUnit: false,
        food: {
          category: '', // string name
          name: '',
          imageUrl: '', // path string
          production_date: '', // YYYY-MM-DD
          shelf_life_days: '',
          quantity: 1,
          unit: '',
          info: ''
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
        CategoryList: [{
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
        images: ['/static/banana.png', '/static/meat.png', '/static/celery.png', '/static/milk.png',
          '/static/pizza.png', '/static/tomato.png'
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
            message: 'Please select category',
            trigger: ['blur', 'change']
          }
        }
      }
    },
    methods: {
      unitSelect(e) {
        this.food.unit = e.id
      },
      categorySelect(e) {
        this.food.category = e.name
        this.food.imageUrl = this.images[e.id]
      },
      hideKeyboard() {
        uni.hideKeyboard()
      },
      onDateChange(e) {
        this.food.production_date = e.detail.value
      },
      commit() {
        // format productionDate with timestamp
        const dt = new Date(this.food.production_date)
        const localISO = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000).toISOString().slice(0, 19).replace('T',
          ' ')
        const payload = {
          category: this.food.category,
          imageUrl: this.food.imageUrl,
          info: this.food.info,
          name: this.food.name,
          productionDate: localISO,
          quantity: Number(this.food.quantity),
          shelfLifeDays: Number(this.food.shelf_life_days),
          unit: this.food.unit
        }
        console.log(payload)
        Addfood(payload).then(() => {
          uni.showToast({
            title: 'Added successfully',
            icon: 'success'
          })
          uni.navigateBack({ url: '/pages/fridge/fridge' })
        }).catch(() => {
          uni.showToast({
            title: 'Add failed',
            icon: 'none'
          })
        })
      }
    },
    created() {
      const today = new Date().toISOString().split('T')[0]
      this.food.production_date = today
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