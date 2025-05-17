<template>
	<view>
		<u-sticky bgColor="#fff" class="header">
			<view style="padding: 10rpx 10rpx 10rpx 10rpx;">
				<u-search placeholder="搜索您喜欢的菜品" v-model="keyword" @search="search" @custom="search"></u-search>
			</view>
		</u-sticky>
		
		<view v-if="!haveSearch">
			<view v-for="item in recommend">
				<view style="margin: 20rpx;">猜你喜欢：{{item.name}}</view>
				<view style="border-radius: 10px;border: 2rpx solid #eaeaea;margin: 10rpx;padding: 10rpx;align-items: center;">
					<swiper>
						<swiper-item v-for="dish in item.dishes">
							<view @click="view(dish)" style="display: flex;align-items: center;height: 100%;">
								<view style="float: left;">
									<u-avatar v-if="dish.pic === null || dish.pic === ''" :text="dish.name[0]"  shape="square" size="140"></u-avatar>
									<u-avatar v-else :src="img() + dish.pic"  shape="square" size="140" mode="aspectFill"></u-avatar>
								</view>
								<view style="margin: 0rpx 20rpx 0rpx 40rpx">
									{{dish.name}}
									<u--text :lines="2" :text="'材料：'+format(dish.material)"></u--text>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<view v-else>
			<view v-for="dish in searchResult" @click="view(dish)"
				style="display: flex;border-radius: 10px;border: 2rpx solid #eaeaea;margin: 10rpx;padding: 10rpx;align-items: center;">
				<view @click="clickDish(dish.id)" style="display: flex;align-items: center;height: 100%;">
					<view style="float: left;">
						<u-avatar v-if="dish.pic === null || dish.pic === ''" :text="dish.name[0]"  shape="square" size="140"></u-avatar>
						<u-avatar v-else :src="img() + dish.pic"  shape="square" size="140" mode="aspectFill"></u-avatar>
					</view>
					<view style="margin: 0rpx 20rpx 0rpx 40rpx">
						<view style="font-size: large;">
							{{dish.name}}
						</view>
						<u--text :lines="2" :text="'材料：'+format(dish.material)"></u--text>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" />
		</view>
	</view>
</template>

<script>
	import {
		dishRecommend,
		dishSearch,
		imgServer
	} from "../../config/api.js"
	export default {
		data() {
			return {
				keyword:'',
				dish:{
					name:''
				},
				haveSearch:false,
				searchResult:[],
				recommend: [],
				index:1,
				size:5,
				status:'loadmore'
			}
		},
		methods: {
			img(){
				return imgServer;
			},
			format(material){
				let format = material.replace(/\|/g," ")
				console.log(format)
				return format
			},
			async search(val) {
				if(this.keyword === '')
				{
					this.haveSearch = false
					return
				}
				this.haveSearch = true
				this.dish.name = this.keyword
				this.index = 1
				let res = await dishSearch(this.index,this.size,this.dish)
				this.searchResult = res.data.rows
				if(this.index*this.size<res.data.total)
				{
					this.status = "loadmore"
				}
				else{
					this.status = "nomore"
				}
			},
			view(dish) {
				this.$u.vuex('vuex_viewDish', dish)
				console.log(dish)
				uni.navigateTo({
					url: "/pages/viewDish/viewDish"
				})
			},
			clickDish(id)
			{
				console.log("点击了id："+id)
			},
			async init(){
				let recommend = await dishRecommend()
				console.log(recommend)
				this.recommend = recommend.data
			}
		},
		created() {
			this.init()
		},
		onPullDownRefresh() {
			this.haveSearch = false
			this.index = 1
			this.init()
			uni.stopPullDownRefresh();
		},
		async onReachBottom() {
			if(this.status === "loadmore"){
				this.status = "loading"
				let res = await dishSearch(++this.index,this.size,this.dish)
				for(let i = 0;i<res.data.rows.length;i++)
				{
					this.searchResult.push(res.data.rows[i])
				}
				if(this.index*this.size<res.data.total)
				{
					this.status = "loadmore"
				}
				else{
					this.status = "nomore"
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
