<template>
	<view style="width: 100%;display: flex;justify-content: center;">
		<view style="width: 95%;">
			<view style="border-radius: 10px;border: 2rpx solid #eaeaea;margin: 10rpx 0rpx 10rpx 0rpx;padding: 20rpx;">
				<view style="width: 100%;display: flex; justify-content: center;margin-top: 20rpx;">
					<view>
						<u-avatar  :src="img() + food.pic" shape="square" size="250" mode="aspectFill"></u-avatar>
					</view>
				</view>
				<view style="width: 100%;display: flex;justify-content: center;margin-top: 20rpx;">
					<view style="font-size: xx-large;float: left;">
						{{food.name}}
					</view>
				</view>
				<view style="width: 100%;display: flex;justify-content: center;margin-top: 8rpx;font-size: small;">
					<view v-if="food.userId===0">来源：默认</view>
					<view v-else>来源：用户</view>
				</view>
				<view style="width: 100%;display: flex;justify-content: center;margin-top: 8rpx;font-size: small;">
					<view>类别：{{food.type}}</view>
				</view>
				<view style="margin-top: 20rpx;">
					<view style="margin-top: 20rpx;">
						<u-cell-group>
							<u-cell v-if="food.alias!=null&&food.alias!==''" title="别名" :value="food.alias"></u-cell>
							<u-cell v-else title="别名" value="无"></u-cell>
							<u-cell title="单位" :value="food.unit"></u-cell>
							<u-cell title="保质期" :value="food.shelfLife+' 天'"></u-cell>
						</u-cell-group>
					</view>
					<view style="margin: 20rpx 10rpx 10rpx 10rpx;">
						<!-- <rich-text :nodes="'&nbsp'+food.info"></rich-text> -->
					<u--text :text="food.info" style="text-indent: 40rpx;"></u--text>
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
				food:{}
			}
		},
		methods: {
			img(){
				return imgServer
			}
		},
		onLoad(){
			this.food = this.vuex_viewFood
			console.log(this.food)
		}
	}
</script>

<style>

</style>
