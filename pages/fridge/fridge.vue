<template>
	<view>
		
		<u-popup :show="show" mode="center" :round="10" @close="close" @open="open" :duration="100" 
		:closeOnClickOverlay="false" customStyle="width:80%;height:50%" :closeable="true">
				<view style="width: 100%;height: 100%;position: relative;">
					<view style="width: 100%;margin-top: 80rpx;display: flex;justify-content: center;">
						<view style="width: 90%;display: flex;justify-content: center;">
							<view style="float: left;clear: both;">
								<u-avatar  :src="img() + form.pic" shape="square" size="120" mode="aspectFill"></u-avatar>
							</view>
							<view style="float: left;margin-left: 20rpx;display: flex;align-items: center;height: 100%;flex-grow: 1;">
								<view>
									<view style="clear: both;display: flex;align-items: center;">
										<view style="font-size: larger;float: left;">
											{{form.name}}
										</view>
										<view style="font-size:medium;float: left;margin-left: 20rpx;">
											{{form.unit}}-{{form.type}}
										</view>
									</view>
									<view style="clear: both;">
										<u--text v-if="form.alias!=null" :text="'别名：'+form.alias" :lines="2" ></u--text>
										<u--text v-else :text="'别名：无'"></u--text>
										<u--text :text="'简介：'+form.info" :lines="2"></u--text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view>
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
													{{form.unit}}
												</view>
											</template>
											<!-- #ifndef APP-NVUE -->
									</u-input>
									<!-- #endif -->
									<!-- #ifdef APP-NVUE -->
									</u--input>
									<!-- #endif -->
								</u-form-item>
							</u--form>
						</view>
					</view>
					<view style="position: absolute;bottom: 50rpx;justify-content:center;display: flex;width: 100%;align-items: center;height: 80rpx;">
						<view>
							<view style="float: left;padding-right: 80rpx;">
								<u-button type="error" @click="handleDelete()" text="删除"></u-button>
							</view>
							<view style="float: left;padding-left: 80rpx;">
								<u-button type="success" @click="handleUpdate()" text="更新"></u-button>
							</view>
						</view>
					</view>
				</view>
		</u-popup>
	
		<view>
			<u-sticky bgColor="#fff" class="header">
				<u-tabs :list="fridges" @change="change"></u-tabs>
			</u-sticky>
			<view v-if="foods!==undefined && foods!==null && foods.length>0">
				<view v-for="item in foods"
					style="display: flex;border-radius: 10px;border: 2rpx solid #eaeaea;margin: 10rpx;padding: 10rpx;align-items: center;">
					<view style="float: left;clear: both;">
						<u-avatar :src="img() + item.pic" shape="square" size="80" mode="aspectFill"></u-avatar>
					</view>
					<view style="float: left;margin-left: 20rpx;">
						<view style="font-size: larger;">{{item.name}}</view>
						<u--text :text="'数量：'+item.amount+' '+item.unit"></u--text>
					</view>
					<view style="float: left;position: absolute;right: 40rpx;">
						<u-button type="warning" text="修改" size="small" @click="open(item)"></u-button>
					</view>
				</view>
				<view style="height: 90rpx;">

				</view>
			</view>
			<view style="margin-top: 100rpx;" v-else>
				<u-empty mode="list" text="还没有食物呦~">
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
					<!-- <button style="display:flex;align-items: center;justify-content: center;height: 70rpx;" @click="add()">
						<image src="../../static/firdge/plus.png" style="width: 50rpx;height: 50rpx;"></image>
					</button> -->
					<view style="margin: 0px auto;width: 90%;">
						<u-button @click="add()" type="primary" text="添加食物到冰箱">
						</u-button>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	import {
		fridgeList,
		storageList,
		storageAdd,
		storageDelete,
		storageUpdate,
		imgServer
	} from "../../config/api.js"
	export default {
		data() {
			return {
				show: false,
				fridges: [{
					id:1,
					name:'请购买智慧冰箱后绑定使用'
				}],
				foods: [],
				current: 0,
				form:{},
				currentFridge:0
			}
		},
		methods: {
			img(){
				return imgServer
			},
			open(item) {
			        // console.log('open');
				this.show = true
				this.form.foodId = item.foodId
				this.form.userId = item.userId
				this.form.name = item.name
				this.form.type = item.type
				this.form.unit = item.unit
				this.form.info = item.info
				this.form.alias = item.alias
				this.form.pic = item.pic
				this.form.fridgeId = item.fridgeId
				this.form.amount = item.amount
			    },
			close() {
				this.show = false
				// console.log('close');
			},
			handleUpdate()
			{
				storageUpdate(this.form).then(res=>{
					console.log(res)
					this.show = false
					storageList(this.currentFridge).then(res=>{
						this.foods = res.data
					})
				})
			},
			handleDelete(){
				storageDelete(this.form).then(res=>{
					console.log(res)
					this.show = false
					storageList(this.currentFridge).then(res=>{
						this.foods = res.data
					})
				})
			},
			async getListInfo(){
				let storageRes = await storageList(this.currentFridge)
				this.foods = storageRes.data
			},
			async change(val) {
				console.log(val.id)
				let storageRes = await storageList(val.id)
				this.currentFridge = val.id
				console.log(storageRes)
				this.foods = storageRes.data
			},
			add() {
				this.$u.vuex('vuex_fridge',this.currentFridge)
				uni.navigateTo({
					url: '/pages/addToFridge/addToFridge'
				})
			},
			async init() {
				let fridgeRes = await fridgeList();
				this.fridges = fridgeRes.data
				if (this.fridges.length !== 0) {
					this.currentFridge = this.fridges[0].id
					let storageRes = await storageList(this.fridges[0].id)
					this.foods = storageRes.data
				}
			}
		},
		computed: {},
		onLoad() {
			this.init()
		},
		onPullDownRefresh() {
		    this.getListInfo()
			uni.stopPullDownRefresh();
		}

	}
</script>
<style>

</style>
