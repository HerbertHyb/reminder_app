<template>
	<view style="width: 100%;display: flex;justify-content: center;">
		<view style="width: 90%;">
			<view style="border-radius: 10px;border: 2rpx solid #eaeaea;margin-top: 10rpx;padding: 20rpx;">
				<view style="width: 100%;display: flex; justify-content: center;margin-top: 20rpx;">
					<view>
						<u-avatar  :src="img() + dish.pic" shape="square" size="250" mode="aspectFill"></u-avatar>
					</view>
				</view>
				<view style="width: 100%;display: flex;justify-content: center;margin-top: 20rpx;">
					<view style="font-size: xx-large;float: left;">
						{{dish.name}}
					</view>
				</view>
				
				<view style="width: 100%;display: flex;justify-content: center;margin-top: 8rpx;font-size: small;">
					<view v-if="dish.userId===0">来源：默认</view>
					<view v-else>来源：用户</view>
				</view>
				<view style="width: 100%;display: flex;justify-content: center;margin-top: 8rpx;font-size: small;">
					<view>类别：{{dish.type}}</view>
				</view>
				<view >
					<view style="font-size:larger;">
						材料：
					</view>
					<view style="margin-top: 20rpx;">
						<u-cell-group>
							<u-cell v-for="(item,index) in dish.materialFormat" :title="item.food" :value="item.amount"></u-cell>
						</u-cell-group>
					</view>
					<view style="font-size: larger;margin-top: 20rpx;">
						烹饪步骤：
					</view>
					<view style="margin-top: 20rpx;">
						<u-cell-group>
							<u-cell v-for="(item,index) in dish.detailFormat" :title="(index+1) + '、' + item"></u-cell>
						</u-cell-group>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		imgServer
	} from "../../config/api.js"
	export default {
		data() {
			return {
				dish:{}
			}
		},
		methods: {
			img(){
				return imgServer
			}
		},
		created() {
			this.dish = this.vuex_viewDish
			let temp = []
			let result = this.dish.material.split("|")
			for(let i =0 ;i<result.length;i++)
			{
				let m = result[i].split(":")
				temp[i] = {
					food:m[0],
					amount:m[1]
				}
			}
			this.dish.materialFormat = temp
			console.log(this.dish.detail.split("|"))
			this.dish.detailFormat = this.dish.detail.split("|")
		}
	}
</script>

<style>

</style>
