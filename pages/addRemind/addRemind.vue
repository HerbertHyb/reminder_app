<template>
	<view>
		<u-sticky bgColor="#fff">
			<view style="padding: 16rpx;">
				<u-steps :current="current">
					<u-steps-item title="选择食物">
					</u-steps-item>
					<u-steps-item title="选择数量"></u-steps-item>
					<u-steps-item title="提交"></u-steps-item>
					<u-steps-item title="添加完成"></u-steps-item>
				</u-steps>
			</view>
			<view style="margin: 10rpx 10rpx 10rpx 10rpx;" v-if="current === 0">
				<u-search placeholder="搜索您想添加的食物" v-model="filter.name" @search="search" @custom="search"></u-search>
				<u-tabs :list="tabs" @change="change"></u-tabs>
			</view>
		</u-sticky>
		<view v-if="current === 0">
			<view v-if="showList === 1">
				<view v-if="customShow!==undefined && customShow!==null && customShow.length>0">
					<view v-for="item in customShow"
						style="display: flex;border-radius: 10px;border: 2rpx solid #eaeaea;margin: 10rpx;padding: 10rpx;align-items: center;">
						<view style="float: left;clear: both;">
							<u-avatar :src="img()+ item.pic" shape="square" size="80" mode="aspectFill"></u-avatar>
						</view>
						<view style="float: left;margin-left: 20rpx;">
							<view style="font-size: larger;">{{item.name}}</view>
							<u--text :text="'单位：'+item.unit"></u--text>
							<u--text :text="'保质期：'+item.shelfLife+' 天'"></u--text>
						</view>
						<view style="float: left;position: absolute;right: 40rpx;">
							<u-button :type="selected.foodId === item.foodId?'success':'primary'"
								:text="selected.foodId === item.foodId?'已选择':'选我'" size="small" @click="select(item)">
							</u-button>
						</view>
					</view>
					<u-loadmore :status="customStatus" />
					<view style="height: 100rpx;">

					</view>
				</view>
				<view style="margin-top: 100rpx;" v-else>
					<u-empty mode="list" text="还没有食物呦~">
					</u-empty>
				</view>
			</view>
			<view v-else>
				<view v-if="defaultShow!==undefined && defaultShow!==null && defaultShow.length>0">
					<view v-for="item in defaultShow"
						style="display: flex;border-radius: 10px;border: 2rpx solid #eaeaea;margin: 10rpx;padding: 10rpx;align-items: center;">
						<view style="float: left;clear: both;">
							<u-avatar :src="img()+ item.pic" shape="square" size="80" mode="aspectFill"></u-avatar>
						</view>
						<view style="float: left;margin-left: 20rpx;">
							<view style="font-size: larger;">{{item.name}}</view>
							<u--text :text="'单位：'+item.unit"></u--text>
							<u--text :text="'保质期：'+item.shelfLife+' 天'"></u--text>
						</view>
						<view style="float: left;position: absolute;right: 40rpx;">
							<u-button :type="selected.foodId === item.foodId?'success':'primary'"
								:text="selected.foodId === item.foodId?'已选择':'选我'" size="small" @click="select(item)">
							</u-button>
						</view>
					</view>
					<u-loadmore :status="defaultStatus" />
					<view style="height: 100rpx;">

					</view>
				</view>
				<view style="margin-top: 100rpx;" v-else>
					<u-empty mode="list" text="还没有食物呦~">
					</u-empty>
				</view>
			</view>


		</view>

		<view v-if="current===1">
			<view
				style="display: flex;border-radius: 10px;border: 2rpx solid #eaeaea;margin: 10rpx;padding: 10rpx;align-items: center;">
				<view style="float: left;">
					<!-- <u-avatar v-if="selected.pic === null || selected.pic === ''" :text="selected.name[0]"  shape="square" size="140"></u-avatar>
					<u--image v-else :showLoading="true" :src="" radius="5px" width="140px" height="140px"
						@click="click"></u--image> -->
					<u-avatar :src="img()+ selected.pic" shape="square" size="140" mode="aspectFill"></u-avatar>
				</view>
				<view style="margin: 0rpx 20rpx 0rpx 40rpx">
					<view style="font-size: x-large;margin-bottom: 10px;">{{selected.name}}</view>
					<u--text :text="'单位：'+selected.unit"></u--text>
					<u--text :text="'保质期：'+selected.shelfLife+' 天'"></u--text>
				</view>
			</view>
			<view style="clear: both;padding: 40rpx;">
				<u--form labelPosition="left" :model="form" labelWidth="150rpx">
					<u-form-item label="数量" prop="form.amount" borderBottom>
						<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
						<!-- #ifndef APP-NVUE -->
						<u-input placeholder="请输入数量" border="none" v-model="form.amount">
							<!-- #endif -->
							<!-- #ifdef APP-NVUE -->
							<u--input placeholder="请输入数量" border="none" v-model="form.amount">
								<!-- #endif -->
								<template slot="suffix">
									<view style="margin-right: 10rpx;">
										{{selected.unit}}
									</view>
								</template>
								<!-- #ifndef APP-NVUE -->
						</u-input>
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						</u--input>
						<!-- #endif -->
					</u-form-item>

					<u-form-item label="提醒时间" prop="remind" borderBottom @click="showCalendar = true; hideKeyboard()">
						<u--input v-model="form.remind" disabled disabledColor="#ffffff" placeholder="请选择要提醒的时间"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
				</u--form>
			</view>
		</view>

		<u-calendar :show="showCalendar" mode="single" @confirm="calendarConfirm" @close="calendarClose" startText="住店"
			endText="离店" confirmDisabledText="请选择提醒时间"></u-calendar>

		<view v-if="current===2">
			<view
				style="display: flex;border-radius: 10px;border: 2rpx solid #eaeaea;margin: 10rpx;padding: 10rpx;align-items: center;">
				<view style="float: left;">
					<!-- <u-avatar v-if="selected.pic === null || selected.pic === ''" :text="selected.name[0]"  shape="square" size="140"></u-avatar>
					<u--image v-else :showLoading="true" :src="selected.pic" radius="5px" width="140px" height="140px"
						@click="click"></u--image> -->
					<u-avatar :src="img()+ selected.pic" shape="square" size="140" mode="aspectFill"></u-avatar>
				</view>
				<view style="margin: 0rpx 20rpx 0rpx 40rpx">
					<view style="font-size: x-large;margin-bottom: 10px;">{{selected.name}}</view>
					<u--text :text="'数量：'+form.amount+' '+selected.unit"></u--text>
					<u--text :text="'保质期：'+selected.shelfLife+' 天'"></u--text>
					<u--text :text="'提醒时间：'+form.remind"></u--text>
				</view>
			</view>
		</view>

		<view v-if="current===3">
			<view
				style="display: flex;border-radius: 10px;border: 2rpx solid #eaeaea;margin: 10rpx;padding: 10rpx;align-items: center;">
				<view style="float: left;">
					<!-- <u-avatar v-if="selected.pic === null || selected.pic === ''" :text="selected.name[0]"  shape="square" size="140"></u-avatar>
					<u--image v-else :showLoading="true" :src="" radius="5px" width="140px" height="140px"
						@click="click"></u--image> -->
					<u-avatar :src="img()+ selected.pic" shape="square" size="140" mode="aspectFill"></u-avatar>
				</view>
				<view style="margin: 0rpx 20rpx 0rpx 40rpx">
					<view style="font-size: x-large;margin-bottom: 10px;">{{selected.name}}</view>
					<u--text :text="'数量：'+form.amount+' '+selected.unit"></u--text>
					<u--text :text="'保质期：'+selected.shelfLife+' 天'"></u--text>
					<u--text :text="'提醒时间：'+form.remind"></u--text>
					<u--text text="已添加到提醒"></u--text>
				</view>
			</view>
		</view>

		<view
			style="position: fixed;bottom: 20rpx;justify-content:center;display: flex;align-items: center;width: 100%;height: 80rpx;">
			<view v-if="current===0" style="width: 90%;margin: 0rpx auto;">
				<u-button @click="next()" text="选好了，下一步" type="primary">
				</u-button>
			</view>
			<view v-else-if="current===1||current===2" style="width: 90%;margin: 0rpx auto;">
				<u-row>
					<u-col span="4">
						<view style="padding-right: 20rpx;">
							<u-button @click="before()" text="上一步" type="info">
							</u-button>
						</view>
					</u-col>
					<u-col span="8">
						<view v-if="current===2">
							<u-button @click="commit()" text="提交" type="success">
							</u-button>
						</view>
						<view v-else>
							<u-button @click="next()" text="选好了，下一步" type="primary">
							</u-button>
						</view>
					</u-col>
				</u-row>
			</view>

			<view v-else style="width: 90%;margin: 0rpx auto;">
				<u-button @click="next()" type="success" text="完成">
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		foodSearchCustom,
		foodSearchDefault,
		imgServer,
		remindAdd
	} from "../../config/api.js"
	export default {
		data() {
			return {
				tabs: [{
						id: 1,
						name: '自定义'
					},
					{
						id: 2,
						name: '默认食物'
					}
				],
				customShow: [],
				defaultShow: [],
				searching: false,
				defaultStatus: 'loadmore',
				customStatus: 'loadmore',
				size: 15,
				defaultPage: 1,
				filter: {
					name: ''
				},
				customPage: 1,
				form: {
					fridgeId: '',
					amount: ''
				},
				current: 0,
				showList: 1,
				showCalendar: false,
				selected: {}

			}
		},
		methods: {
			change(val) {
				this.showList = val.id
			},
			img() {
				return imgServer
			},
			search() {
				if (this.filter.name === '') {
					if (this.searching === true) {
						this.defaultPage = 0
						this.customPage = 0
						this.customShow = []
						this.defaultShow = []
						this.searching = false
						this.getCustom()
						this.getDefault()
					}
				} else {
					this.defaultPage = 0
					this.customPage = 0
					this.customShow = []
					this.defaultShow = []
					this.searching = true
					this.getCustom()
					this.getDefault()
				}
			},
			next() {
				if (this.current < 3)
					this.current++
				else {
					let pages = getCurrentPages();
					console.log(pages)
					// 获取到需要返回的页面下标
					let prevPage = pages[0];
					// 刷新页面数据(此方式为App形式刷新)
					prevPage.$vm.getListInfo();
					// 刷新页面数据(此方式为小程序刷新)
					//prevPage.onLoad();
					uni.navigateBack({})
				}
			},
			commit() {
				this.form.fridgeId = this.vuex_fridge
				this.form.foodId = this.selected.foodId
				this.form.userId = this.selected.userId
				this.form.date = new Date(this.form.remind)
				remindAdd(this.form).then(res => {
					console.log(res)
					this.current++
				})
			},
			select(val) {
				this.selected = val
			},
			async init() {
				this.searching = false
				this.filter.name = ''
				this.customShow = []
				this.customPage = 0
				this.getCustom()
				this.defaultShow = []
				this.defaultPage = 0
				this.getDefault()
			},
			before() {
				this.current--
			},
			formatter(day) {
				const d = new Date()
				let month = d.getMonth() + 1
				const date = d.getDate()
				if (day.month == month && day.day == date + 3) {
					day.bottomInfo = '有优惠'
					day.dot = true
				}
				return day
			},
			calendarConfirm(e) {
				this.showCalendar = false
				console.log(e)
				this.form.remind = e[0]
			},
			calendarClose() {
				this.showCalendar = false
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			async getCustom() {
				let customRes
				if (this.searching) {
					customRes = await foodSearchCustom(++this.customPage, this.size, this.filter)
				} else {
					customRes = await foodSearchCustom(++this.customPage, this.size)
				}
				console.log(customRes)
				for (let i = 0; i < customRes.data.rows.length; i++) {
					this.customShow.push(customRes.data.rows[i])
				}
				if (this.customPage * this.size < customRes.data.total) {
					this.customStatus = "loadmore"
				} else {
					this.customStatus = "nomore"
				}
			},
			async getDefault() {
				let defaultRes
				if (this.searching) {
					defaultRes = await foodSearchDefault(++this.defaultPage, this.size, this.filter)
				} else {
					defaultRes = await foodSearchDefault(++this.defaultPage, this.size)
				}
				console.log(defaultRes)
				for (let i = 0; i < defaultRes.data.rows.length; i++) {
					this.defaultShow.push(defaultRes.data.rows[i])
				}
				if (this.defaultPage * this.size < defaultRes.data.total) {
					this.defaultStatus = "loadmore"
				} else {
					this.defaultStatus = "nomore"
				}
			}
		},
		created() {
			this.init()
		},
		onReachBottom() {
			if (this.current === 0) {
				if (this.show === 1) {
					this.customStatus = "loading"
					this.getCustom()
				} else {
					this.defaultStatus = "loading"
					this.getDefault()
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
		;
	}
</style>
