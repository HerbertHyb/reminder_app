<template>
	<view>
		<u-sticky bgColor="#fff" class="header">
			<view style="padding: 10rpx 10rpx 10rpx 10rpx;">
				<u-search placeholder="搜索您想要管理的食物" v-model="filter.name" @search="search" @custom="search"></u-search>
				<u-tabs :list="tabs" @change="change"></u-tabs>
			</view>
		</u-sticky>
		<view>
			<view v-if="show === 1">
				<view v-if="customShow!==undefined && customShow!==null && customShow.length>0">
					<view v-for="item in customShow" :key="item.foodId"
						style="display: flex;border-radius: 10px;border: 2rpx solid #eaeaea;margin: 10rpx;padding: 10rpx;align-items: center;"
						@click="view(item)">
						<view style="float: left;clear: both;">
							<u-avatar :src="img() + item.pic" shape="square" size="80" mode="aspectFill"></u-avatar>
						</view>
						<view style="float: left;margin-left: 20rpx;flex-grow: 1;">
							<view style="clear: both;display: flex;align-items: center;">
								<view style="font-size: larger;float: left;">
									{{item.name}}
								</view>
								<view style="font-size:medium;float: left;margin-left: 20rpx;">
									{{item.unit}}-{{item.type}}
								</view>
							</view>
							<view style="clear: both;">
								<u--text v-if="item.alias!=null" :text="'别名：'+item.alias" :lines="1"></u--text>
								<u--text v-else :text="'别名：无'"></u--text>
								<u--text :text="'简介：'+item.info" :lines="2"></u--text>
							</view>
						</view>
						<view style="float: left;position: absolute;right: 40rpx;">
							<u-button type="warning" text="修改" size="small" @click.native.stop="edit(item.foodId)"></u-button>
						</view>
					</view>
					<u-loadmore :status="customStatus" />
				</view>
				<view style="margin-top: 100rpx;" v-else>
					<u-empty mode="list" text="还没有食物呦~">
					</u-empty>
				</view>

			</view>

			<view v-if="show === 2">
				<view v-if="defaultShow!==undefined && defaultShow!==null && defaultShow.length>0">
					<view v-for="item in defaultShow" :key="item.foodId"
						style="display: flex;border-radius: 10px;border: 2rpx solid #eaeaea;margin: 10rpx;padding: 10rpx;align-items: center;"
						@click="view(item)"
						>
						<view style="float: left;">
							<u-avatar :src="img() + item.pic" shape="square" size="80" mode="aspectFill"></u-avatar>
						</view>
						<view style="margin-left: 20rpx;flex-grow: 1;">
							<view style="display: flex;align-items: center;">
								<view style="font-size: larger;float: left;">
									{{item.name}}
								</view>
								<view style="font-size:medium;float: left;margin-left: 20rpx;">
									{{item.unit}}-{{item.type}}
								</view>
							</view>
							<view>
								<u--text v-if="item.alias!=null" :text="'别名：'+item.alias" :lines="2"></u--text>
								<u--text v-else :text="'别名：无'"></u--text>
								<u--text :text="'简介：'+item.info" :lines="2"></u--text>
							</view>
						</view>
					</view>
					<u-loadmore :status="defaultStatus" />
				</view>
				<view style="margin-top: 100rpx;" v-else>
					<u-empty mode="list" text="还没有食物呦~">
					</u-empty>
				</view>
				</view>

				<view style="height: 90rpx;">
			</view>
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
					<u-button @click="add()" type="primary" text="添加新食物">
					</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		foodSearchCustom,
		foodSearchDefault,
		imgServer
	} from "../../config/api.js"
	export default {
		data() {
			return {
				keyword: '',
				customShow: [],
				defaultShow: [],
				searching:false,
				defaultStatus: 'loadmore',
				customStatus: 'loadmore',
				size: 15,
				defaultPage: 1,
				filter:{
				},
				customPage: 1,
				show: 1,
				tabs: [{
						id: 1,
						name: '自定义'
					},
					{
						id: 2,
						name: '默认食物'
					}
				]
			}
		},
		methods: {
			edit(foodId) {
				this.$u.vuex('vuex_editFood', foodId)
				uni.navigateTo({
					url: "/pages/editFood/editFood"
				})
			},
			view(food) {
				this.$u.vuex('vuex_viewFood', food)
				console.log(food)
				uni.navigateTo({
					url: "/pages/viewFood/viewFood"
				})
			},
			img() {
				return imgServer
			},
			change(val) {
				this.show = val.id
			},
			click() {

			},
			async getListInfo() {
				this.searching = false
				this.filter.name = ''
				this.customShow = []
				this.customPage = 0
				this.getCustom()
				this.defaultShow = []
				this.defaultPage = 0
				this.getDefault()
			},
			add() {
				uni.navigateTo({
					url: "/pages/addNewFood/addNewFood"
				})
			},
			search() {
				if(this.filter.name === '')
				{
					if(this.searching === true)
					{
						this.defaultPage = 0
						this.customPage = 0
						this.customShow = []
						this.defaultShow = []
						this.searching = false
						this.getCustom()
						this.getDefault()
					}
				}
				else{
					this.defaultPage = 0
					this.customPage = 0
					this.customShow = []
					this.defaultShow = []
					this.searching = true
					this.getCustom()
					this.getDefault()
				}
			},
			async init() {
				this.getListInfo()
			},
			async getCustom(){
				let customRes
				if(this.searching)
				{
					customRes = await foodSearchCustom(++this.customPage,this.size,this.filter)
				}
				else{
					customRes = await foodSearchCustom(++this.customPage,this.size)
				}
				console.log(customRes)
				for(let i = 0;i<customRes.data.rows.length;i++)
				{
					this.customShow.push(customRes.data.rows[i])
				}
				if(this.customPage*this.size<customRes.data.total)
				{
					this.customStatus = "loadmore"
				}
				else{
					this.customStatus = "nomore"
				}
			},
			async getDefault(){
				let defaultRes
				if(this.searching)
				{
					defaultRes = await foodSearchDefault(++this.defaultPage,this.size,this.filter)
				}
				else{
					defaultRes = await foodSearchDefault(++this.defaultPage,this.size)
				}
				console.log(defaultRes)
				for(let i = 0;i<defaultRes.data.rows.length;i++)
				{
					this.defaultShow.push(defaultRes.data.rows[i])
				}
				if(this.defaultPage*this.size<defaultRes.data.total)
				{
					this.defaultStatus = "loadmore"
				}
				else{
					this.defaultStatus = "nomore"
				}
			}
		},
		created() {
			this.init()
		},
		async onPullDownRefresh() {
			this.getListInfo()
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			if(this.show === 1)
			{
				this.customStatus = "loading"
				this.getCustom()
			}
			else{
				this.defaultStatus = "loading"
				this.getDefault()
			}
		}
	}
</script>

<style>

</style>
